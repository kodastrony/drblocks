import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { getContent, localizedHref } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function Products({ locale }: { locale: Locale }) {
  const { products, ui } = getContent(locale);
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <h2 className="text-3xl sm:text-[2.6rem]">{products.heading}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-steel sm:text-right">{products.intro}</p>
          </Reveal>
        </div>

        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {products.list.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProductCard p={p} locale={locale} learnMore={ui.learnMore} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={localizedHref(locale, "/kontakt")} variant="primary" size="lg" arrow>
            {ui.freeQuote}
          </Button>
          <Button href={localizedHref(locale, "/oferta")} variant="outline" size="lg">
            {products.compareCta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
