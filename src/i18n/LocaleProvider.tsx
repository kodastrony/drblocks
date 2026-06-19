"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { localeHreflang, type Locale } from "./config";
import type { SiteContent } from "./types";
import { localizedHref } from "./index";

type LocaleCtx = { locale: Locale; content: SiteContent };

const Ctx = createContext<LocaleCtx | null>(null);

/**
 * Wraps the per-locale subtree. The server layout computes `content` for the
 * active locale and passes it in, so only that locale is serialized to the
 * client — the other languages never reach the browser bundle.
 */
export function LocaleProvider({
  locale,
  content,
  children,
}: {
  locale: Locale;
  content: SiteContent;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, content }), [locale, content]);
  // The shared root layout renders <html lang="pl">; correct it per locale.
  useEffect(() => {
    document.documentElement.lang = localeHreflang[locale];
  }, [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useCtx(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale/useContent must be used within <LocaleProvider>");
  return ctx;
}

export function useLocale(): Locale {
  return useCtx().locale;
}

export function useContent(): SiteContent {
  return useCtx().content;
}

/** Returns a memoized locale-prefixing href helper for client components. */
export function useHref(): (href: string) => string {
  const { locale } = useCtx();
  return useMemo(() => (href: string) => localizedHref(locale, href), [locale]);
}
