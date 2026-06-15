"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/Icons";

/* =========================================================================
   Kalkulator doboru bloczków DrBlocks
   Logika oparta na researchu: rozstaw to MAKSIMUM (nie cel), podpory zawsze
   w narożnikach + po obwodzie + siatka wewnętrzna, zaokrąglamy w górę.
   Kontener = podparcie punktowe w narożach (nie siatka). Nośność do 2 t/bloczek.
   ========================================================================= */

type LoadProfile = "light" | "medium" | "heavy";
type ShapeMode = "rect" | "lshape" | "container";

type Preset = {
  id: string;
  label: string;
  shape: ShapeMode;
  spacing: number; // zalecany maksymalny rozstaw [m]
  load: LoadProfile;
  variant: "standard" | "plus";
  note: string;
  dims: { L: number; W: number; L2?: number; W2?: number };
};

const PRESETS: Preset[] = [
  { id: "deck-terrace", label: "Taras / deck", shape: "rect", spacing: 1.5, load: "light", variant: "standard", dims: { L: 4, W: 4 }, note: "Lekkie obciążenie (~250 kg/m²). Bloczki pod legarami, rzędy co ≤1,5 m. Standard w zupełności wystarcza." },
  { id: "shed", label: "Domek narzędziowy", shape: "rect", spacing: 1.5, load: "light", variant: "standard", dims: { L: 3, W: 3 }, note: "Mała, lekka konstrukcja. Podpory w narożnikach + co ~1–1,5 m po obwodzie." },
  { id: "garden-room", label: "Domek / garden office", shape: "rect", spacing: 1.5, load: "medium", variant: "plus", dims: { L: 4, W: 3 }, note: "Cięższe niż taras (ściany, ocieplenie, dach). Gęstsza siatka pod ścianami nośnymi. Plus dla estetycznego cokołu (obróbka dolna)." },
  { id: "modular-house", label: "Dom modułowy", shape: "rect", spacing: 1.5, load: "heavy", variant: "plus", dims: { L: 8, W: 5 }, note: "Obciążenie skupione pod ramą nośną. Na słabym/zmiennym gruncie zagęść do 0,8–1,0 m i rozważ podlewkę cementową." },
  { id: "container", label: "Kontener", shape: "container", spacing: 1.5, load: "heavy", variant: "standard", dims: { L: 6.06, W: 2.44 }, note: "Kontener przenosi obciążenie WYŁĄCZNIE przez 4 dolne naroża — to layout punktowy, nie siatka. 20 ft → 4 bloczki, 40 ft → 6." },
  { id: "hot-tub", label: "Jacuzzi / balia", shape: "rect", spacing: 1.0, load: "heavy", variant: "standard", dims: { L: 2.5, W: 2.5 }, note: "Napełnione + osoby to ~390–635 kg/m² — znacznie powyżej tarasu. Zagęść podpory do 0,6–1,0 m. Rozważ podlewkę." },
  { id: "sauna", label: "Sauna ogrodowa", shape: "rect", spacing: 1.5, load: "medium", variant: "standard", dims: { L: 3, W: 2.5 }, note: "Podpory po obwodzie co 1,0–1,5 m oraz na przecięciach ścian wewnętrznych." },
  { id: "carport", label: "Wiata / pergola", shape: "rect", spacing: 1.75, load: "light", variant: "standard", dims: { L: 5, W: 3 }, note: "Obciążenie pionowe małe, ale rządzi WIATR/wypór — krytyczne jest zakotwienie. Podpory pod każdym słupem." },
  { id: "glamping", label: "Glamping / tiny house", shape: "rect", spacing: 1.5, load: "medium", variant: "plus", dims: { L: 4, W: 3 }, note: "Bloczek w każdym narożniku + dodatkowe po obwodzie co 1,0–1,5 m. Cięższe modele → zagęść." },
  { id: "mobile-home", label: "Dom mobilny", shape: "rect", spacing: 1.5, load: "heavy", variant: "plus", dims: { L: 9, W: 4 }, note: "Podpory pod każdym podłużnym elementem ramy, skrajne blisko końców. Wymagane zakotwienie/odciągi." },
  { id: "pavilion", label: "Pawilon / kiosk", shape: "rect", spacing: 1.5, load: "medium", variant: "plus", dims: { L: 4, W: 3 }, note: "Fundament punktowy pod słupami/ramą, bloczek pod każdym słupem. Plus dla estetycznego cokołu." },
];

// orientacyjne obciążenie powierzchniowe wg profilu [kg/m²] — do oceny nośności
const Q: Record<LoadProfile, number> = { light: 250, medium: 400, heavy: 600 };
const LOAD_LABEL: Record<LoadProfile, string> = { light: "Lekkie", medium: "Średnie", heavy: "Ciężkie" };
const BLOCK_CAPACITY = 2000; // kg / bloczek (bez podlewki)

type Pt = { x: number; y: number; type: "corner" | "edge" | "interior" };
type Layout = {
  points: Pt[];
  counts: { corner: number; edge: number; interior: number; total: number };
  sx: number;
  sy: number;
  bbox: { L: number; W: number };
  outline: [number, number][];
  worstLoad: number; // kg na najbardziej obciążony (wewnętrzny) bloczek
};

function pl(n: number, d = 1) {
  return n.toLocaleString("pl-PL", { maximumFractionDigits: d });
}

/* siatka prostokąta/L — punkty z klasyfikacją po liczbie sąsiadów */
function gridLayout(L: number, W: number, S: number, notch?: { L2: number; W2: number }): Layout {
  const nx = Math.max(2, Math.ceil(L / S) + 1);
  const ny = Math.max(2, Math.ceil(W / S) + 1);
  const sx = L / (nx - 1);
  const sy = W / (ny - 1);

  // wycięcie L: usuwamy punkty ściśle wewnątrz wnęki w prawym-górnym narożu
  const nL = notch ? Math.min(notch.L2, L - sx) : 0;
  const nW = notch ? Math.min(notch.W2, W - sy) : 0;
  const inNotch = (x: number, y: number) =>
    notch ? x > L - nL + 1e-6 && y > W - nW + 1e-6 : false;

  const keep = new Set<string>();
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < ny; j++) {
      const x = i * sx;
      const y = j * sy;
      if (!inNotch(x, y)) keep.add(`${i},${j}`);
    }

  const points: Pt[] = [];
  let corner = 0,
    edge = 0,
    interior = 0;
  for (const k of keep) {
    const [i, j] = k.split(",").map(Number);
    let nb = 0;
    if (keep.has(`${i - 1},${j}`)) nb++;
    if (keep.has(`${i + 1},${j}`)) nb++;
    if (keep.has(`${i},${j - 1}`)) nb++;
    if (keep.has(`${i},${j + 1}`)) nb++;
    const type = nb >= 4 ? "interior" : nb === 3 ? "edge" : "corner";
    if (type === "interior") interior++;
    else if (type === "edge") edge++;
    else corner++;
    points.push({ x: i * sx, y: j * sy, type });
  }

  const outline: [number, number][] = notch
    ? [
        [0, 0],
        [L, 0],
        [L, W - nW],
        [L - nL, W - nW],
        [L - nL, W],
        [0, W],
      ]
    : [
        [0, 0],
        [L, 0],
        [L, W],
        [0, W],
      ];

  return {
    points,
    counts: { corner, edge, interior, total: points.length },
    sx,
    sy,
    bbox: { L, W },
    outline,
    worstLoad: 0, // ustawiane przez wywołującego (zależne od q)
  };
}

/* kontener — podparcie punktowe pod 2 dolnymi belkami (long rails) */
function containerLayout(L: number, W: number): Layout {
  const segs = Math.max(1, Math.ceil(L / 6.5)); // 20 ft → 1 (4 bloczki), 40 ft → 2 (6 bloczków)
  const perRail = segs + 1;
  const sx = L / (perRail - 1);
  const points: Pt[] = [];
  for (let i = 0; i < perRail; i++) {
    points.push({ x: i * sx, y: 0, type: "corner" });
    points.push({ x: i * sx, y: W, type: "corner" });
  }
  return {
    points,
    counts: { corner: points.length, edge: 0, interior: 0, total: points.length },
    sx,
    sy: W,
    bbox: { L, W },
    outline: [
      [0, 0],
      [L, 0],
      [L, W],
      [0, W],
    ],
    worstLoad: 0,
  };
}

export function Calculator() {
  const reduce = useReducedMotion();
  const [presetId, setPresetId] = useState("deck-terrace");
  const preset = PRESETS.find((p) => p.id === presetId)!;

  const [shape, setShape] = useState<ShapeMode>(preset.shape);
  const [length, setLength] = useState(preset.dims.L);
  const [width, setWidth] = useState(preset.dims.W);
  const [notchL, setNotchL] = useState(2);
  const [notchW, setNotchW] = useState(1.5);
  const [spacing, setSpacing] = useState(preset.spacing);
  const [hardGround, setHardGround] = useState(false);
  const [grout, setGrout] = useState(false);
  const [unitPrice, setUnitPrice] = useState<string>("");

  // zastosowanie presetu → ustawia rozsądne wartości startowe
  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPresetId(id);
    setShape(p.shape);
    setLength(p.dims.L);
    setWidth(p.dims.W);
    setSpacing(p.spacing);
    setHardGround(false);
    setGrout(p.load === "heavy");
  };

  const setContainerFt = (ft: 20 | 40) => {
    setShape("container");
    setLength(ft === 20 ? 6.06 : 12.19);
    setWidth(2.44);
  };

  // efektywny rozstaw: trudny grunt → zagęszczamy o ~15% (więcej podpór)
  const effS = hardGround ? spacing * 0.85 : spacing;

  const layout = useMemo<Layout>(() => {
    let lay: Layout;
    if (shape === "container") {
      lay = containerLayout(length, width);
    } else if (shape === "lshape") {
      lay = gridLayout(length, width, effS, { L2: notchL, W2: notchW });
    } else {
      lay = gridLayout(length, width, effS);
    }
    const q = Q[preset.load];
    lay.worstLoad = shape === "container" ? 0 : Math.round(lay.sx * lay.sy * q);
    return lay;
  }, [shape, length, width, effS, notchL, notchW, preset.load]);

  const overCapacity = layout.worstLoad > BLOCK_CAPACITY;
  const area =
    shape === "lshape"
      ? Math.max(0, length * width - notchL * notchW)
      : length * width;

  const price = parseFloat(unitPrice.replace(",", "."));
  const cost = !isNaN(price) && price > 0 ? Math.round(price * layout.counts.total) : null;

  const inquiry =
    `/kontakt?zastosowanie=${encodeURIComponent(preset.label)}` +
    `&wymiary=${pl(length)}x${pl(width)}+m` +
    `&bloczki=${layout.counts.total}` +
    `&wariant=${preset.variant === "plus" ? "Standard+Plus" : "Standard"}`;

  return (
    <section id="kalkulator" className="relative scroll-mt-24 overflow-hidden bg-navy py-20 lg:py-28">
      <div className="bg-grid-dark absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <SectionLabel light>Kalkulator doboru</SectionLabel>
          <h2 className="mt-5 text-3xl text-white sm:text-[2.6rem]">Ile bloczków potrzebujesz?</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Wybierz zastosowanie, podaj wymiary i rodzaj gruntu – kalkulator dobierze rozstaw,
            rozłoży podpory (narożniki, obwód, siatka) i sprawdzi nośność. Działa jak realna wstępna
            wycena, a nie zgadywanka.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ============ PANEL STEROWANIA ============ */}
          <div className="space-y-7">
            {/* zastosowanie */}
            <div>
              <span className="text-sm font-medium text-white/70">Zastosowanie</span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      presetId === p.id
                        ? "border-teal bg-teal text-white"
                        : "border-white/15 bg-white/5 text-white/65 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[13px] leading-relaxed text-white/60">
                <span className="mt-0.5 text-teal" aria-hidden>
                  ⓘ
                </span>
                <span>{preset.note}</span>
              </p>
            </div>

            {/* kształt */}
            <div>
              <span className="text-sm font-medium text-white/70">Kształt obrysu</span>
              <div className="mt-2.5 inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
                {(
                  [
                    { v: "rect", l: "Prostokąt" },
                    { v: "lshape", l: "Kształt L" },
                    { v: "container", l: "Kontener" },
                  ] as { v: ShapeMode; l: string }[]
                ).map((s) => (
                  <button
                    key={s.v}
                    type="button"
                    onClick={() => setShape(s.v)}
                    className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                      shape === s.v ? "bg-teal text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>

            {shape === "container" ? (
              <div className="space-y-5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setContainerFt(20)}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-teal hover:text-white"
                  >
                    20 ft (6,06 m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setContainerFt(40)}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-teal hover:text-white"
                  >
                    40 ft (12,19 m)
                  </button>
                </div>
                <Field label="Długość kontenera" value={`${pl(length)} m`}>
                  <input type="range" min={2.4} max={13} step={0.1} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Długość kontenera" />
                </Field>
                <Field label="Szerokość kontenera" value={`${pl(width, 2)} m`}>
                  <input type="range" min={2} max={3} step={0.01} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Szerokość kontenera" />
                </Field>
              </div>
            ) : (
              <div className="space-y-5">
                <Field label="Długość obrysu" value={`${pl(length)} m`}>
                  <input type="range" min={2} max={15} step={0.5} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Długość obrysu" />
                </Field>
                <Field label="Szerokość obrysu" value={`${pl(width)} m`}>
                  <input type="range" min={2} max={10} step={0.5} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Szerokość obrysu" />
                </Field>

                {shape === "lshape" && (
                  <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <Field label="Wcięcie – długość" value={`${pl(notchL)} m`}>
                      <input type="range" min={0.5} max={Math.max(0.5, length - 1)} step={0.5} value={Math.min(notchL, length - 1)} onChange={(e) => setNotchL(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Wcięcie długość" />
                    </Field>
                    <Field label="Wcięcie – szerokość" value={`${pl(notchW)} m`}>
                      <input type="range" min={0.5} max={Math.max(0.5, width - 1)} step={0.5} value={Math.min(notchW, width - 1)} onChange={(e) => setNotchW(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Wcięcie szerokość" />
                    </Field>
                  </div>
                )}

                <Field label="Maks. rozstaw podpór" value={`${pl(spacing, 2)} m`}>
                  <input type="range" min={0.6} max={2} step={0.05} value={spacing} onChange={(e) => setSpacing(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Maksymalny rozstaw podpór" />
                  <div className="mt-1 flex justify-between text-[11px] text-white/40">
                    <span>gęściej / ciężej</span>
                    <span>rzadziej / lżej</span>
                  </div>
                </Field>
              </div>
            )}

            {/* warunki + opcje */}
            <div className="flex flex-wrap gap-2.5">
              <Toggle active={hardGround} onClick={() => setHardGround((v) => !v)} disabled={shape === "container"}>
                Trudny / pochyły grunt (+~20% podpór)
              </Toggle>
              <Toggle active={grout} onClick={() => setGrout((v) => !v)}>
                Podlewka cementowa (stabilizacja)
              </Toggle>
            </div>

            {/* cena jednostkowa (opcjonalna, bez wartości domyślnej) */}
            <div>
              <label htmlFor="price" className="text-sm font-medium text-white/70">
                Cena za bloczek (opcjonalnie)
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="price"
                  inputMode="decimal"
                  placeholder="np. 120"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="w-32 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-teal focus:outline-none"
                />
                <span className="text-sm text-white/50">zł / szt. → Twój własny szacunek</span>
              </div>
            </div>
          </div>

          {/* ============ PANEL WYNIKÓW ============ */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-baseline gap-3">
              <motion.span
                key={reduce ? undefined : layout.counts.total}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-oswald text-6xl font-bold tabular text-teal"
              >
                {layout.counts.total}
              </motion.span>
              <span className="text-lg text-white/70">bloczków</span>
            </div>
            <p className="mt-1 font-oswald text-xs uppercase tracking-wider text-white/55">
              {shape === "container"
                ? `Podparcie punktowe · powierzchnia ${pl(area)} m²`
                : `Rozstaw ${pl(layout.sx, 2)} × ${pl(layout.sy, 2)} m · powierzchnia ${pl(area)} m²`}
            </p>

            {/* wizualizacja układu */}
            <LayoutViz layout={layout} shape={shape} />

            {/* rozbicie / nośność */}
            {shape === "container" ? (
              <div className="mt-5 rounded-xl border border-white/10 bg-navy/40 p-4 text-sm text-white/75">
                Kontener opiera się na <strong className="text-white">4 dolnych narożach</strong> (20 ft),
                a przy 40 ft dochodzą 2 podpory pośrednie. Nie stosuje się tu siatki jak pod tarasem.
                {layout.sx > 6 && (
                  <span className="mt-1 block text-amber-300/90">
                    Rozpiętość {pl(layout.sx)} m — rozważ dodatkową podporę pośrednią (≤ ~6 m).
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-3 gap-2">
                <Stat label="Narożniki" value={layout.counts.corner} />
                <Stat label="Obwód" value={layout.counts.edge} />
                <Stat label="Wewnątrz" value={layout.counts.interior} />
              </div>
            )}

            {/* nośność */}
            {shape !== "container" && (
              <div
                className={`mt-4 rounded-xl border p-4 text-sm ${
                  overCapacity
                    ? "border-amber-400/40 bg-amber-400/10 text-amber-100"
                    : "border-teal/30 bg-teal/10 text-white/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Maks. obciążenie na bloczek</span>
                  <span className="font-oswald font-semibold tabular">
                    ~{pl(layout.worstLoad, 0)} / {BLOCK_CAPACITY} kg
                  </span>
                </div>
                {overCapacity && (
                  <p className="mt-1.5 leading-relaxed">
                    Przekroczona nośność bez podlewki — zagęść siatkę (mniejszy rozstaw) lub zastosuj
                    podlewkę cementową.
                  </p>
                )}
              </div>
            )}

            {/* wariant + opcje */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white/80">
                Obciążenie: {LOAD_LABEL[preset.load]}
              </span>
              <span className="rounded-full bg-teal/20 px-3 py-1 font-semibold text-teal">
                Zalecany: {preset.variant === "plus" ? "Standard Plus" : "Standard"}
              </span>
              {grout && (
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white/80">
                  + Podlewka
                </span>
              )}
            </div>

            {cost !== null && (
              <p className="mt-4 text-sm text-white/70">
                Twój szacunek kosztu bloczków:{" "}
                <strong className="text-white">{pl(cost, 0)} zł</strong>{" "}
                <span className="text-white/45">({layout.counts.total} × {pl(price, 0)} zł)</span>
              </p>
            )}

            <Link
              href={inquiry}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Wyślij zapytanie o dokładną wycenę
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-3 text-center text-xs leading-relaxed text-white/55">
              Szacunek poglądowy, niewiążący — nie zastępuje projektu konstrukcyjnego. Ostateczny
              układ, głębokość przemarzania, nośność gruntu i sposób kotwienia potwierdza
              projektant. Nośność do 2 t/bloczek jest deklarowana przez producenta.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- wizualizacja układu podpór (SVG) ---------- */
function LayoutViz({ layout, shape }: { layout: Layout; shape: ShapeMode }) {
  const { bbox, points, outline } = layout;
  const pad = 0.6;
  const vw = bbox.L + pad * 2;
  const vh = bbox.W + pad * 2;
  // mapowanie: y w górę (origin lewy-dolny) → SVG y w dół
  const mx = (x: number) => x + pad;
  const my = (y: number) => bbox.W - y + pad;
  const poly = outline.map(([x, y]) => `${mx(x)},${my(y)}`).join(" ");
  const color = (t: Pt["type"]) =>
    t === "corner" ? "#0f8c82" : t === "edge" ? "#2dbdb0" : "#7fd8d0";
  const r = Math.max(0.12, Math.min(0.22, Math.min(vw, vh) / 30));

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-navy/40 p-4">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="h-44 w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Schemat rozmieszczenia podpór">
        <polygon
          points={poly}
          fill="rgba(45,189,176,0.06)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.04}
          strokeDasharray="0.18 0.12"
        />
        {shape === "container" && (
          <line
            x1={mx(0)}
            y1={my(bbox.W / 2)}
            x2={mx(bbox.L)}
            y2={my(bbox.W / 2)}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={0.03}
          />
        )}
        {points.map((p, i) => (
          <circle key={i} cx={mx(p.x)} cy={my(p.y)} r={r} fill={color(p.type)} />
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-white/55">
        <Legend color="#0f8c82" label="Narożniki" />
        <Legend color="#2dbdb0" label="Obwód" />
        <Legend color="#7fd8d0" label="Wewnątrz" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy/40 p-3 text-center">
      <div className="font-oswald text-2xl font-bold tabular text-white">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/50">{label}</div>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-teal bg-teal/15 text-teal"
          : "border-white/15 bg-white/5 text-white/65 hover:text-white"
      }`}
    >
      {children}
    </button>
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
