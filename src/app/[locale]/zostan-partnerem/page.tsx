import type { Metadata } from "next";
import Link from "next/link";
import { getContent, localizedHref } from "@/i18n";
import { locales, defaultLocale, isLocale, localeHreflang, type Locale } from "@/i18n/config";
import { PartnerMap } from "@/components/partner/PartnerMap";
import { PartnerForm } from "@/components/partner/PartnerForm";
import { PartnerBenefits } from "@/components/partner/PartnerBenefits";

const SITE = "https://drblocks.pl";
const PATH = "/zostan-partnerem";

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
  const m = getContent(locale).meta.partner;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}${PATH}` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}${PATH}`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}${PATH}`, languages },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE}/${locale}${PATH}`,
      images: [{ url: "/assets/hero-poster.jpg", width: 640, height: 480, alt: m.title }],
    },
  };
}

const Check = () => (
  <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function PartnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const p = c.partner;
  const href = (h: string) => localizedHref(locale, h);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.ui.breadcrumbHome, item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: p.hero.title, item: `${SITE}/${locale}${PATH}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-50 blur-3xl" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label={c.ui.breadcrumbAria} className="flex flex-wrap items-center gap-2 text-sm text-steel">
            <Link href={href("/")} className="hover:text-navy">{c.ui.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-navy">{p.hero.title}</span>
          </nav>
          <span className="mt-6 inline-flex items-center gap-2.5 font-oswald text-xs font-semibold uppercase tracking-wider text-teal-800">
            <span className="h-px w-7 bg-teal-600" />
            {p.hero.eyebrow}
          </span>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-bold text-navy sm:text-5xl">
            {p.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel">{p.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#zgloszenie"
              className="inline-flex items-center justify-center rounded-xl bg-navy px-7 py-4 font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)] transition-colors hover:bg-teal"
            >
              {p.hero.primaryCta}
            </a>
            <a
              href="#mapa"
              className="inline-flex items-center justify-center rounded-xl border border-line-strong px-7 py-4 font-semibold text-navy transition-colors hover:border-navy"
            >
              {p.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* GROWTH */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">{p.growth.heading}</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-steel">
              {p.growth.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Link
              href={href("/kontakt")}
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-teal-800"
            >
              {p.growth.cta}
              <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {p.growth.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-mist/60 p-6 text-center">
                <div className="font-oswald text-3xl font-bold tabular-nums text-teal-700 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-mute">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATHS */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">{p.paths.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-steel">{p.paths.lead}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {p.paths.cards.map((card) => (
              <div
                key={card.title}
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-3 py-1 font-oswald text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {card.eyebrow}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{card.title}</h3>
                <ul className="mt-4 space-y-3">
                  {card.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-steel">
                      <Check />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-16 lg:py-24">
        <PartnerBenefits dict={p.benefits} ctaLabel={p.hero.primaryCta} />
      </section>

      {/* MAP */}
      <section id="mapa" className="scroll-mt-20 bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">{p.map.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-steel">{p.map.lead}</p>
          </div>
          <PartnerMap t={p.map} />
        </div>
      </section>

      {/* FORM */}
      <section id="zgloszenie" className="scroll-mt-20 bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">{p.form.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-steel">{p.form.lead}</p>
          </div>
          <div className="rounded-3xl border border-line bg-mist/40 p-6 sm:p-8">
            <PartnerForm t={p.form} />
          </div>
        </div>
      </section>
    </>
  );
}
