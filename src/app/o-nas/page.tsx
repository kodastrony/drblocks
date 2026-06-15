import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { about, hero } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "O nas – producent regulowanych bloczków fundamentowych",
  description:
    "DrBlocks to polski producent innowacyjnych, regulowanych bloczków fundamentowych dla budownictwa modułowego. Poznaj naszą misję i podejście.",
  alternates: { canonical: "/o-nas" },
};

export default function ONasPage() {
  return (
    <>
      <PageHeader
        title={about.heading}
        crumbs={[{ label: "Strona główna", href: "/" }, { label: "O nas" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-steel">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-navy" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-mist">
              <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
              <Image
                src={asset(about.images[0])}
                alt="DrBlocks – regulowany bloczek fundamentowy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-balance font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              „{about.mission}”
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-oswald text-3xl font-bold tabular text-teal">{s.value}</dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Zbudujmy solidny fundament</h2>
            <p className="mx-auto mt-4 max-w-xl text-steel">
              Skontaktuj się z nami – dobierzemy rozwiązanie i przygotujemy wycenę.
            </p>
            <div className="mt-7 flex justify-center">
              <Button href="/kontakt" variant="primary" size="lg" arrow>
                Darmowa wycena
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
