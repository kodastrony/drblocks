"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// odsadzenie pod sticky header (68 px) — zgodne ze `scroll-mt-24` sekcji-kotwic
const ANCHOR_OFFSET = -90;

/**
 * Page-wide smooth (eased) scrolling. Eases the wheel delta so the whole site,
 * including the sticky calculator preview, glides instead of stepping.
 * Disabled for users who prefer reduced motion, and native touch scrolling is
 * left untouched.
 *
 * Also OWNS scroll position on navigation: because Lenis is mounted once in the
 * layout (it persists across page changes) it keeps its own internal scroll
 * position and, via its rAF loop, writes that OLD position back after Next.js
 * navigates — so the user landed in the middle (desktop) or at the very bottom
 * (shorter mobile page). On every route change we therefore snap Lenis to the
 * top of the new page (or to the #hash target if present). Renders nothing.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic, no overshoot
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    // Expose for anchor links / programmatic scrolling (e.g. the mobile menu lock).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Kotwice w obrębie tej samej strony (np. „Jak to działa" → /#jak-to-dziala
    // gdy już jesteśmy na stronie głównej): natywne przewijanie do #id jest
    // przejmowane przez Lenisa, więc obsługujemy je sami — płynnie, z offsetem.
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(decodeURIComponent(id));
      if (el) lenis.scrollTo(el, { offset: ANCHOR_OFFSET });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Po KAŻDEJ zmianie ścieżki: na górę nowej podstrony (albo do #hash, jeśli jest).
  useEffect(() => {
    const lenis = lenisRef.current;
    const toTop = () => {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    };

    const id = window.location.hash.slice(1);
    if (id) {
      // nowa strona może jeszcze nie mieć policzonego layoutu — spróbuj kilka klatek
      let tries = 0;
      const go = () => {
        const el = document.getElementById(decodeURIComponent(id));
        if (el) {
          if (lenis) lenis.scrollTo(el, { offset: ANCHOR_OFFSET, immediate: true, force: true });
          else el.scrollIntoView();
        } else if (tries++ < 12) {
          requestAnimationFrame(go);
        } else {
          toTop();
        }
      };
      requestAnimationFrame(go);
      return;
    }

    toTop();
  }, [pathname]);

  return null;
}
