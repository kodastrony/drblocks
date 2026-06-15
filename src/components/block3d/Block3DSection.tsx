import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/Icons";
import { Block3DViewerIsland } from "./Block3DViewerIsland";

const points = [
  "Obróć i przybliż z każdej strony",
  "Zobacz na żywo regulację 0–55 mm",
  "Korpus B30, stalowa stopa, 4× pręty M16",
  "Przełącz Standard / Plus i porównaj chwytak magnetyczny",
];

export function Block3DSection() {
  return (
    <section id="model-3d" className="relative scroll-mt-24 overflow-hidden bg-navy py-20 lg:py-28">
      <div className="bg-grid-dark absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="text-3xl text-white sm:text-[2.6rem]">Zobacz bloczek w 3D</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
            Obejrzyj system DrBlocks dokładnie tak, jak wygląda w rzeczywistości, i sprawdź, jak
            działa precyzyjna regulacja wysokości. Pełna, interaktywna konstrukcja, nie zdjęcie.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/80">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                  <Check className="size-3.5" />
                </span>
                <span className="text-[15px]">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/kontakt" variant="accent" size="lg" arrow>
              Darmowa wycena
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Block3DViewerIsland />
        </Reveal>
      </Container>
    </section>
  );
}
