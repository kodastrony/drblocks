/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trust } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="border-b border-line bg-white py-12">
      <Container>
        <Reveal>
          <p className="text-center font-oswald text-xs font-semibold uppercase tracking-[0.22em] text-mute">
            {trust.heading}
          </p>
        </Reveal>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-14">
          {trust.logos.map((logo, i) => (
            <Reveal key={logo.alt} delay={i * 0.04}>
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-8 w-auto max-w-[150px] object-contain opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
