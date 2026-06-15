"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
  Html,
} from "@react-three/drei";
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

function Scene({
  variant,
  liftMm,
  showLabels,
  autoRotate,
}: {
  variant: Variant;
  liftMm: number;
  showLabels: boolean;
  autoRotate: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-5, 2, 1]} intensity={0.7} />
      <directionalLight position={[0, 2, -6]} intensity={0.5} color="#cfe8ff" />

      <group position={[0, 0.05, 0]}>
        <BlockModel variant={variant} liftMm={liftMm} />
        {showLabels && (
          <>
            <Annotation position={[1.05, -0.32, 0.6]} label="Korpus betonowy B30" />
            <Annotation position={[0, 0.95, 0.4]} label="Stalowa stopa regulacyjna" />
            <Annotation position={[0.62, 0.2, 1.1]} label="Pręty M16 (4×)" />
            <Annotation position={[-1.0, 0.45, 0.5]} label="Regulacja 0–55 mm" />
            {variant === "plus" && (
              <Annotation position={[-1.15, 0.95, 0.7]} label="Chwytak magnetyczny" />
            )}
          </>
        )}
      </group>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.55} scale={7} blur={2.6} far={2.5} />

      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[6, 6, 1]} />
          <Lightformer intensity={1.1} position={[-4, 1.5, 2]} scale={[4, 4, 1]} />
          <Lightformer intensity={0.8} position={[4, 2, -2]} scale={[4, 4, 1]} color="#dceeff" />
          <Lightformer intensity={0.6} position={[0, -3, 1]} scale={[6, 3, 1]} />
        </Environment>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
        minDistance={2.6}
        maxDistance={6.5}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={Math.PI / 6}
      />
    </>
  );
}

export default function BlockViewer() {
  const reduce = useReducedMotion();
  const [variant, setVariant] = useState<Variant>("standard");
  const [liftMm, setLiftMm] = useState(0);
  const [showLabels, setShowLabels] = useState(false);
  const [autoRotate, setAutoRotate] = useState(!reduce);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2a38] to-[#11171f]">
      <div className="relative h-[360px] w-full sm:h-[460px]">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [2.8, 1.9, 3.4], fov: 35 }}
          gl={{ antialias: true, preserveDrawingBuffer: false }}
        >
          <color attach="background" args={["#141d28"]} />
          <Scene variant={variant} liftMm={liftMm} showLabels={showLabels} autoRotate={autoRotate} />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4">
          <span className="font-oswald text-xs font-semibold uppercase tracking-wider text-white/60">
            {variant === "plus" ? "Standard Plus Block" : "Standard Block"}
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-white/40">
          Obróć i przybliż, aby obejrzeć z każdej strony
        </div>
      </div>

      <div className="grid gap-4 border-t border-white/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="lift3d" className="text-sm font-medium text-white/80">
              Regulacja wysokości
            </label>
            <span className="font-oswald text-base font-semibold tabular text-teal">{liftMm} mm</span>
          </div>
          <input
            id="lift3d"
            type="range"
            min={0}
            max={55}
            step={1}
            value={liftMm}
            onChange={(e) => setLiftMm(+e.target.value)}
            className="mt-2 w-full cursor-pointer accent-teal"
            aria-label="Regulacja wysokości w milimetrach"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
            {(["standard", "plus"] as Variant[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  variant === v ? "bg-teal text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {v === "plus" ? "Plus" : "Standard"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowLabels((s) => !s)}
            aria-pressed={showLabels}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              showLabels
                ? "border-teal/60 bg-teal/15 text-teal"
                : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            Etykiety
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate((s) => !s)}
            aria-pressed={autoRotate}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              autoRotate
                ? "border-teal/60 bg-teal/15 text-teal"
                : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            Obrót
          </button>
        </div>
      </div>
    </div>
  );
}
