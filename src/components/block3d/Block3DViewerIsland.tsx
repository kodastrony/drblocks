"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { useContent } from "@/i18n/LocaleProvider";

function Loading() {
  const { viewer3d } = useContent();
  return (
    <div className="flex h-[360px] w-full items-center justify-center rounded-2xl border border-white/10 bg-[#141d28] text-sm text-white/60 sm:h-[460px]">
      {viewer3d.loading}
    </div>
  );
}

const BlockViewer = dynamic(() => import("@/components/block3d/BlockViewer"), {
  ssr: false,
  loading: () => <Loading />,
});

export function Block3DViewerIsland() {
  const { viewer3d } = useContent();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Po załadowaniu modelu pauzujemy jego pętlę renderowania, gdy NIE jest
  // potrzebna — tzn. gdy jest poza ekranem, w trakcie scrollowania strony,
  // albo karta jest nieaktywna. Dzięki temu ciężki render 3D (post-processing,
  // cienie) nie obciąża przeglądarki i scrollowanie reszty strony pozostaje
  // płynne także na słabszym sprzęcie. Wznawiamy, gdy model jest w kadrze,
  // scroll się zatrzymał i karta jest widoczna.
  useEffect(() => {
    if (!show) return;
    const el = wrapRef.current;
    if (!el) return;

    let onScreen = true;
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const recompute = () => setActive(onScreen && !scrolling && !document.hidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        recompute();
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );
    io.observe(el);

    // Pauza w trakcie scrollowania (stan zmieniamy tylko na początku i końcu
    // scrolla — bez setState na każde zdarzenie, żeby samo to nie kosztowało).
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        recompute();
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        recompute();
      }, 180);
    };
    const onVis = () => recompute();

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(scrollTimer);
    };
  }, [show]);

  if (show)
    return (
      <div ref={wrapRef}>
        <BlockViewer active={active} onClose={() => setShow(false)} />
      </div>
    );

  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className="group relative block h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2a38] to-[#11171f] sm:h-[460px]"
      aria-label={viewer3d.loadAria}
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
      <Image
        src={asset("/assets/STANDARD-983x1024-1.webp")}
        alt={viewer3d.posterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 font-oswald text-[10px] font-semibold uppercase tracking-wider text-white">
        {viewer3d.badge}
      </span>
      <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-navy shadow-[var(--shadow-lift)] transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-navy" strokeWidth={2}>
          <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {viewer3d.open}
      </span>
    </button>
  );
}
