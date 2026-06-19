/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getContent } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { asset } from "@/lib/asset";

export function TrustBar({ locale }: { locale: Locale }) {
  const { trust } = getContent(locale);
  return (
    <section className="border-b border-line bg-white py-12">
      <Container>
        <Reveal>
          <p className="text-center font-oswald text-xs font-semibold uppercase tracking-[0.22em] text-mute">
            {trust.heading}
          </p>
        </Reveal>
      </Container>

      {/* Auto-scrolling carousel: one track holds two identical logo copies and
          slides left by exactly one copy (-50%) for a seamless loop. Each logo
          is individually sized (`scale`) and spaced (`pad` via per-li padding,
          so the loop stays seamless). `width`/`height` reserve space before the
          image loads, so the track is full-width from the first frame (no slow
          crawl). Keeps moving on hover; pauses only for reduced-motion (globals.css). */}
      <div className="marquee-mask logo-row mt-9 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {trust.logos.map((logo) => (
                <li
                  key={logo.alt}
                  className="flex shrink-0 items-center"
                  style={{
                    paddingLeft: `calc(var(--logo-gap) * ${logo.pad} / 2)`,
                    paddingRight: `calc(var(--logo-gap) * ${logo.pad} / 2)`,
                  }}
                >
                  <img
                    src={asset(logo.src)}
                    alt={copy === 1 ? "" : logo.alt}
                    width={logo.w}
                    height={logo.h}
                    decoding="async"
                    style={{ height: `calc(var(--logo-h) * ${logo.scale})`, width: "auto" }}
                    className="max-w-none object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
