// Central i18n configuration. Kept dependency-free so it works in both the
// Cloudflare (root) and GitHub Pages (basePath) static exports.

export const locales = ["pl", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

/** Human label for the language switcher. */
export const localeNames: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
};

/** Short label shown in the compact header switcher. */
export const localeShort: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
  de: "DE",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const localeHreflang: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en",
  de: "de-DE",
};

/** OpenGraph locale tags. */
export const ogLocale: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_GB",
  de: "de_DE",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
