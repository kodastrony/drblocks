"use client";

import { useMemo, useState } from "react";
import type { SVGProps } from "react";
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
  { id: "container", label: "Kontener", shape: "container", spacing: 1.5, load: "heavy", variant: "standard", dims: { L: 6.06, W: 2.44 }, note: "Kontener przenosi obciążenie WYŁĄCZNIE przez 4 dolne naroża. To layout punktowy, nie siatka. 20 ft → 4 bloczki, 40 ft → 6." },
  { id: "hot-tub", label: "Jacuzzi / balia", shape: "rect", spacing: 1.0, load: "heavy", variant: "standard", dims: { L: 2.5, W: 2.5 }, note: "Napełnione + osoby to ~390–635 kg/m², znacznie powyżej tarasu. Zagęść podpory do 0,6–1,0 m. Rozważ podlewkę." },
  { id: "sauna", label: "Sauna ogrodowa", shape: "rect", spacing: 1.5, load: "medium", variant: "standard", dims: { L: 3, W: 2.5 }, note: "Podpory po obwodzie co 1,0–1,5 m oraz na przecięciach ścian wewnętrznych." },
  { id: "carport", label: "Wiata / pergola", shape: "rect", spacing: 1.75, load: "light", variant: "standard", dims: { L: 5, W: 3 }, note: "Obciążenie pionowe małe, ale rządzi WIATR/wypór. Krytyczne jest zakotwienie. Podpory pod każdym słupem." },
  { id: "glamping", label: "Glamping / tiny house", shape: "rect", spacing: 1.5, load: "medium", variant: "plus", dims: { L: 4, W: 3 }, note: "Bloczek w każdym narożniku + dodatkowe po obwodzie co 1,0–1,5 m. Cięższe modele → zagęść." },
  { id: "mobile-home", label: "Dom mobilny", shape: "rect", spacing: 1.5, load: "heavy", variant: "plus", dims: { L: 9, W: 4 }, note: "Podpory pod każdym podłużnym elementem ramy, skrajne blisko końców. Wymagane zakotwienie/odciągi." },
  { id: "pavilion", label: "Pawilon / kiosk", shape: "rect", spacing: 1.5, load: "medium", variant: "plus", dims: { L: 4, W: 3 }, note: "Fundament punktowy pod słupami/ramą, bloczek pod każdym słupem. Plus dla estetycznego cokołu." },
];

// orientacyjne obciążenie powierzchniowe wg profilu [kg/m²] — do oceny nośności
const Q: Record<LoadProfile, number> = { light: 250, medium: 400, heavy: 600 };
const LOAD_LABEL: Record<LoadProfile, string> = { light: "Lekkie", medium: "Średnie", heavy: "Ciężkie" };
const GROUP_LABEL: Record<LoadProfile, string> = { light: "Lekkie obciążenie", medium: "Średnie obciążenie", heavy: "Ciężkie obciążenie" };
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

/* poprawna polska odmiana rzeczownika „bloczek” */
function bloczki(n: number) {
  const d = n % 10;
  const dd = n % 100;
  if (n === 1) return "bloczek";
  if (d >= 2 && d <= 4 && (dd < 10 || dd >= 20)) return "bloczki";
  return "bloczków";
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

  // wcięcie nie może przekroczyć wymiaru obrysu — jedna wartość dla suwaka,
  // etykiety, pola powierzchni i geometrii (spójność na małych wymiarach)
  const effNotchL = Math.min(notchL, Math.max(0.5, length - 1));
  const effNotchW = Math.min(notchW, Math.max(0.5, width - 1));

  const layout = useMemo<Layout>(() => {
    let lay: Layout;
    if (shape === "container") {
      lay = containerLayout(length, width);
    } else if (shape === "lshape") {
      lay = gridLayout(length, width, effS, { L2: effNotchL, W2: effNotchW });
    } else {
      lay = gridLayout(length, width, effS);
    }
    const q = Q[preset.load];
    lay.worstLoad = shape === "container" ? 0 : Math.round(lay.sx * lay.sy * q);
    return lay;
  }, [shape, length, width, effS, effNotchL, effNotchW, preset.load]);

  const overCapacity = layout.worstLoad > BLOCK_CAPACITY;
  const area =
    shape === "lshape"
      ? Math.max(0, length * width - effNotchL * effNotchW)
      : length * width;

  const inquiry =
    `/kontakt?zastosowanie=${encodeURIComponent(preset.label)}` +
    `&wymiary=${pl(length)}x${pl(width)}+m` +
    `&bloczki=${layout.counts.total}` +
    `&wariant=${preset.variant === "plus" ? "Standard+Plus" : "Standard"}`;

  // NOTE: no overflow-hidden on the section itself — it would break
  // position:sticky on the result panel. Decorations clip via an inner wrapper.
  return (
    <section id="kalkulator" className="relative scroll-mt-24 border-t border-line bg-mist py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-teal-50 blur-3xl" />
      </div>
      <Container className="relative">
        <div className="max-w-2xl">
          <SectionLabel>Kalkulator doboru</SectionLabel>
          <h2 className="mt-5 text-3xl text-navy sm:text-[2.6rem]">Ile bloczków potrzebujesz?</h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Wybierz zastosowanie i podaj wymiary, a kalkulator dobierze rozstaw, rozłoży podpory i
            sprawdzi nośność. To realna wstępna ocena, nie zgadywanka.
          </p>
        </div>

        {/* No items-start: the right column stretches to the row height so the
            sticky preview has room to travel while you scroll the inputs. */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
          {/* ============ KROKI 1–2: WYBÓR + KONFIGURACJA ============ */}
          <div className="space-y-6">
            {/* KROK 1 — zastosowanie */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-[var(--shadow-card)] sm:p-6">
              <StepHead n={1}>Co posadawiasz?</StepHead>

              <div className="mt-5 space-y-4">
                {(["light", "medium", "heavy"] as const).map((g) => (
                  <div key={g}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mute">
                      {GROUP_LABEL[g]}
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {PRESETS.filter((p) => p.load === g).map((p) => {
                        const selected = presetId === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => applyPreset(p.id)}
                            aria-pressed={selected}
                            className={`flex min-h-[58px] items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                              selected
                                ? "border-teal bg-teal-50 text-teal-800"
                                : "border-line bg-paper text-slate hover:border-line-strong hover:bg-mist"
                            }`}
                          >
                            <PresetIcon
                              id={p.id}
                              className={`size-5 shrink-0 ${selected ? "text-teal-700" : "text-mute"}`}
                            />
                            <span className="min-w-0 text-[13px] font-semibold leading-tight">{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2.5 rounded-xl bg-teal-50 px-3.5 py-3">
                <InfoIcon className="mt-0.5 size-4 shrink-0 text-teal-700" aria-hidden />
                <p className="min-w-0 text-pretty text-[13px] leading-relaxed text-teal-800">{preset.note}</p>
              </div>
            </div>

            {/* KROK 2 — wymiary + grunt */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-[var(--shadow-card)] sm:p-6">
              <StepHead n={2}>Wymiary i grunt</StepHead>

              {/* kształt */}
              <div className="mt-5">
                <span className="text-sm font-medium text-steel">Kształt obrysu</span>
                <div className="mt-2.5 inline-flex rounded-xl border border-line bg-mist p-1">
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
                      aria-pressed={shape === s.v}
                      className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                        shape === s.v ? "bg-teal text-white shadow-sm" : "text-steel hover:text-navy"
                      }`}
                    >
                      {s.l}
                    </button>
                  ))}
                </div>
              </div>

              {shape === "container" ? (
                <div className="mt-5 space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setContainerFt(20)}
                      className="rounded-lg border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-slate transition-colors hover:border-teal hover:text-navy"
                    >
                      20 ft (6,06 m)
                    </button>
                    <button
                      type="button"
                      onClick={() => setContainerFt(40)}
                      className="rounded-lg border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-slate transition-colors hover:border-teal hover:text-navy"
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
                <div className="mt-5 space-y-5">
                  <Field label="Długość obrysu" value={`${pl(length)} m`}>
                    <input type="range" min={2} max={15} step={0.5} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Długość obrysu" />
                  </Field>
                  <Field label="Szerokość obrysu" value={`${pl(width)} m`}>
                    <input type="range" min={2} max={10} step={0.5} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Szerokość obrysu" />
                  </Field>

                  {shape === "lshape" && (
                    <div className="grid grid-cols-1 gap-4 rounded-xl bg-mist p-4 sm:grid-cols-2">
                      <Field label="Wcięcie – długość" value={`${pl(effNotchL)} m`}>
                        <input type="range" min={0.5} max={Math.max(0.5, length - 1)} step={0.5} value={effNotchL} onChange={(e) => setNotchL(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Wcięcie długość" />
                      </Field>
                      <Field label="Wcięcie – szerokość" value={`${pl(effNotchW)} m`}>
                        <input type="range" min={0.5} max={Math.max(0.5, width - 1)} step={0.5} value={effNotchW} onChange={(e) => setNotchW(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Wcięcie szerokość" />
                      </Field>
                    </div>
                  )}

                  <Field label="Maks. rozstaw" value={`${pl(spacing, 2)} m`}>
                    <input type="range" min={0.6} max={2} step={0.05} value={spacing} onChange={(e) => setSpacing(+e.target.value)} className="w-full cursor-pointer accent-teal" aria-label="Maksymalny rozstaw podpór" />
                    <div className="mt-1 flex justify-between text-[11px] text-mute">
                      <span>gęściej / ciężej</span>
                      <span>rzadziej / lżej</span>
                    </div>
                  </Field>
                </div>
              )}

              {/* warunki */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <Toggle active={hardGround} onClick={() => setHardGround((v) => !v)} disabled={shape === "container"}>
                  Trudny lub pochyły grunt
                  <span className="mt-0.5 block text-[11px] font-normal text-mute">+20% podpór</span>
                </Toggle>
                <Toggle active={grout} onClick={() => setGrout((v) => !v)}>
                  Podlewka cementowa
                  <span className="mt-0.5 block text-[11px] font-normal text-mute">stabilizacja</span>
                </Toggle>
              </div>

            </div>
          </div>

          {/* ============ KROK 3: WYNIK — sticky live preview ============ */}
          {/* Only the preview lives in this column (no flowing content below it),
              so when it pins nothing can scroll up and overlap it. */}
          <div>
            <div className="lg:sticky lg:top-24">
              <StepHead n={3}>Twój wynik</StepHead>
              <div className="mt-4 rounded-2xl border border-line bg-paper p-4 shadow-[var(--shadow-lift)] sm:p-5">
                {/* tablica wyniku — jedyny ciemny akcent */}
                <div className="rounded-2xl bg-navy px-5 py-4">
                  <div className="flex items-baseline gap-2.5">
                    <motion.span
                      key={reduce ? undefined : layout.counts.total}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-oswald text-5xl font-bold leading-none tabular text-teal"
                    >
                      {layout.counts.total}
                    </motion.span>
                    <span className="text-lg text-white/80">{bloczki(layout.counts.total)}</span>
                  </div>
                  <p className="mt-1.5 font-oswald text-[11px] uppercase tracking-wider text-white/55">
                    {shape === "container"
                      ? `Podparcie punktowe · ${pl(area)} m²`
                      : `Rozstaw ${pl(layout.sx, 2)} × ${pl(layout.sy, 2)} m · ${pl(area)} m²`}
                  </p>

                  {/* wizualizacja — rzut z góry */}
                  <LayoutViz layout={layout} shape={shape} />
                </div>

                {/* rozbicie podpór */}
                {shape !== "container" && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-line">
                    <div className="grid grid-cols-3 divide-x divide-line">
                      <Stat label="Narożniki" value={layout.counts.corner} />
                      <Stat label="Obwód" value={layout.counts.edge} />
                      <Stat label="Wewnątrz" value={layout.counts.interior} />
                    </div>
                  </div>
                )}

                {/* nośność / kontener — żywa informacja zwrotna */}
                {shape === "container" ? (
                  <div className="mt-3 rounded-xl border border-line bg-mist p-3.5 text-[13px] leading-relaxed text-slate">
                    Kontener opiera się na <strong className="text-navy">4 dolnych narożach</strong> (20 ft),
                    a przy 40 ft dochodzą 2 podpory pośrednie. Nie stosuje się tu siatki jak pod tarasem.
                    {layout.sx > 6 && (
                      <span className="mt-1.5 block font-medium text-amber-700">
                        Rozpiętość {pl(layout.sx)} m, rozważ dodatkową podporę pośrednią (≤ ~6 m).
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    className={`mt-3 rounded-xl border p-3.5 text-[13px] ${
                      overCapacity
                        ? "border-amber-300 bg-amber-50 text-amber-800"
                        : "border-teal/30 bg-teal-50 text-teal-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="min-w-0">Maks. obciążenie na bloczek</span>
                      <span className="shrink-0 font-oswald font-semibold tabular">
                        ~{pl(layout.worstLoad, 0)} / {BLOCK_CAPACITY} kg
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
                      <div
                        className={`h-full rounded-full ${overCapacity ? "bg-amber-500" : "bg-teal"}`}
                        style={{ width: `${Math.min(100, (layout.worstLoad / BLOCK_CAPACITY) * 100)}%` }}
                      />
                    </div>
                    {overCapacity && (
                      <p className="mt-2 leading-relaxed">
                        Przekroczona nośność bez podlewki. Zagęść siatkę (mniejszy rozstaw) lub zastosuj
                        podlewkę cementową.
                      </p>
                    )}
                  </div>
                )}

                <Link
                  href={inquiry}
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(45,189,176,0.7)] transition-colors hover:bg-teal-600"
                >
                  Wyślij zapytanie o dokładną wycenę
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* podsumowanie + zastrzeżenie — pełna szerokość pod kalkulatorem */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="whitespace-nowrap rounded-full bg-paper px-3 py-1.5 font-semibold text-slate ring-1 ring-line">
            Obciążenie: {LOAD_LABEL[preset.load]}
          </span>
          <span className="whitespace-nowrap rounded-full bg-teal-50 px-3 py-1.5 font-semibold text-teal-800">
            Zalecany wariant: {preset.variant === "plus" ? "Standard Plus" : "Standard"}
          </span>
          {grout && (
            <span className="whitespace-nowrap rounded-full bg-paper px-3 py-1.5 font-semibold text-slate ring-1 ring-line">
              + Podlewka cementowa
            </span>
          )}
        </div>
        <p className="mt-3 max-w-3xl text-pretty text-xs leading-relaxed text-mute">
          Szacunek poglądowy, niewiążący. Nie zastępuje projektu konstrukcyjnego. Ostateczny układ,
          głębokość przemarzania, nośność gruntu i sposób kotwienia potwierdza projektant. Nośność do
          2 t/bloczek jest deklarowana przez producenta.
        </p>
      </Container>
    </section>
  );
}

/* ---------- nagłówek kroku ---------- */
function StepHead({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 font-oswald text-sm font-semibold uppercase tracking-wider text-navy">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy text-xs font-bold text-white">
        {n}
      </span>
      {children}
    </h3>
  );
}

/* ---------- wizualizacja: rzut z góry (blueprint) ---------- */
function LayoutViz({ layout, shape }: { layout: Layout; shape: ShapeMode }) {
  const { bbox, points, outline, sx } = layout;
  const pad = Math.max(1.0, Math.max(bbox.L, bbox.W) * 0.12);
  const vw = bbox.L + pad * 2;
  const vh = bbox.W + pad * 2;
  const maxDim = Math.max(vw, vh);
  // origin lewy-dolny → SVG y w dół
  const mx = (x: number) => x + pad;
  const my = (y: number) => bbox.W - y + pad;
  const poly = outline.map(([x, y]) => `${mx(x)},${my(y)}`).join(" ");

  const fs = Math.min(pad * 0.5, maxDim * 0.05); // rozmiar etykiet wymiarowych
  const tick = pad * 0.18;
  const SIZE = Math.max(0.18, Math.min(0.36, Math.min(bbox.L, bbox.W) / 14));
  const outlineSW = Math.max(0.03, maxDim * 0.006);
  const gridSW = Math.max(0.012, maxDim * 0.0025);

  const fillFor = (t: Pt["type"]) =>
    t === "corner" ? "#0f8c82" : t === "edge" ? "#2dbdb0" : "#e9f8f6";
  const strokeFor = (t: Pt["type"]) => (t === "interior" ? "#2dbdb0" : "none");

  const dimY = my(0) + pad * 0.45; // linia wymiarowa długości (pod obrysem)
  const dimX = pad * 0.55; // linia wymiarowa szerokości (z lewej)
  const dimColor = "rgba(148,163,184,0.65)";

  return (
    <div className="mt-4 rounded-xl bg-ink p-3 ring-1 ring-inset ring-white/5">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="h-40 w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Schemat rozmieszczenia podpór – rzut z góry">
        <defs>
          <pattern id="bp-grid" width={0.5} height={0.5} patternUnits="userSpaceOnUse">
            <path d="M0.5 0 H0 V0.5" fill="none" stroke="rgba(45,189,176,0.18)" strokeWidth={gridSW} />
          </pattern>
          <clipPath id="bp-clip">
            <polygon points={poly} />
          </clipPath>
        </defs>

        {/* obrys + siatka 0,5 m przycięta do obrysu */}
        <polygon points={poly} fill="rgba(45,189,176,0.07)" />
        <g clipPath="url(#bp-clip)">
          <rect x={0} y={0} width={vw} height={vh} fill="url(#bp-grid)" />
        </g>
        <polygon points={poly} fill="none" stroke="#cbd5e1" strokeWidth={outlineSW} strokeLinejoin="round" />

        {/* belki nośne kontenera */}
        {shape === "container" && (
          <>
            <line x1={mx(0)} y1={my(0)} x2={mx(bbox.L)} y2={my(0)} stroke="#2dbdb0" strokeWidth={outlineSW * 0.9} strokeOpacity={0.6} />
            <line x1={mx(0)} y1={my(bbox.W)} x2={mx(bbox.L)} y2={my(bbox.W)} stroke="#2dbdb0" strokeWidth={outlineSW * 0.9} strokeOpacity={0.6} />
          </>
        )}

        {/* bloczki — kwadratowe glify */}
        {points.map((p, i) => (
          <rect
            key={i}
            x={mx(p.x) - SIZE / 2}
            y={my(p.y) - SIZE / 2}
            width={SIZE}
            height={SIZE}
            rx={SIZE * 0.2}
            fill={fillFor(p.type)}
            stroke={strokeFor(p.type)}
            strokeWidth={SIZE * 0.1}
          />
        ))}

        {/* linie wymiarowe */}
        <g>
          {/* długość (dół) */}
          <line x1={mx(0)} y1={dimY} x2={mx(bbox.L)} y2={dimY} stroke={dimColor} strokeWidth={gridSW * 1.4} />
          <line x1={mx(0)} y1={dimY - tick} x2={mx(0)} y2={dimY + tick} stroke={dimColor} strokeWidth={gridSW * 1.4} />
          <line x1={mx(bbox.L)} y1={dimY - tick} x2={mx(bbox.L)} y2={dimY + tick} stroke={dimColor} strokeWidth={gridSW * 1.4} />
          <text x={mx(bbox.L / 2)} y={dimY + fs * 1.05} fontSize={fs} fill="#94a3b8" textAnchor="middle" className="font-oswald">
            {pl(bbox.L)} m
          </text>

          {/* szerokość (lewa) */}
          <line x1={dimX} y1={my(0)} x2={dimX} y2={my(bbox.W)} stroke={dimColor} strokeWidth={gridSW * 1.4} />
          <line x1={dimX - tick} y1={my(0)} x2={dimX + tick} y2={my(0)} stroke={dimColor} strokeWidth={gridSW * 1.4} />
          <line x1={dimX - tick} y1={my(bbox.W)} x2={dimX + tick} y2={my(bbox.W)} stroke={dimColor} strokeWidth={gridSW * 1.4} />
          <text
            x={dimX - fs * 0.5}
            y={my(bbox.W / 2)}
            fontSize={fs}
            fill="#94a3b8"
            textAnchor="middle"
            className="font-oswald"
            transform={`rotate(-90 ${dimX - fs * 0.5} ${my(bbox.W / 2)})`}
          >
            {pl(bbox.W)} m
          </text>
        </g>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[11px] text-white/65">
        <LegendSq color="#0f8c82" label="Narożniki" />
        <LegendSq color="#2dbdb0" label="Obwód" />
        <LegendSq color="#e9f8f6" stroke="#2dbdb0" label="Wewnątrz" />
      </div>
    </div>
  );
}

function LegendSq({ color, stroke, label }: { color: string; stroke?: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="size-2.5 rounded-[2px]"
        style={{ background: color, boxShadow: stroke ? `inset 0 0 0 1px ${stroke}` : undefined }}
      />
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-paper p-3 text-center">
      <div className="font-oswald text-2xl font-bold tabular text-navy">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-mute">{label}</div>
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
      className={`min-w-0 rounded-xl border px-3.5 py-3 text-left text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-teal bg-teal-50 text-teal-800"
          : "border-line bg-paper text-slate hover:border-line-strong"
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
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-medium text-steel">{label}</span>
        <span className="shrink-0 font-oswald text-base font-semibold tabular text-teal-800">{value}</span>
      </div>
      <div className="mt-2.5 w-full">{children}</div>
    </div>
  );
}

/* ---------- ikony zastosowań ---------- */
const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const TEAL = "var(--color-teal)";

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PresetIcon({ id, className }: { id: string; className?: string }) {
  const inner: Record<string, React.ReactNode> = {
    "deck-terrace": (
      <>
        <rect x="3" y="8" width="18" height="9" rx="1" />
        <path d="M3 11.3h18M3 14.6h18" stroke={TEAL} />
      </>
    ),
    shed: (
      <>
        <path d="M5 20V10l7-5 7 5v10z" />
        <path d="M10 20v-5h4v5" stroke={TEAL} />
      </>
    ),
    "garden-room": (
      <>
        <path d="M4 20V11l8-6 8 6v9z" />
        <rect x="10" y="12.5" width="4" height="4" stroke={TEAL} />
      </>
    ),
    "modular-house": (
      <>
        <rect x="3" y="6" width="18" height="6" rx="1" />
        <rect x="3" y="13" width="18" height="6" rx="1" stroke={TEAL} />
      </>
    ),
    container: (
      <>
        <rect x="3" y="7" width="18" height="10" rx="1" />
        <path d="M8 7.5v9M12 7.5v9M16 7.5v9" stroke={TEAL} />
      </>
    ),
    "hot-tub": (
      <>
        <rect x="4" y="9" width="16" height="9" rx="3" />
        <path d="M6 9c1.5-2 3 2 4.5 0s3-2 4.5 0" stroke={TEAL} />
      </>
    ),
    sauna: (
      <>
        <path d="M3.5 9 12 4l8.5 5" />
        <rect x="5" y="9" width="14" height="10" rx="1" />
        <path d="M5 12.5h14M5 16h14" stroke={TEAL} />
      </>
    ),
    carport: (
      <>
        <path d="M3 9 12 5l9 4" stroke={TEAL} />
        <path d="M5 9v10M19 9v10" />
        <path d="M3 19h18" />
      </>
    ),
    glamping: (
      <>
        <path d="M12 4 3 20h18z" />
        <path d="M12 9v11" stroke={TEAL} />
      </>
    ),
    "mobile-home": (
      <>
        <rect x="3" y="7" width="15" height="8" rx="1" />
        <path d="M18 11h3" stroke={TEAL} />
        <circle cx="8" cy="17.5" r="1.6" />
        <circle cx="14" cy="17.5" r="1.6" />
      </>
    ),
    pavilion: (
      <>
        <path d="M4 8h16l-2-3H6z" stroke={TEAL} />
        <path d="M6 8v11M18 8v11" />
        <path d="M4 19h16" />
      </>
    ),
  };
  return (
    <svg {...iconBase} className={className} aria-hidden>
      {inner[id] ?? inner["deck-terrace"]}
    </svg>
  );
}
