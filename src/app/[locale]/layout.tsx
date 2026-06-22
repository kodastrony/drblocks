import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getContent } from "@/i18n";
import { locales, defaultLocale, isLocale, localeHreflang, ogLocale, type Locale } from "@/i18n/config";
import { company } from "@/lib/company";

const SITE = "https://drblocks.pl";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const m = c.meta.home;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}`;

  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}`, languages },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: `${SITE}/${locale}`,
      siteName: "DrBlocks",
      title: m.title,
      description: m.description,
      images: [{ url: "/assets/og-default.jpg", width: 1200, height: 630, alt: m.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/assets/og-default.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const content = getContent(locale);

  // Entity-graph: Organization + WebSite połączone przez @id. Daje wyszukiwarkom
  // i modelom AI jeden, spójny obiekt „encji marki" (knowledge-graph, GEO).
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "DrBlocks",
        legalName: company.legal,
        url: SITE,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/assets/cropped-DR-BLOCKS_LOGO_male-czarne-270x270.png`,
          width: 270,
          height: 270,
        },
        image: `${SITE}/assets/og-default.jpg`,
        description: content.meta.home.description,
        telephone: company.phone,
        email: company.emailContact,
        taxID: company.nip,
        areaServed: ["PL", "DE", "EU"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: company.phone,
          email: company.emailSales,
          contactType: "sales",
          areaServed: ["PL", "DE", "EU"],
          availableLanguage: ["pl", "en", "de"],
        },
        sameAs: [company.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "DrBlocks",
        description: content.meta.home.description,
        inLanguage: localeHreflang[locale],
        publisher: { "@id": `${SITE}/#organization` },
      },
    ],
  };

  return (
    <LocaleProvider locale={locale} content={content}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        {content.ui.skipToContent}
      </a>
      <SmoothScroll />
      <Header locale={locale} content={content} />
      <main id="main">{children}</main>
      <Footer locale={locale} content={content} />
      <MobileCta locale={locale} content={content} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </LocaleProvider>
  );
}
