import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { Check } from "@/components/Icons";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Regulowane bloczki fundamentowe – oferta",
  description:
    "Oferta DrBlocks: Standard Block i Standard Plus Block. Regulowane bloczki fundamentowe do budownictwa modułowego – nośność do 5 t z podlewką cementową, regulacja wysokości 120–200 mm, montaż w jeden dzień.",
  alternates: { canonical: "/oferta" },
};

const compareRows: { label: string; values: [string | boolean, string | boolean] }[] = [
  { label: "Korpus betonowy", values: ["B30", "B30"] },
  { label: "Regulacja wysokości", values: ["120–200 mm", "120–200 mm"] },
  { label: "Zakres regulacji", values: ["70 mm", "70 mm"] },
  { label: "Precyzja regulacji", values: ["1 mm", "1 mm"] },
  { label: "Nośność", values: ["do 1 t (5 t z podlewką)", "do 1 t (5 t z podlewką)"] },
  { label: "Chwytaki magnetyczne", values: [false, true] },
  { label: "Montaż obróbki dolnej (cokół)", values: [false, true] },
  { label: "Przeznaczenie", values: ["uniwersalne", "wykończenie cokołu"] },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto size-5 text-teal-600" aria-label="Tak" />;
  if (v === false) return <span className="text-line-strong" aria-label="Nie">–</span>;
  return <span className="tabular text-navy">{v}</span>;
}

export default function OfertaPage() {
  return (
    <>
      <PageHeader
        title="Regulowane bloczki fundamentowe"
        lead="Dwa warianty jednego, sprawdzonego systemu posadowienia dla budownictwa modułowego. Dobierzemy odpowiedni do Twojego projektu, obciążeń i warunków gruntowych."
        crumbs={[{ label: "Strona główna", href: "/" }, { label: "Oferta" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Stagger className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <ProductCard p={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Porównanie wariantów</h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line bg-navy text-white">
                    <th scope="col" className="px-5 py-4 text-left font-medium text-white/70">Parametr</th>
                    <th scope="col" className="px-5 py-4 text-center font-semibold">Standard Block</th>
                    <th scope="col" className="px-5 py-4 text-center font-semibold">Standard Plus Block</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? "bg-mist/50" : "bg-white"}>
                      <th scope="row" className="px-5 py-3.5 text-left font-medium text-slate">
                        {row.label}
                      </th>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-5 py-3.5 text-center">
                          <Cell v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
