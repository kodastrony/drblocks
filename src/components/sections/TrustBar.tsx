/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trust } from "@/lib/content";
import { asset } from "@/lib/asset";

export function TrustBar() {
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
          slides left by exactly one copy (-50%) for a seamless loop. Pauses on
          hover and (via globals.css) for reduced-motion users. */}
      <div className="group marquee-mask mt-9 overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20"
            >
              {trust.logos.map((logo) => (
                <li key={logo.alt} className="shrink-0">
                  <img
                    src={asset(logo.src)}
                    alt={copy === 1 ? "" : logo.alt}
                    loading="lazy"
                    className="h-12 w-auto max-w-[210px] object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 sm:h-16"
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
