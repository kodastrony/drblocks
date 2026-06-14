import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/Icons";
import { experts, company } from "@/lib/content";

export function ExpertsCta() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-mist px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-50 blur-2xl"
            aria-hidden
          />
          <Reveal className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl sm:text-[2.6rem]">
              {experts.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-steel">
              {experts.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={experts.cta.href} variant="primary" size="lg" arrow>
                {experts.cta.label}
              </Button>
              <Button href={company.phoneHref} variant="outline" size="lg">
                <Phone className="size-4 text-teal" />
                {company.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
