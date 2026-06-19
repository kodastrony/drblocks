import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getContent, localizedHref } from "@/i18n";
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
  const m = getContent(locale).meta.faq;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}/faq` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}/faq`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}/faq`, languages },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { faq, ui } = c;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <>
      <PageHeader
        title={faq.heading}
        lead={faq.lead}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: faq.heading },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="max-w-3xl">
          <FaqAccordion items={faq.items} />

          <Reveal className="mt-14 rounded-2xl border border-line bg-mist px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl sm:text-3xl">{faq.noAnswerHeading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-steel">{faq.noAnswerBody}</p>
            <div className="mt-7 flex justify-center">
              <Button href={localizedHref(locale, "/kontakt")} variant="primary" size="lg" arrow>
                {faq.noAnswerCta}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
