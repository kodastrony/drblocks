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
import { asset } from "@/lib/asset";
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

  return (
    <>
      {/* Preload the hero poster — it's the LCP frame for the homepage (React 19
          hoists this <link> to <head>). The full video stays preload=metadata. */}
      <link rel="preload" as="image" href={asset("/assets/drblocks-film-poster.jpg")} fetchPriority="high" />
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
