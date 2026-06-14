import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-mist py-28 lg:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <Container className="relative text-center">
        <p className="font-oswald text-7xl font-bold text-teal sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Nie znaleźliśmy tej strony</h1>
        <p className="mx-auto mt-4 max-w-md text-steel">
          Strona mogła zostać przeniesiona lub nie istnieje. Wróć na stronę główną albo sprawdź naszą
          ofertę.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="lg" arrow>
            Strona główna
          </Button>
          <Button href="/oferta" variant="outline" size="lg">
            Zobacz ofertę
          </Button>
        </div>
      </Container>
    </section>
  );
}
