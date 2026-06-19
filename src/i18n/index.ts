import type { Locale } from "./config";
import type { SiteContent } from "./types";
import { pl } from "./content/pl";
import { en } from "./content/en";
import { de } from "./content/de";

const dictionaries: Record<Locale, SiteContent> = { pl, en, de };

/**
 * Returns the content dictionary for a locale. Server-only by convention:
 * importing this pulls in all three languages, so client components should
 * read content from <LocaleProvider> (useContent) instead, which only ships
 * the active locale.
 */
export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale] ?? pl;
}

/**
 * Prefix a locale-agnostic, root-relative site path with the active locale.
 * Next.js prepends basePath/trailingSlash itself — do NOT add them here.
 *   localizedHref("pl", "/oferta")        -> "/pl/oferta"
 *   localizedHref("en", "/")              -> "/en"
 *   localizedHref("de", "/#jak-to-dziala")-> "/de/#jak-to-dziala"
 *   localizedHref("pl", "mailto:…")        -> unchanged
 */
export function localizedHref(locale: Locale, href: string): string {
  if (!href || !href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export { getContent as default };
