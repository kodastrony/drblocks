"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Page-wide smooth (eased) scrolling. Eases the wheel delta so the whole site,
 * including the sticky calculator preview, glides instead of stepping.
 * Disabled for users who prefer reduced motion, and native touch scrolling is
 * left untouched. Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic, no overshoot
      smoothWheel: true,
    });
    // Expose for anchor links / programmatic scrolling.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
