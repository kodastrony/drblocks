"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { company } from "@/lib/company";
import { asset } from "@/lib/asset";
import { localizedHref } from "@/i18n";
import { locales, localeShort, type Locale } from "@/i18n/config";
import type { SiteContent } from "@/i18n/types";
import { Phone, ChevronDown, Menu, Close } from "@/components/Icons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { nav, ui } = content;
  const href = (h: string) => localizedHref(locale, h);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // portal montujemy dopiero po stronie klienta (createPortal potrzebuje `document`)
  useEffect(() => setMounted(true), []);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  // Kotwice W OBRĘBIE tej samej podstrony (np. „Jak to działa" → /pl/#jak-to-dziala
  // gdy już jesteśmy na /pl): ścieżka się NIE zmienia, więc menu nie zamknęłoby się
  // samo i nic by się nie przewinęło. Łapiemy klik w fazie capture (przed nawigacją
  // Next), zamykamy menu i sami płynnie przewijamy do sekcji (z offsetem scroll-mt).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || !url.hash) return; // tylko ta sama strona + #hash
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      // przejmujemy: stop dla Next/Link, zamykamy menu, skok do sekcji po odblokowaniu body
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.pathname + url.search + url.hash);
      }
      // krótkie opóźnienie: pozwól menu się zamknąć i zdjąć blokadę overflow zanim
      // przewiniemy do sekcji (przy overflow:hidden programowy scroll też nie zadziała)
      window.setTimeout(() => el.scrollIntoView(), 60);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Blokada przewijania tła przy otwartym menu — TYLKO `overflow:hidden` na <body>.
  // NIE na <html> (iOS Safari ma błąd: overflow:hidden na <html> + elementy fixed
  // → zacina/„zjada" scroll). NIE `position:fixed` (wymuszało pełny reflow). Menu i
  // tak zakrywa cały ekran nieprzezroczyście, więc ewentualny przeciek scrolla na iOS
  // jest niewidoczny. Pozycja scrolla nienaruszona → po zamknięciu nic nie skacze.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      menuBtnRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/0",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href={href("/")} className="flex items-center" aria-label={ui.homeAria}>
          <Image
            src={asset("/assets/logo-dark.png")}
            alt="DrBlocks"
            width={180}
            height={33}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav aria-label={ui.mainNavAria} className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDrop(item.label)}
                onMouseLeave={() => setDrop(null)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={drop === item.label}
                  aria-controls={`menu-${item.label}`}
                  onClick={() => setDrop((d) => (d === item.label ? null : item.label))}
                  onKeyDown={(e) => e.key === "Escape" && setDrop(null)}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate transition-colors hover:text-navy"
                >
                  {item.label}
                  <ChevronDown
                    className={clsx(
                      "size-3.5 transition-transform duration-200",
                      drop === item.label && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {drop === item.label && (
                    <motion.div
                      id={`menu-${item.label}`}
                      role="menu"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full w-60 pt-2"
                    >
                      <div className="overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[var(--shadow-lift)]">
                        <Link
                          role="menuitem"
                          href={href(item.href)}
                          className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate transition-colors hover:bg-mist hover:text-navy"
                        >
                          {ui.offerOverview}
                        </Link>
                        {item.children.map((c) => (
                          <Link
                            role="menuitem"
                            key={c.href}
                            href={href(c.href)}
                            className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate transition-colors hover:bg-mist hover:text-navy"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                href={href(item.href)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher current={locale} className="hidden sm:block" />
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy transition-colors hover:text-teal-800 xl:flex"
          >
            <Phone className="size-4 text-teal" />
            {company.phone}
          </a>
          <Link
            href={href("/kontakt")}
            className="hidden rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)] transition-colors hover:bg-teal-700 sm:inline-flex"
          >
            {ui.freeQuote}
          </Link>
          <button
            ref={menuBtnRef}
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy lg:hidden"
            aria-label={ui.openMenu}
            aria-expanded={open}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobilne menu — przez PORTAL do <body>. KLUCZOWE: panel NIE może być w <header>,
          bo header (sticky + backdrop-blur po scrollu) tworzy „containing block" dla
          elementów `position:fixed` → przy zescrollowanej stronie menu lądowało poza
          ekranem (otwierało się tylko na samej górze). Portal do body = pozycja zawsze
          względem viewportu. Renderowane warunkowo (montaż przy otwarciu) + animacja
          CSS @keyframes (odpala się za każdym otwarciem). Bez framer-motion / will-change. */}
      {mounted &&
        open &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={ui.mobileNavAria}
            className="mobile-menu fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-navy lg:hidden"
          >
          <div className="sticky top-0 z-10 flex h-[68px] items-center justify-between border-b border-white/10 bg-navy px-5">
              <Image
                src={asset("/assets/logo-light.png")}
                alt="DrBlocks"
                width={180}
                height={33}
                className="h-7 w-auto"
              />
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-lg border border-white/20 text-white"
                aria-label={ui.closeMenu}
              >
                <Close className="size-5" />
              </button>
            </div>
            <nav aria-label={ui.mobileNavAria} className="flex flex-col gap-1 px-5 pb-10 pt-4">
              {nav.map((item, i) => (
                <div
                  key={item.label}
                  className="menu-item"
                  style={{ animationDelay: `${0.05 + i * 0.04}s` }}
                >
                  <Link
                    href={href(item.href)}
                    className="block border-b border-white/10 py-3.5 font-display text-2xl font-semibold text-white"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-1 py-2 pl-4">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={href(c.href)}
                          className="py-1.5 text-sm text-white/75"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href={href("/o-nas")}
                className="menu-item block border-b border-white/10 py-3.5 font-display text-2xl font-semibold text-white"
                style={{ animationDelay: `${0.05 + nav.length * 0.04}s` }}
              >
                {ui.footerCompany}
              </Link>
              <div
                className="menu-item mt-6 flex items-center gap-2"
                style={{ animationDelay: `${0.05 + (nav.length + 1) * 0.04}s` }}
              >
                {locales.map((l) => {
                  const rest = (pathname || `/${locale}`).replace(/^\/(pl|en|de)(?=\/|$)/, "");
                  return (
                    <Link
                      key={l}
                      href={`/${l}${rest}`}
                      hrefLang={l}
                      aria-current={l === locale ? "true" : undefined}
                      className={clsx(
                        "rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors",
                        l === locale
                          ? "border-teal-700 bg-teal-700 text-white"
                          : "border-white/20 text-white/75 hover:border-white/40 hover:text-white",
                      )}
                    >
                      {localeShort[l]}
                    </Link>
                  );
                })}
              </div>
              <div
                className="menu-item mt-4 flex flex-col gap-3"
                style={{ animationDelay: `${0.05 + (nav.length + 2) * 0.04}s` }}
              >
                <Link
                  href={href("/kontakt")}
                  className="rounded-xl bg-teal-700 px-5 py-4 text-center font-semibold text-white"
                >
                  {ui.freeQuote}
                </Link>
                <a
                  href={company.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-4 font-semibold text-white"
                >
                  <Phone className="size-4" /> {company.phone}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
