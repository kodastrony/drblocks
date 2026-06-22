"use client";

import { useMemo, useState } from "react";
import type { SVGProps } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/Icons";
import { useHref } from "@/i18n/LocaleProvider";

/* =========================================================================
   Kalkulator doboru bloczków DrBlocks
   Logika oparta na researchu: rozstaw to MAKSIMUM (nie cel), podpory zawsze
   w narożnikach + po obwodzie + siatka wewnętrzna, zaokrąglamy w górę.
   Kontener = podparcie punktowe w narożach (nie siatka). Nośność do 1 t/bloczek (do 5 t z podlewką).
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
  { id: "biuro-modulowe", label: "Biuro modułowe", shape: "rect", spacing: 1.5, load: "heavy", variant: "plus", dims: { L: 6, W: 3 }, note: "Cięższe niż domek – wyposażenie, instalacje, ludzie. Zagęść siatkę pod ścianami nośnymi i rozważ podlewkę cementową. Plus dla estetycznego cokołu." },
  { id: "salon-samochodowy", label: "Salon samochodowy", shape: "rect", spacing: 1.2, load: "heavy", variant: "plus", dims: { L: 12, W: 8 }, note: "Duża powierzchnia i skupione obciążenia (pojazdy, posadzka, witryny). Gęsta siatka 1,0–1,2 m, pod słupami fundament punktowy. Zalecana podlewka cementowa." },
  { id: "magazyn", label: "Magazyn", shape: "rect", spacing: 1.0, load: "heavy", variant: "standard", dims: { L: 12, W: 8 }, note: "Wysokie obciążenia użytkowe (regały, towar, wózki). Zagęść podpory do 0,8–1,0 m, pod słupami i regałami dodatkowe bloczki. Podlewka cementowa zalecana." },
  { id: "zestaw-kontenerowy", label: "Zestawy kontenerowe", shape: "rect", spacing: 1.5, load: "heavy", variant: "standard", dims: { L: 12, W: 6 }, note: "Zestaw połączonych modułów / kontenerów. Podpory pod narożami i stykami każdego modułu oraz wzdłuż ram nośnych. Rozważ podlewkę cementową." },
  { id: "sauna", label: "Sauna ogrodowa", shape: "rect", spacing: 1.5, load: "medium", variant: "standard", dims: { L: 3, W: 2.5 }, note: "Podpory po obwodzie co 1,0–1,5 m oraz na przecięciach ścian wewnętrznych." },
  { id: "carport", label: "Wiata / pergola", shape: "rect", spacing: 1.75, load: "light", variant: "standard", dims: { L: 5, W: 3 }, note: "Obciążenie pionowe małe, ale rządzi WIATR/wypór. Krytyczne jest zakotwienie. Podpory pod każdym słupem." },
  { id: "pavilion", label: "Pawilon / kiosk", shape: "rect", spacing: 1.5, load: "medium", variant: "plus", dims: { L: 4, W: 3 }, note: "Fundament punktowy pod słupami/ramą, bloczek pod każdym słupem. Plus dla estetycznego cokołu." },
];

// orientacyjne obciążenie powierzchniowe wg profilu [kg/m²] — do oceny nośności
const Q: Record<LoadProfile, number> = { light: 250, medium: 400, heavy: 600 };
const LOAD_LABEL: Record<LoadProfile, string> = { light: "Lekkie", medium: "Średnie", heavy: "Ciężkie" };
const GROUP_LABEL: Record<LoadProfile, string> = { light: "Lekkie obciążenie", medium: "Średnie obciążenie", heavy: "Ciężkie obciążenie" };
const BLOCK_CAPACITY = 1000; // kg / bloczek (bez podlewki)
const BLOCK_CAPACITY_GROUT = 5000; // kg / bloczek (z podlewką cementową)

/* orientacyjna waga budynku z profilu obciążenia [kg], zaokrąglona do 500 kg */
const estWeight = (p: Preset) =>
  Math.min(40000, Math.max(500, Math.round((p.dims.L * p.dims.W * Q[p.load]) / 500) * 500));

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
  const href = useHref();
  const [presetId, setPresetId] = useState("deck-terrace");
  const preset = PRESETS.find((p) => p.id === presetId)!;

  const [shape, setShape] = useState<ShapeMode>(preset.shape);
  const [length, setLength] = useState(preset.dims.L);
  const [width, setWidth] = useState(preset.dims.W);
  const [notchL, setNotchL] = useState(2);
  const [notchW, setNotchW] = useState(1.5);
  const [spacing, setSpacing] = useState(preset.spacing);
  const [buildingWeight, setBuildingWeight] = useState(() => estWeight(PRESETS[0]));
  const [grout, setGrout] = useState(false);

  // zastosowanie presetu → ustawia rozsądne wartości startowe
  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPresetId(id);
    setShape(p.shape);
    setLength(p.dims.L);
    setWidth(p.dims.W);
    setSpacing(p.spacing);
    setBuildingWeight(estWeight(p));
    setGrout(p.load === "heavy");
  };

  const setContainerFt = (ft: 20 | 40) => {
    setShape("container");
    setLength(ft === 20 ? 6.06 : 12.19);
    setWidth(2.44);
  };

  // rozstaw bierzemy wprost z suwaka
  const effS = spacing;

  // wcięcie nie może przekroczyć wymiaru obrysu — jedna wartość dla suwaka,
  // etykiety, pola powierzchni i geometrii (spójność na małych wymiarach)
  const effNotchL = Math.min(notchL, Math.max(0.5, length - 1));
  const effNotchW = Math.min(notchW, Math.max(0.5, width - 1));

  const area =
    shape === "lshape"
      ? Math.max(0, length * width - effNotchL * effNotchW)
      : length * width;

  const layout = useMemo<Layout>(() => {
    let lay: Layout;
    if (shape === "container") {
      lay = containerLayout(length, width);
    } else if (shape === "lshape") {
      lay = gridLayout(length, width, effS, { L2: effNotchL, W2: effNotchW });
    } else {
      lay = gridLayout(length, width, effS);
    }
    // ciśnienie powierzchniowe q [kg/m²]: z wagi budynku, inaczej z profilu obciążenia
    const q = buildingWeight > 0 && area > 0 ? buildingWeight / area : Q[preset.load];
    lay.worstLoad = shape === "container" ? 0 : Math.round(lay.sx * lay.sy * q);
    return lay;
  }, [shape, length, width, effS, effNotchL, effNotchW, preset.load, buildingWeight, area]);

  const capacity = grout ? BLOCK_CAPACITY_GROUT : BLOCK_CAPACITY;
  const overCapacity = layout.worstLoad > capacity;

  const inquiry =
    `/kontakt?zastosowanie=${encodeURIComponent(preset.label)}` +
    `&wymiary=${pl(length)}x${pl(width)}+m` +
    `&bloczki=${layout.counts.total}` +
    `&wariant=${preset.variant === "plus" ? "Standard+Plus" : "Standard"}` +
    `&waga=${buildingWeight}+kg`;

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
          {/* min-w-0: bez tego siatka pozwala kolumnie rozpychać się do min-content
              dzieci (siatka presetów) i na 320 px treść wychodziła ~20 px poza ekran. */}
          <div className="min-w-0 space-y-6">
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
                <span className="block text-sm font-medium text-steel">Kształt obrysu</span>
                <div className="mt-2.5 flex w-max max-w-full flex-wrap rounded-xl border border-line bg-mist p-1">
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
                      className={`inline-flex min-h-[44px] items-center justify-center rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                        shape === s.v ? "bg-teal-700 text-white shadow-sm" : "text-steel hover:text-navy"
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
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-slate transition-colors hover:border-teal hover:text-navy"
                    >
                      20 ft (6,06 m)
                    </button>
                    <button
                      type="button"
                      onClick={() => setContainerFt(40)}
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-slate transition-colors hover:border-teal hover:text-navy"
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

              {/* waga budynku + podlewka */}
              <div className="mt-5 space-y-4">
                <Field label="Waga budynku (orientacyjnie)" value={`${pl(buildingWeight, 0)} kg`}>
                  <input
                    type="range"
                    min={500}
                    max={40000}
                    step={500}
                    value={buildingWeight}
                    onChange={(e) => setBuildingWeight(+e.target.value)}
                    className="w-full cursor-pointer accent-teal"
                    aria-label="Waga budynku w kilogramach"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-mute">
                    <span>lekka</span>
                    <span>ciężka</span>
                  </div>
                </Field>
                <button
                  type="button"
                  role="switch"
                  aria-checked={grout}
                  onClick={() => setGrout((v) => !v)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    grout ? "border-teal bg-teal-50" : "border-line bg-paper hover:border-line-strong"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      grout ? "bg-teal-700 text-white" : "bg-mist text-mute"
                    }`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3c3 3.6 5 6.3 5 8.8a5 5 0 0 1-10 0C7 9.3 9 6.6 12 3z" />
                      <path d="M9.5 12.4c.5 1.2 1.5 2 2.8 2.1" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-semibold ${grout ? "text-teal-800" : "text-slate"}`}>
                      Podlewka cementowa
                    </span>
                    <span className="block text-[11px] text-mute">
                      {grout ? "Nośność do 5 t na bloczek" : "Zwiększa nośność do 5 t na bloczek"}
                    </span>
                  </span>
                  <span
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                      grout ? "bg-teal" : "bg-line-strong"
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                        grout ? "translate-x-[22px]" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>
              </div>

            </div>

            {/* TELEFON: zwięzłe, „przyklejone" podsumowanie wyniku — żywa informacja
                zwrotna przy przeciąganiu suwaków (pełny panel wyniku jest niżej).
                Trzyma się nad paskiem CTA (env safe-area), nie zachodzi na niego. */}
            <div className="sticky bottom-[calc(68px_+_env(safe-area-inset-bottom))] z-30 lg:hidden">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy/95 px-4 py-2.5 shadow-[var(--shadow-lift)] backdrop-blur">
                <div className="flex items-baseline gap-2">
                  <span className="font-oswald text-2xl font-bold leading-none tabular text-teal">
                    {layout.counts.total}
                  </span>
                  <span className="text-sm text-white/80">{bloczki(layout.counts.total)}</span>
                </div>
                {shape !== "container" && (
                  <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                    <div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-white/15">
                      <div
                        className={`h-full rounded-full ${overCapacity ? "bg-amber-400" : "bg-teal"}`}
                        style={{ width: `${Math.min(100, (layout.worstLoad / capacity) * 100)}%` }}
                      />
                    </div>
                    <span className="shrink-0 font-oswald text-[11px] font-semibold tabular text-white/70">
                      {pl(layout.worstLoad, 0)}/{pl(capacity, 0)} kg
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============ KROK 3: WYNIK — sticky live preview ============ */}
          {/* Only the preview lives in this column (no flowing content below it),
              so when it pins nothing can scroll up and overlap it. */}
          <div className="min-w-0">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
              <StepHead n={3}>Twój wynik</StepHead>
              {/* SR live region: ogłasza zmiany wyniku przy przeciąganiu suwaków */}
              <p className="sr-only" aria-live="polite">
                {layout.counts.total} {bloczki(layout.counts.total)}
              </p>
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
                        ~{pl(layout.worstLoad, 0)} / {pl(capacity, 0)} kg
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
                      <div
                        className={`h-full rounded-full ${overCapacity ? "bg-amber-500" : "bg-teal"}`}
                        style={{ width: `${Math.min(100, (layout.worstLoad / capacity) * 100)}%` }}
                      />
                    </div>
                    {overCapacity && (
                      <p className="mt-2 leading-relaxed">
                        {grout
                          ? "Przekroczona nośność nawet z podlewką (5 t/bloczek). Zagęść siatkę – zmniejsz rozstaw podpór."
                          : "Przekroczona nośność bez podlewki (1 t/bloczek). Zagęść siatkę lub włącz podlewkę cementową (do 5 t)."}
                      </p>
                    )}
                  </div>
                )}

                <Link
                  href={href(inquiry)}
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(45,189,176,0.7)] transition-colors hover:bg-teal-800"
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
          <span className="whitespace-nowrap rounded-full bg-paper px-3 py-1.5 font-semibold text-slate ring-1 ring-line">
            Waga budynku: {pl(buildingWeight, 0)} kg
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
          1 t/bloczek bez podlewki (do 5 t z podlewką cementową) jest deklarowana przez producenta.
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
      <div className="flex items-start justify-between gap-3">
        <span className="min-w-0 text-sm font-medium text-steel">{label}</span>
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
    "biuro-modulowe": (
      <>
        <rect x="5" y="4" width="14" height="16" rx="1" />
        <path d="M8.5 7.5h2.5M13 7.5h2.5M8.5 11h2.5M13 11h2.5M8.5 14.5h2.5M13 14.5h2.5" stroke={TEAL} />
      </>
    ),
    "salon-samochodowy": (
      <>
        <path d="M4 16v-3l2-4h12l2 4v3" />
        <path d="M3 16h18" />
        <circle cx="8" cy="17.5" r="1.4" stroke={TEAL} />
        <circle cx="16" cy="17.5" r="1.4" stroke={TEAL} />
      </>
    ),
    magazyn: (
      <>
        <path d="M3 20V9l9-4 9 4v11z" />
        <path d="M8 20v-6h8v6" stroke={TEAL} />
        <path d="M8 16.5h8" stroke={TEAL} />
      </>
    ),
    "zestaw-kontenerowy": (
      <>
        <rect x="3" y="12" width="18" height="7" rx="0.5" />
        <rect x="3.5" y="5" width="10.5" height="6" rx="0.5" stroke={TEAL} />
        <path d="M7 12.5v6M11 12.5v6M15 12.5v6M18.5 12.5v6" stroke={TEAL} />
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
