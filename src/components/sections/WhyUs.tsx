import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { benefits } from "@/lib/content";

export function WhyUs() {
  return (
    <section className="bg-mist py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-[2.6rem]">{benefits.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-lg leading-relaxed text-steel">{benefits.intro}</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((b) => (
            <StaggerItem key={b.title} className="h-full">
              <div className="group flex h-full flex-col items-center rounded-2xl border border-line bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-card)]">
                <div className="relative size-20 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={b.img}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-5 text-lg leading-snug">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-steel">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/kontakt" variant="primary" size="lg" arrow>
            Darmowa wycena
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
