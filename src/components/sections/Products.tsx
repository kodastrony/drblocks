import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/content";

export function Products() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <h2 className="text-3xl sm:text-[2.6rem]">Nasze produkty</h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-steel sm:text-right">
              Dwa warianty jednego, sprawdzonego systemu – dobierzemy odpowiedni do Twojego projektu
              i terenu.
            </p>
          </Reveal>
        </div>

        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProductCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/kontakt" variant="primary" size="lg" arrow>
            Darmowa wycena
          </Button>
          <Button href="/oferta" variant="outline" size="lg">
            Porównaj warianty
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
