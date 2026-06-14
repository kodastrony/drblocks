"use client";

import { useMemo } from "react";
import * as THREE from "three";

export type Variant = "standard" | "plus";

/* ---- proceduralna tekstura betonu (kruszywo) — bez zewnętrznych plików ---- */
function makeConcreteTextures() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#cdd1d6";
  ctx.fillRect(0, 0, size, size);
  // drobne ziarno
  for (let i = 0; i < 26000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.4 + 0.2;
    const g = 150 + Math.random() * 90;
    const a = Math.random() * 0.5;
    ctx.fillStyle = `rgba(${g},${g + 4},${g + 8},${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // większe kruszywo + pory
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 3.2 + 1;
    const dark = Math.random() > 0.5;
    const v = dark ? 90 + Math.random() * 40 : 200 + Math.random() * 45;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.35 + Math.random() * 0.4})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const map = new THREE.CanvasTexture(c);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(2, 2);
  map.anisotropy = 8;

  // bump z tej samej grafiki
  const bump = map.clone();
  bump.needsUpdate = true;
  return { map, bump };
}

export function BlockModel({
  variant = "standard",
  liftMm = 0,
}: {
  variant?: Variant;
  liftMm?: number;
}) {
  const W = 2.3;
  const H = 1.15;
  const D = 1.45;
  const Wc = 1.0; // szerokość kanału
  const floorH = 0.52; // grubość dna

  const { map, bump } = useMemo(makeConcreteTextures, []);

  // przekrój betonu (profil U), wyśrodkowany
  const concreteGeo = useMemo(() => {
    const w = W / 2;
    const h = H / 2;
    const cw = Wc / 2;
    const yf = -h + floorH;
    const s = new THREE.Shape();
    s.moveTo(-w, -h);
    s.lineTo(w, -h);
    s.lineTo(w, h);
    s.lineTo(cw, h);
    s.lineTo(cw, yf);
    s.lineTo(-cw, yf);
    s.lineTo(-cw, h);
    s.lineTo(-w, h);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: D,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 2,
      steps: 1,
    });
    geo.translate(0, 0, -D / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // czarna stalowa płyta regulacyjna z 2 pionowymi szczelinami
  const plateGeo = useMemo(() => {
    const pw = 0.92;
    const ph = 0.72;
    const r = 0.05;
    const s = new THREE.Shape();
    const x0 = -pw / 2;
    const y0 = -ph / 2;
    s.moveTo(x0 + r, y0);
    s.lineTo(x0 + pw - r, y0);
    s.quadraticCurveTo(x0 + pw, y0, x0 + pw, y0 + r);
    s.lineTo(x0 + pw, y0 + ph - r);
    s.quadraticCurveTo(x0 + pw, y0 + ph, x0 + pw - r, y0 + ph);
    s.lineTo(x0 + r, y0 + ph);
    s.quadraticCurveTo(x0, y0 + ph, x0, y0 + ph - r);
    s.lineTo(x0, y0 + r);
    s.quadraticCurveTo(x0, y0, x0 + r, y0);
    // szczeliny (stadion: kapsuła pionowa)
    const slot = (cx: number, cy: number) => {
      const sw = 0.12;
      const sh = 0.46;
      const sr = sw / 2;
      const p = new THREE.Path();
      const top = cy + sh / 2 - sr;
      const bot = cy - sh / 2 + sr;
      p.moveTo(cx - sr, bot);
      p.lineTo(cx - sr, top);
      p.absarc(cx, top, sr, Math.PI, 0, true);
      p.lineTo(cx + sr, bot);
      p.absarc(cx, bot, sr, 0, Math.PI, true);
      return p;
    };
    s.holes.push(slot(-0.24, -0.18));
    s.holes.push(slot(0.24, -0.18));
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.07,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 1,
      steps: 1,
    });
    geo.translate(0, 0, -0.035);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const concreteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map,
        bumpMap: bump,
        bumpScale: 0.025,
        color: "#c4c8cd",
        roughness: 0.92,
        metalness: 0.02,
      }),
    [map, bump],
  );
  const steelDark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1b1c20", roughness: 0.42, metalness: 0.7 }),
    [],
  );
  const galv = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b9bec6",
        roughness: 0.32,
        metalness: 0.96,
        envMapIntensity: 1.1,
      }),
    [],
  );
  const magnetMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#141418", roughness: 0.35, metalness: 0.25 }),
    [],
  );

  // pozycje
  const lift = (liftMm / 55) * 0.3; // 0..0.3 jednostki
  const plateBaseY = 0.28;
  const plateZ = D / 2 - 0.28;
  const boltY = 0.2; // śruby zakotwione w betonie (stałe)
  const boltZFront = plateZ + 0.14;

  return (
    <group rotation={[0, 0, 0]}>
      {/* korpus betonowy */}
      <mesh geometry={concreteGeo} material={concreteMat} castShadow receiveShadow />

      {/* stalowa płyta regulacyjna (unosi się przy regulacji) */}
      <group position={[0, plateBaseY + lift, plateZ]}>
        <mesh geometry={plateGeo} material={steelDark} castShadow />
        {/* górna krawędź / nakładka */}
        <mesh position={[0, 0.36, 0.04]} castShadow material={steelDark}>
          <boxGeometry args={[0.96, 0.06, 0.24]} />
        </mesh>
      </group>

      {/* śruby M16 (stałe, w betonie) */}
      {[-0.24, 0.24].map((x) => (
        <group key={x} position={[x, boltY, boltZFront]} rotation={[Math.PI / 2, 0, 0]}>
          {/* podkładka */}
          <mesh material={galv} position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.035, 28]} />
          </mesh>
          {/* nakrętka sześciokątna */}
          <mesh material={galv} position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.11, 0.12, 6]} />
          </mesh>
          {/* trzpień do płyty */}
          <mesh material={galv} position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.32, 16]} />
          </mesh>
        </group>
      ))}

      {/* chwytak magnetyczny (tylko Plus) — z lewej śruby */}
      {variant === "plus" && (
        <group position={[-0.24, boltY, boltZFront + 0.05]}>
          <mesh material={galv} position={[-0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.34, 14]} />
          </mesh>
          <mesh material={magnetMat} position={[-0.36, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.07, 28]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
