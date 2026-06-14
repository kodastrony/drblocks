"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/Icons";

const SPACINGS = [
  { v: 1, label: "1,0 m" },
  { v: 1.25, label: "1,25 m" },
  { v: 1.5, label: "1,5 m" },
];

function pl(n: number) {
  return n.toLocaleString("pl-PL", { maximumFractionDigits: 1 });
}

export function Calculator() {
  const reduce = useReducedMotion();
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(4);
  const [spacing, setSpacing] = useState(1.5);

  const { cols, rows, count, area } = useMemo(() => {
    const c = Math.ceil(length / spacing) + 1;
    const r = Math.ceil(width / spacing) + 1;
    return { cols: c, rows: r, count: c * r, area: length * width };
  }, [length, width, spacing]);

  const dots = Math.min(rows, 9) * Math.min(cols, 12);

  return (
    <section id="kalkulator" className="relative scroll-mt-24 overflow-hidden bg-navy py-20 lg:py-28">
      <div className="bg-grid-dark absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel light>Kalkulator doboru</SectionLabel>
          <h2 className="mt-5 text-3xl text-white sm:text-[2.6rem]">Ile bloczków potrzebujesz?</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
            Podaj wymiary obrysu budynku i rozstaw podpór – od razu zobaczysz orientacyjną liczbę
            bloczków i układ siatki.
          </p>

          <div className="mt-9 space-y-7">
            <Field label="Długość budynku" value={`${pl(length)} m`}>
              <input
                type="range"
                min={3}
                max={12}
                step={0.5}
                value={length}
                onChange={(e) => setLength(+e.target.value)}
                className="w-full cursor-pointer accent-teal"
                aria-label="Długość budynku w metrach"
              />
            </Field>
            <Field label="Szerokość budynku" value={`${pl(width)} m`}>
              <input
                type="range"
                min={2}
                max={8}
                step={0.5}
                value={width}
                onChange={(e) => setWidth(+e.target.value)}
                className="w-full cursor-pointer accent-teal"
                aria-label="Szerokość budynku w metrach"
              />
            </Field>
            <div>
              <span className="text-sm font-medium text-white/70">Rozstaw podpór</span>
              <div className="mt-2.5 inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
                {SPACINGS.map((s) => (
                  <button
                    key={s.v}
                    type="button"
                    onClick={() => setSpacing(s.v)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      spacing === s.v ? "bg-teal text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-baseline gap-3">
            <motion.span
              key={reduce ? undefined : count}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-oswald text-6xl font-bold tabular text-teal"
            >
              {count}
            </motion.span>
            <span className="text-lg text-white/70">bloczków</span>
          </div>
          <p className="mt-1 font-oswald text-xs uppercase tracking-wider text-white/60">
            Siatka {cols} × {rows} · powierzchnia {pl(area)} m² · rozstaw {pl(spacing)} m
          </p>

          <div className="mt-7 flex justify-center rounded-2xl border border-white/10 bg-navy/40 p-4 sm:p-6">
            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${Math.min(cols, 12)}, minmax(0, 1fr))` }}
              aria-hidden
            >
              {Array.from({ length: dots }).map((_, i) => (
                <span key={i} className="size-2.5 rounded-[3px] bg-teal/85" />
              ))}
            </div>
          </div>

          <Link
            href={`/kontakt?wymiary=${pl(length)}x${pl(width)}+m&bloczki=${count}`}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Wyślij zapytanie o wycenę
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-center text-xs leading-relaxed text-white/60">
            Szacunek poglądowy. Dokładną liczbę bloczków, wariant i wycenę dobierzemy indywidualnie
            do obciążeń i warunków gruntowych.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/70">{label}</span>
        <span className="font-oswald text-base font-semibold tabular text-teal">{value}</span>
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}
