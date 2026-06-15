"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { nav, company } from "@/lib/content";
import { asset } from "@/lib/asset";
import { Phone, ChevronDown, Menu, Close } from "@/components/Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const pathname = usePathname();
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mobile dialog: focus management, Escape, focus trap
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
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
      menuBtnRef.current?.focus();
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
        <Link href="/" className="flex items-center" aria-label="DrBlocks – strona główna">
          <Image
            src={asset("/assets/logo-dark.png")}
            alt="DrBlocks"
            width={180}
            height={33}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav aria-label="Główna nawigacja" className="hidden items-center gap-1 lg:flex">
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
                          href={item.href}
                          className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate transition-colors hover:bg-mist hover:text-navy"
                        >
                          Przegląd oferty
                        </Link>
                        {item.children.map((c) => (
                          <Link
                            role="menuitem"
                            key={c.href}
                            href={c.href}
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
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy transition-colors hover:text-teal-800 md:flex"
          >
            <Phone className="size-4 text-teal" />
            {company.phone}
          </a>
          <Link
            href="/kontakt"
            className="hidden rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)] transition-colors hover:bg-teal sm:inline-flex"
          >
            Darmowa wycena
          </Link>
          <button
            ref={menuBtnRef}
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy lg:hidden"
            aria-label="Otwórz menu"
            aria-expanded={open}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu nawigacji"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-navy lg:hidden"
          >
            <div className="flex h-[68px] items-center justify-between px-5">
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
                aria-label="Zamknij menu"
              >
                <Close className="size-5" />
              </button>
            </div>
            <nav aria-label="Menu mobilne" className="flex flex-col gap-1 px-5 pb-10 pt-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/10 py-3.5 font-display text-2xl font-semibold text-white"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-1 py-2 pl-4">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="py-1.5 text-sm text-white/75">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <Link
                href="/o-nas"
                className="border-b border-white/10 py-3.5 font-display text-2xl font-semibold text-white"
              >
                O nas
              </Link>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/kontakt"
                  className="rounded-xl bg-teal px-5 py-4 text-center font-semibold text-white"
                >
                  Darmowa wycena
                </Link>
                <a
                  href={company.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-4 font-semibold text-white"
                >
                  <Phone className="size-4" /> {company.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
