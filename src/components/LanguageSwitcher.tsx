"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { locales, localeShort, localeNames, type Locale } from "@/i18n/config";
import { ChevronDown } from "@/components/Icons";

function Globe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" strokeLinecap="round" />
    </svg>
  );
}

/** Dropdown language switcher (globe + current locale). Preserves the path. */
export function LanguageSwitcher({ current, className }: { current: Locale; className?: string }) {
  const pathname = usePathname() || `/${current}`;
  const rest = pathname.replace(/^\/(pl|en|de)(?=\/|$)/, "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language / Język"
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate transition-colors hover:text-navy"
      >
        <Globe className="size-4 text-teal" />
        {localeShort[current]}
        <ChevronDown className={clsx("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[var(--shadow-lift)]"
        >
          {locales.map((l) => (
            <Link
              key={l}
              role="menuitem"
              href={`/${l}${rest}`}
              hrefLang={l}
              aria-current={l === current ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={clsx(
                "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                l === current ? "bg-mist text-navy" : "text-slate hover:bg-mist hover:text-navy",
              )}
            >
              <span>{localeNames[l]}</span>
              <span className="font-oswald text-xs font-semibold uppercase tracking-wide text-mute">
                {localeShort[l]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
