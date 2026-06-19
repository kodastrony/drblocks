import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Block3DSection } from "@/components/block3d/Block3DSection";
import { Products } from "@/components/sections/Products";
import { WhyUs } from "@/components/sections/WhyUs";
import { Calculator } from "@/components/sections/Calculator";
import { ExpertsCta } from "@/components/sections/ExpertsCta";
import { getContent } from "@/i18n";
import { locales, isLocale, defaultLocale, localeHreflang, type Locale } from "@/i18n/config";

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
  const m = getContent(locale).meta.home;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}`, languages },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DrBlocks",
    url: `${SITE}/${locale}`,
    inLanguage: localeHreflang[locale],
    publisher: { "@type": "Organization", name: "DrBlocks", url: SITE },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      <Hero />
      <TrustBar locale={locale} />
      <HowItWorks locale={locale} />
      <Block3DSection locale={locale} />
      <Products locale={locale} />
      <WhyUs locale={locale} />
      <Calculator />
      <ExpertsCta locale={locale} />
    </>
  );
}
