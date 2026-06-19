import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { stepIcons } from "@/components/Icons";
import { getContent } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function HowItWorks({ locale }: { locale: Locale }) {
  const { system } = getContent(locale);
  return (
    <section id="jak-to-dziala" className="scroll-mt-24 bg-mist py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="text-3xl sm:text-[2.6rem]">{system.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-lg leading-relaxed text-steel">{system.body}</p>
          </Reveal>
        </div>

        <div className="relative mt-14">
          <div className="absolute inset-x-0 top-12 hidden h-px bg-line-strong lg:block" aria-hidden />
          <Stagger className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {system.steps.map((s) => {
            const Icon = stepIcons[s.icon];
            return (
              <StaggerItem key={s.no}>
                <div className="group relative h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-mist text-navy transition-colors group-hover:bg-teal-50">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-oswald text-3xl font-bold leading-none text-line-strong transition-colors group-hover:text-teal/50">
                      {s.no}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{s.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
