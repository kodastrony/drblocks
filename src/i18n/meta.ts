import type { Metadata } from "next";
import { locales, defaultLocale, localeHreflang, ogLocale, type Locale } from "./config";

const SITE = "https://drblocks.pl";

// 1200×630 brand/product OG image (generated from the product film) — satisfies the
// minimum size for `summary_large_image` Twitter/X + rich social previews.
export const OG_IMAGE = { url: `${SITE}/assets/og-default.jpg`, width: 1200, height: 630 } as const;

/**
 * One source of truth for per-page SEO metadata: absolute title, canonical +
 * hreflang (pl/en/de + x-default), and OpenGraph/Twitter with the correct
 * page-specific title/description and the 1200×630 OG image.
 *
 * `path` is the locale-agnostic, root-relative route ("" for home, "/oferta",
 * "/oferta/standard-block", …). Next adds basePath + trailingSlash itself.
 */
export function pageMeta({
  locale,
  path,
  title,
  description,
  keywords,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const seg = path === "/" ? "" : path;
  const url = `${SITE}/${locale}${seg}`;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}${seg}` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}${seg}`;

  return {
    title: { absolute: title },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: `/${locale}${seg}`, languages },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url,
      siteName: "DrBlocks",
      title,
      description,
      images: [{ ...OG_IMAGE, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/**
 * BreadcrumbList JSON-LD from the same crumb list shown in PageHeader.
 * `path` is locale-agnostic ("" = home, "/oferta", …); the last crumb (current
 * page) omits `path` so no `item` URL is emitted, per schema.org guidance.
 */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path !== undefined ? { item: `${SITE}/${locale}${it.path === "/" ? "" : it.path}` } : {}),
    })),
  };
}
