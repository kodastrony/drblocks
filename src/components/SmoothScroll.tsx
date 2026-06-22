"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll management on navigation + reload (Lenis was removed — see git history).
 *
 * 1) Disable the browser's automatic scroll restoration. With it ON, reloading a
 *    page restored the previous scroll offset, but because content above loads/
 *    shifts (images, fonts, reveals) you landed at a "random" mid-page spot. With
 *    it OFF the page reliably starts at the top (or at the #hash target).
 * 2) On every route change: jump to the top of the new page, or to the #hash
 *    section (native, honoring the sections' `scroll-mt-24`). Renders nothing.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("scrollRestoration" in history)) return;
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      const el = document.getElementById(decodeURIComponent(id));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
