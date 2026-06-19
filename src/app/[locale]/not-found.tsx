"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useContent, useHref } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { notFound } = useContent();
  const href = useHref();
  return (
    <section className="relative overflow-hidden bg-mist py-28 lg:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <Container className="relative text-center">
        <p className="font-oswald text-7xl font-bold text-teal sm:text-8xl">{notFound.code}</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-steel">{notFound.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={href("/")} variant="primary" size="lg" arrow>
            {notFound.home}
          </Button>
          <Button href={href("/oferta")} variant="outline" size="lg">
            {notFound.offer}
          </Button>
        </div>
      </Container>
    </section>
  );
}
