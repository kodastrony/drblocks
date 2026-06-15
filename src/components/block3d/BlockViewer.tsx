"use client";

import { Suspense, useState, useRef, useEffect, useCallback, useMemo } from "react";
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
import { BlockModel, type Variant } from "./BlockModel";

function Annotation({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <Html position={position} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-navy/90 px-2 py-0.5 font-oswald text-[9px] font-semibold uppercase tracking-wider text-white shadow-lg">
        <span className="size-1 rounded-full bg-teal" />
        {label}
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
  showLabels,
  grout,
}: {
  variant: Variant;
  liftMm: number;
  showLabels: boolean;
  grout: boolean;
}) {
  const reduce = useReducedMotion();
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
        {showLabels && (
          <>
            <Annotation position={[1.25, -0.28, 0.5]} label="Korpus betonowy B30" />
            <Annotation position={[0, 0.84, 0]} label="Stalowa stopa regulacyjna" />
            <Annotation position={[0.7, 0.42, 1.85]} label="Śruby M16 (4×)" />
            <Annotation position={[1.25, 0.45, -0.3]} label="Regulacja 0–55 mm" />
            {variant === "plus" && <Annotation position={[-1.15, 1.25, 1.55]} label="Chwytak magnetyczny" />}
          </>
        )}
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
        autoRotate={auto}
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

export default function BlockViewer() {
  const [variant, setVariant] = useState<Variant>("standard");
  const [liftMm, setLiftMm] = useState(0);
  const [showLabels, setShowLabels] = useState(false);
  const [grout, setGrout] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2a38] to-[#11171f] shadow-2xl">
      <div className="relative h-[380px] w-full sm:h-[480px]">
        <Canvas
          shadows
          flat
          dpr={[1, 2]}
          camera={{ position: [-5.2, 3.0, 4.3], fov: 32 }}
          gl={{ antialias: false, preserveDrawingBuffer: false }}
        >
          <color attach="background" args={["#d6dade"]} />
          <Scene variant={variant} liftMm={liftMm} showLabels={showLabels} grout={grout} />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4">
          <span className="rounded-full bg-black/30 px-2.5 py-1 font-oswald text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
            {variant === "plus" ? "Standard Plus Block" : "Standard Block"}
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/25 px-3 py-1 text-[11px] text-white/60 backdrop-blur-sm">
          Przeciągnij, aby obrócić · scroll, aby przybliżyć
        </div>
      </div>

      {/* ===== panel sterowania ===== */}
      <div className="space-y-5 border-t border-white/10 bg-[#0e151e]/60 p-4 sm:p-5">
        {/* wariant */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Wariant
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

        {/* regulacja wysokości */}
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="lift3d" className="text-sm font-medium text-white/80">
              Regulacja wysokości
            </label>
            <span className="font-oswald text-lg font-semibold tabular text-teal">{liftMm} mm</span>
          </div>
          <input
            id="lift3d"
            type="range"
            min={0}
            max={55}
            step={1}
            value={liftMm}
            onChange={(e) => setLiftMm(+e.target.value)}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-teal"
            aria-label="Regulacja wysokości w milimetrach"
          />
          <div className="mt-1 flex justify-between text-[10px] font-medium uppercase tracking-wide text-white/30">
            <span>0</span>
            <span>do 55 mm</span>
          </div>
        </div>

        {/* opcje podglądu */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Podgląd
          </span>
          <button
            type="button"
            onClick={() => setShowLabels((s) => !s)}
            aria-pressed={showLabels}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              showLabels ? "border-teal/60 bg-teal/15 text-teal" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            Etykiety
          </button>
          <button
            type="button"
            onClick={() => {
              setGrout((g) => {
                const next = !g;
                if (next && liftMm === 0) setLiftMm(30); // pokaż efekt pod uniesioną stopą
                return next;
              });
            }}
            aria-pressed={grout}
            title="Świeża (mokra) podlewka cementowa w luce pod regulowaną stopą"
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              grout ? "border-teal/60 bg-teal/15 text-teal" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            Podlewka cementowa
          </button>
        </div>
      </div>
    </div>
  );
}
