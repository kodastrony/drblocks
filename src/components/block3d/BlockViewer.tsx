"use client";

import { Suspense, useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
  SoftShadows,
  Html,
} from "@react-three/drei";
import { EffectComposer, N8AO, Bloom, SMAA, ToneMapping, BrightnessContrast } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useReducedMotion } from "framer-motion";
import { useContent } from "@/i18n/LocaleProvider";
import { BlockModel, type Variant } from "./BlockModel";

/* =========================================================================
   ETYKIETY — zakotwiczone, „matowoszklane" callouty (HUD).
   Jeden drei <Html> na etykietę, ZACZEPIONY w dokładnym punkcie części:
     • turkusowa kropka-celownik z poświatą leży NA części (sztywno przy auto-obrocie),
     • cienki turkusowy łącznik (1px) wychodzi w PUSTĄ przestrzeń (−X / +Z),
     • matowoszklana „pigułka" Oswald (ta sama rodzina co czipy w viewerze) na końcu.
   BLISŻSZA krawędź pigułki kotwi się do końca łącznika → długie polskie etykiety
   zawsze wychodzą NA ZEWNĄTRZ i nigdy nie przecinają sylwetki modelu.
   pointerEvents:none · jeden węzeł (piksel-w-piksel złączenie) · brak stanu per-klatka
   · brak occlude · TYLKO turkus (magenta zarezerwowana dla hero).
   ========================================================================= */
type Place =
  | "left" | "left-up" | "left-down"
  | "right" | "right-up" | "right-down"
  | "up" | "down";

// przesunięcie BLISKIEJ krawędzi pigułki względem kropki (px ekranu) + wyrównanie pigułki
const PLACE: Record<Place, { dx: number; dy: number; tx: string }> = {
  "left":       { dx: -58, dy:   0, tx: "translate(-100%, -50%)" },
  "left-up":    { dx: -52, dy: -28, tx: "translate(-100%, -50%)" },
  "left-down":  { dx: -52, dy:  28, tx: "translate(-100%, -50%)" },
  "right":      { dx:  58, dy:   0, tx: "translate(0, -50%)" },
  "right-up":   { dx:  52, dy: -28, tx: "translate(0, -50%)" },
  "right-down": { dx:  52, dy:  28, tx: "translate(0, -50%)" },
  "up":         { dx:   0, dy: -46, tx: "translate(-50%, -100%)" },
  "down":       { dx:   0, dy:  46, tx: "translate(-50%, 0)" },
};

function Annotation({
  anchor,
  label,
  sub,
  place = "left",
  compact = false,
}: {
  anchor: [number, number, number];
  label: string;
  sub?: string;
  place?: Place;
  compact?: boolean;
}) {
  const base = PLACE[place];
  // na wąskim ekranie skracamy odsadzenie, żeby etykiety nie wychodziły poza płótno
  const k = compact ? 0.62 : 1;
  const dx = base.dx * k;
  const dy = base.dy * k;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len; // kierunek część → etykieta
  const nx = -uy, ny = ux; // prostopadła (szerokość grota)
  // STRZAŁKA: grot TUŻ przy części (celuje w dokładny punkt), baza dalej ku etykiecie,
  // linia łączy bazę grota z krawędzią etykiety.
  const tip: [number, number] = [ux * 3, uy * 3];
  const baseC: [number, number] = [ux * 13, uy * 13];
  const head =
    `${tip[0].toFixed(1)},${tip[1].toFixed(1)} ` +
    `${(baseC[0] + nx * 5).toFixed(1)},${(baseC[1] + ny * 5).toFixed(1)} ` +
    `${(baseC[0] - nx * 5).toFixed(1)},${(baseC[1] - ny * 5).toFixed(1)}`;
  const tagStyle: CSSProperties = { position: "absolute", left: dx, top: dy, transform: base.tx };

  return (
    <Html position={anchor} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div className="relative select-none" style={{ width: 0, height: 0 }}>
        {/* STRZAŁKA-łącznik: od etykiety DO dokładnego punktu części (grot na części) */}
        <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, overflow: "visible" }}>
          <line x1={dx} y1={dy} x2={baseC[0]} y2={baseC[1]} stroke="rgba(45,189,176,0.92)" strokeWidth={1.6} strokeLinecap="round" />
          <polygon points={head} fill="rgb(45,189,176)" />
        </svg>
        {/* celownik na dokładnym punkcie części (0,0) */}
        <span aria-hidden className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/20 blur-[2px]" />
        <span
          aria-hidden
          className="absolute left-0 top-0 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal ring-2 ring-white/70"
          style={{ boxShadow: "0 0 6px 1px rgba(45,189,176,0.9)" }}
        />
        {/* etykieta — czysta matowoszklana karta z turkusowym paskiem-akcentem */}
        <div style={tagStyle}>
          <div
            className={`flex items-stretch overflow-hidden rounded-lg bg-ink/85 shadow-xl ring-1 ring-white/15 backdrop-blur-md ${
              compact ? "max-w-[7.5rem]" : ""
            }`}
          >
            <span aria-hidden className="w-1 shrink-0 bg-teal" />
            <span className={`flex flex-col justify-center leading-tight ${compact ? "px-2 py-1" : "px-2.5 py-1.5"}`}>
              <span
                className={`font-oswald font-semibold uppercase tracking-[0.14em] text-white/90 ${
                  compact ? "text-[8px] whitespace-normal" : "text-[9px] whitespace-nowrap"
                }`}
              >
                {label}
              </span>
              {sub && (
                <span className="mt-0.5 font-oswald text-[8px] font-semibold uppercase tracking-[0.12em] tabular text-teal">
                  {sub}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </Html>
  );
}

/* studyjne tło — pionowy gradient (kontrast z czarną stalą i jasnym betonem) */
function GradientBackground() {
  const scene = useThree((s) => s.scene);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    // czyste, jasne, RÓWNE tło studyjne — pionowy delikatny gradient, BEZ przyciemnienia boków
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#f3f5f7"); // góra — jasna
    g.addColorStop(0.55, "#e7eaee");
    g.addColorStop(1, "#dce0e5"); // dół — minimalnie ciemniejszy (delikatny „horyzont")
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => {
    const prev = scene.background;
    scene.background = tex;
    return () => {
      scene.background = prev;
      tex.dispose();
    };
  }, [scene, tex]);
  return null;
}

function Scene({
  variant,
  liftMm,
  heightMm,
  showLabels,
  grout,
}: {
  variant: Variant;
  liftMm: number;
  heightMm: number;
  showLabels: boolean;
  grout: boolean;
}) {
  const reduce = useReducedMotion();
  const { viewer3d } = useContent();
  const ann = viewer3d.annotations;
  // szerokość płótna → kompaktowe etykiety na wąskich (mobilnych) ekranach
  const canvasW = useThree((s) => s.size.width);
  const compact = canvasW > 0 && canvasW < 520;
  // auto-obrót: domyślnie WYŁ., włącza się sam po krótkiej bezczynności,
  // gaśnie gdy użytkownik chwyta model.
  const [auto, setAuto] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const armIdle = useCallback(() => {
    if (reduce) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAuto(true), 3500);
  }, [reduce]);
  useEffect(() => {
    armIdle();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [armIdle]);

  return (
    <>
      <GradientBackground />
      <SoftShadows size={26} samples={12} focus={0.85} />
      <ambientLight intensity={0.16} />
      {/* światło kluczowe — mocny kontrast, jasne refleksy na stali */}
      <directionalLight
        position={[3.5, 6.5, 4.5]}
        intensity={3.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      >
        <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
      </directionalLight>
      {/* wypełnienie z lewej (rozjaśnia chwytak) */}
      <directionalLight position={[-5, 2.5, 2]} intensity={0.55} />
      {/* zimny rim z tyłu — podświetla krawędzie metalu */}
      <directionalLight position={[1, 3, -6]} intensity={1.1} color="#cfe8ff" />

      <group position={[0, 0.05, 0]}>
        <BlockModel variant={variant} liftMm={liftMm} grout={grout} />
        {showLabels && (() => {
          // lift w jednostkach modelu (jak w BlockModel: (liftMm/55)·maxLift, maxLift=0.5)
          const lift = (liftMm / 55) * 0.5;
          /* TABELA ZACZEPÓW (układ lokalny modelu; grupa już +0.05 w Y).
             Kamera widzi DŁUGIE lico −X (przód, nakrętki SZEŚCIOKĄTNE) + krótki koniec +Z,
             więc wszystkie zaczepy mają x≤0 i/lub z≥0 i wychodzą NA ZEWNĄTRZ.
             ─────────────────────────────────────────────────────────────────────────────
             etykieta                    zaczep (x, y, z)              kier.       lift
             ─────────────────────────────────────────────────────────────────────────────
             Korpus betonowy B30         (-0.95, -0.22, 1.00)         down        — (statyczny beton)
             Stalowa stopa regulacyjna   (-0.98, 0.72+lift, 0.50)     up          +lift (rośnie z czapą)
             Śruby M16 (4×)              (-1.24, 0.32, 0.60)          left-down   — (zakotwione, Y stały)
             Regulacja wysokości         (-0.50, 0.60+lift/2, 1.50)   right-up    +lift/2 (rozwierana szpara)
             Chwytak magnetyczny (plus)  (-1.50, 0.46+lift, 0.00)     left        +lift
             Podlewka cementowa (grout)  (-0.30, 0.60+lift/2, 1.50)   right-down  +lift/2
             ───────────────────────────────────────────────────────────────────────────── */
          return (
            <>
              <Annotation anchor={[-0.95, -0.22, 1.0]} label={ann.body} place="down" compact={compact} />
              <Annotation anchor={[-0.98, 0.72 + lift, 0.5]} label={ann.foot} place="up" compact={compact} />
              <Annotation anchor={[-1.24, 0.32, 0.6]} label={ann.bolts} place="left-down" compact={compact} />
              <Annotation
                anchor={[-0.5, 0.6 + lift / 2, 1.5]}
                label={ann.height}
                sub={`${heightMm} mm`}
                place={compact ? "up" : "right-up"}
                compact={compact}
              />
              {variant === "plus" && (
                <Annotation
                  anchor={[-1.5, 0.46 + lift, 0]}
                  label={ann.magnet}
                  place={compact ? "right" : "left"}
                  compact={compact}
                />
              )}
              {grout && lift > 0.001 && (
                <Annotation anchor={[-0.3, 0.6 + lift / 2, 1.5]} label={ann.grout} place={compact ? "down" : "right-down"} compact={compact} />
              )}
            </>
          );
        })()}
      </group>

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.7}
        scale={9}
        blur={2.6}
        far={3}
        resolution={2048}
        color="#10141c"
      />

      <Suspense fallback={null}>
        <Environment resolution={512} frames={1}>
          <Lightformer form="rect" intensity={2.4} position={[0.5, 4, 3]} scale={[7, 7, 1]} />
          <Lightformer form="rect" intensity={1.0} position={[-5, 1.5, 2]} scale={[4, 6, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[3, 2.5, -4]} scale={[5, 5, 1]} color="#dcebff" />
          <Lightformer form="ring" intensity={1.2} position={[-2, 3, -1]} scale={[2, 2, 1]} />
          <Lightformer form="rect" intensity={0.5} position={[0, -3, 1]} scale={[8, 3, 1]} color="#2a3340" />
        </Environment>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.09}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        autoRotate={auto && !showLabels}
        autoRotateSpeed={0.5}
        minDistance={3.2}
        maxDistance={7.5}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={Math.PI / 6}
        onStart={() => {
          setAuto(false);
          if (timer.current) clearTimeout(timer.current);
        }}
        onEnd={armIdle}
      />

      <EffectComposer multisampling={0}>
        <N8AO aoRadius={0.5} intensity={4.2} distanceFalloff={0.6} halfRes quality="high" />
        <Bloom intensity={0.1} luminanceThreshold={0.85} luminanceSmoothing={0.25} mipmapBlur />
        <BrightnessContrast brightness={0.0} contrast={0.08} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

/* Sterowanie pętlą renderowania modelu. Gdy `active` jest false, Canvas
   przechodzi w frameloop="never" (zero obciążenia GPU/CPU) — dzięki temu
   reszta strony scrolluje się płynnie także na słabszym sprzęcie. Po powrocie
   do active wymuszamy natychmiastową klatkę (invalidate), żeby model od razu
   się odrysował, zanim wystartuje ciągła pętla. */
function FrameloopGate({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);
  return null;
}

export default function BlockViewer({
  active = true,
  onClose,
}: {
  active?: boolean;
  onClose?: () => void;
}) {
  const { viewer3d } = useContent();
  const [variant, setVariant] = useState<Variant>("standard");
  const [heightMm, setHeightMm] = useState(120);
  const [showLabels, setShowLabels] = useState(false);
  const [grout, setGrout] = useState(false);
  // Wysokość posadowienia 120–200 mm steruje uniesieniem czarnej stopy PROPORCJONALNIE
  // do wysokości: przy 120 mm stopa jest już wysunięta (~0,30 jednostki modelu), przy
  // 200 mm osiąga maksimum (0,50). BlockModel: lift = liftMm/55 · 0,5; 120/200·55≈33 → 0,30,
  // 200/200·55=55 → 0,50 (cały zakres mieści się w zweryfikowanym skoku modelu).
  const liftMm = Math.round((heightMm / 200) * 55);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2a38] to-[#11171f] shadow-2xl">
      <div className="relative h-[380px] w-full sm:h-[480px]">
        <Canvas
          shadows
          flat
          frameloop={active ? "always" : "never"}
          dpr={[1, 2]}
          camera={{ position: [-5.2, 3.0, 4.3], fov: 32 }}
          gl={{ antialias: false, preserveDrawingBuffer: false }}
        >
          <color attach="background" args={["#d6dade"]} />
          <FrameloopGate active={active} />
          <Scene variant={variant} liftMm={liftMm} heightMm={heightMm} showLabels={showLabels} grout={grout} />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4">
          <span className="rounded-full bg-black/30 px-2.5 py-1 font-oswald text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
            {variant === "plus" ? "Standard Plus Block" : "Standard Block"}
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={viewer3d.closeAria}
            title={viewer3d.closeTitle}
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/25 px-3 py-1 text-[11px] text-white/60 backdrop-blur-sm">
          {viewer3d.dragHint}
        </div>
      </div>

      {/* ===== panel sterowania ===== */}
      <div className="space-y-5 border-t border-white/10 bg-[#0e151e]/60 p-4 sm:p-5">
        {/* wariant */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            {viewer3d.variant}
          </span>
          <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
            {(["standard", "plus"] as Variant[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                aria-pressed={variant === v}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  variant === v ? "bg-teal text-white shadow" : "text-white/60 hover:text-white"
                }`}
              >
                {v === "plus" ? "Plus" : "Standard"}
              </button>
            ))}
          </div>
        </div>

        {/* regulacja wysokości posadowienia 120–200 mm */}
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="lift3d" className="text-sm font-medium text-white/80">
              {viewer3d.heightAdjust}
            </label>
            <span className="font-oswald text-lg font-semibold tabular text-teal">{heightMm} mm</span>
          </div>
          <input
            id="lift3d"
            type="range"
            min={120}
            max={200}
            step={1}
            value={heightMm}
            onChange={(e) => setHeightMm(+e.target.value)}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-teal"
            aria-label={viewer3d.heightAria}
          />
          <div className="mt-1 flex justify-between text-[10px] font-medium uppercase tracking-wide text-white/30">
            <span>{viewer3d.heightFrom}</span>
            <span>{viewer3d.heightTo}</span>
          </div>
        </div>

        {/* opcje podglądu */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            {viewer3d.preview}
          </span>
          <button
            type="button"
            onClick={() => setShowLabels((s) => !s)}
            aria-pressed={showLabels}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              showLabels ? "border-teal/60 bg-teal/15 text-teal" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {viewer3d.labels}
          </button>
          <button
            type="button"
            onClick={() => {
              setGrout((g) => {
                const next = !g;
                if (next && heightMm === 120) setHeightMm(160); // pokaż efekt pod uniesioną stopą
                return next;
              });
            }}
            aria-pressed={grout}
            title={viewer3d.groutTitle}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              grout ? "border-teal/60 bg-teal/15 text-teal" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {viewer3d.grout}
          </button>
        </div>
      </div>
    </div>
  );
}
