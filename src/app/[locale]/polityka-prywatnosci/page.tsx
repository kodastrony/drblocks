import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
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
  const m = getContent(locale).meta.privacy;
  const languages: Record<string, string> = {
    "x-default": `${SITE}/${defaultLocale}/polityka-prywatnosci`,
  };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}/polityka-prywatnosci`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}/polityka-prywatnosci`, languages },
    robots: { index: false, follow: true },
  };
}

export default async function PolitykaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { privacy, ui } = c;

  return (
    <>
      <PageHeader
        title={privacy.title}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: privacy.title },
        ]}
      />
      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-mute">{privacy.updated}</p>
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-teal-700 prose-strong:text-navy">
            {privacy.sections.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
