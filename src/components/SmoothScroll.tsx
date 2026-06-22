"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll management on client-side navigation.
 *
 * (Lenis smooth-scroll was REMOVED on purpose: its persistent rAF loop kept its
 * own scroll position and wrote the OLD value back after Next.js navigated, so
 * users landed mid-page / at the bottom of the new route. It was also a constant
 * main-thread cost on weak devices. Native scrolling is deterministic and free;
 * smooth anchor scrolling is handled by CSS `scroll-behavior: smooth` + the
 * sections' `scroll-mt-24`.)
 *
 * On every route change WITHOUT a #hash we jump instantly to the very top of the
 * new page. With a #hash we leave it to the browser/Next (native smooth scroll to
 * the section). Renders nothing.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // kotwica (#sekcja) → zostaw natywne przewijanie do elementu (z `scroll-mt-*`)
    if (window.location.hash) return;
    // brak kotwicy → natychmiast na samą górę nowej podstrony (scroll-behavior=auto)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
