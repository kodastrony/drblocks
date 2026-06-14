import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ – najczęstsze pytania o bloczki fundamentowe",
  description:
    "Odpowiedzi na najczęstsze pytania o regulowane bloczki fundamentowe DrBlocks: różnice między wariantami, kotwienie, nośność, montaż i opłacalność.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title={faq.heading}
        lead="Masz pytania o regulowane bloczki fundamentowe? Zebraliśmy najważniejsze odpowiedzi w jednym miejscu."
        crumbs={[{ label: "Strona główna", href: "/" }, { label: "FAQ" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="max-w-3xl">
          <FaqAccordion items={faq.items} />

          <Reveal className="mt-14 rounded-2xl border border-line bg-mist px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl sm:text-3xl">Nie znalazłeś odpowiedzi?</h2>
            <p className="mx-auto mt-4 max-w-xl text-steel">
              Każdy projekt jest inny – chętnie odpowiemy na Twoje pytania i pomożemy dobrać
              najlepsze rozwiązanie.
            </p>
            <div className="mt-7 flex justify-center">
              <Button href="/kontakt" variant="primary" size="lg" arrow>
                Skontaktuj się z nami
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
