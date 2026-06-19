import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getContent, localizedHref } from "@/i18n";
import { locales, isLocale, defaultLocale, localeHreflang, type Locale } from "@/i18n/config";
import { asset } from "@/lib/asset";

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
  const m = getContent(locale).meta.oNas;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}/o-nas` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}/o-nas`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}/o-nas`, languages },
  };
}

export default async function ONasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { about, hero, ui, nav } = c;
  const aboutLabel = nav.find((n) => n.href === "/o-nas")?.label ?? ui.footerCompany;

  return (
    <>
      <PageHeader
        title={about.heading}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: aboutLabel },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-steel">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-navy" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-mist">
              <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
              <Image
                src={asset(about.images[0])}
                alt={about.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-balance font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              „{about.mission}”
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-oswald text-3xl font-bold tabular text-teal">{s.value}</dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">{about.closerHeading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-steel">{about.closerBody}</p>
            <div className="mt-7 flex justify-center">
              <Button href={localizedHref(locale, "/kontakt")} variant="primary" size="lg" arrow>
                {ui.freeQuote}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
