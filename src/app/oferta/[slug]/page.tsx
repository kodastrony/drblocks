import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { Check, Phone } from "@/components/Icons";
import { products, company } from "@/lib/content";
import { asset } from "@/lib/asset";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} – regulowany bloczek fundamentowy`,
    description: `${p.name} DrBlocks: ${p.short} Beton B30, regulacja wysokości 120–200 mm, nośność do 5 t z podlewką cementową, montaż w jeden dzień.`,
    alternates: { canonical: `/oferta/${p.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const related = products.find((x) => x.slug === p.related);
  const highlights = p.specs.filter((s) => s.highlight).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.short,
    brand: { "@type": "Brand", name: "DrBlocks" },
    material: "Beton B30",
    category: "Regulowane bloczki fundamentowe",
    url: `https://drblocks.pl/oferta/${p.slug}`,
  };

  return (
    <>
      <PageHeader
        title={p.name}
        lead={p.short}
        crumbs={[
          { label: "Strona główna", href: "/" },
          { label: "Oferta", href: "/oferta" },
          { label: p.name },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:sticky lg:top-24">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-mist to-white">
              <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
              {p.badge && (
                <span className="absolute left-5 top-5 z-10 rounded-full bg-navy/90 px-3.5 py-1.5 font-oswald text-[11px] font-semibold uppercase tracking-wider text-white">
                  {p.badge}
                </span>
              )}
              <Image
                src={asset(p.image)}
                alt={p.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-steel">{p.intro}</p>
            </Reveal>

            <Reveal delay={0.06} className="mt-7 grid grid-cols-3 gap-3">
              {highlights.map((h) => (
                <div key={h.k} className="rounded-xl border border-line bg-mist/60 p-4">
                  <p className="font-oswald text-lg font-bold leading-tight text-navy">{h.v.split("(")[0].trim()}</p>
                  <p className="mt-1 text-xs text-steel">{h.k}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-7 rounded-xl border border-line bg-mist/60 p-4 text-sm leading-relaxed text-steel">
              <span className="font-semibold text-navy">Cena ustalana indywidualnie</span> do projektu
              i ilości. To jednorazowa inwestycja stanowiąca ułamek kosztu całej budowy.{" "}
              <Link href="/faq" className="font-semibold text-teal-800">
                Więcej w FAQ
              </Link>
              .
            </Reveal>

            <Reveal delay={0.14} className="mt-6 flex flex-wrap gap-3">
              <Button href={`/kontakt?produkt=${encodeURIComponent(p.name)}`} variant="primary" size="lg" arrow>
                {p.closer.cta}
              </Button>
              <Button href={company.phoneHref} variant="outline" size="lg">
                <Phone className="size-4 text-teal" />
                {company.phone}
              </Button>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <h2 className="text-2xl">Parametry techniczne</h2>
              <dl className="mt-5 overflow-hidden rounded-2xl border border-line">
                {p.specs.map((s, i) => (
                  <div
                    key={s.k}
                    className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
                      i % 2 ? "bg-mist/50" : "bg-white"
                    }`}
                  >
                    <dt className="flex items-center gap-2 text-sm font-medium text-slate">
                      {s.highlight && <Check className="size-4 shrink-0 text-teal-600" />}
                      {s.k}
                    </dt>
                    <dd className="text-sm text-navy sm:text-right">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance text-3xl text-white sm:text-4xl">
              {p.closer.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
              {p.closer.body}
            </p>
            <div className="mt-8 flex justify-center">
              <Button href={`/kontakt?produkt=${encodeURIComponent(p.name)}`} variant="accent" size="lg" arrow>
                {p.closer.cta}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {related && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <h2 className="text-2xl">Zobacz też</h2>
            <div className="mt-6 max-w-sm">
              <ProductCard p={related} />
            </div>
          </Container>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
