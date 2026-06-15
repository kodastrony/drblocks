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

  const bump = map.clone();
  bump.needsUpdate = true;
  return { map, bump };
}

/* ---- geometria nakrętki sześciokątnej z fazą ---- */
function hexNutGeometry(r: number, h: number) {
  return new THREE.CylinderGeometry(r, r, h, 6);
}

export function BlockModel({
  variant = "standard",
  liftMm = 0,
}: {
  variant?: Variant;
  liftMm?: number;
}) {
  // wymiary korpusu (proporcje ~ realny bloczek: szerszy niż wyższy)
  const W = 2.4; // szerokość
  const H = 1.2; // wysokość korpusu
  const D = 1.7; // głębokość
  const Wc = 0.96; // szerokość kanału (wnęki na stalową stopę)
  const floorH = 0.4; // grubość dna betonu pod kanałem

  const { map, bump } = useMemo(makeConcreteTextures, []);

  // przekrój betonu (profil U) — kanał otwarty od góry
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
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
      steps: 1,
    });
    geo.translate(0, 0, -D / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // stalowa stopa regulacyjna: korpus wypełniający kanał + nakładka (płyta nośna)
  const insertBodyGeo = useMemo(
    () => new THREE.BoxGeometry(Wc - 0.06, 1.0, D - 0.06),
    [],
  );
  const capGeo = useMemo(() => {
    // płyta z lekko sfazowanymi krawędziami
    const pw = Wc + 0.18;
    const pd = D + 0.02;
    const ph = 0.1;
    const r = 0.03;
    const shape = new THREE.Shape();
    const x0 = -pw / 2;
    const z0 = -pd / 2;
    shape.moveTo(x0 + r, z0);
    shape.lineTo(x0 + pw - r, z0);
    shape.quadraticCurveTo(x0 + pw, z0, x0 + pw, z0 + r);
    shape.lineTo(x0 + pw, z0 + pd - r);
    shape.quadraticCurveTo(x0 + pw, z0 + pd, x0 + pw - r, z0 + pd);
    shape.lineTo(x0 + r, z0 + pd);
    shape.quadraticCurveTo(x0, z0 + pd, x0, z0 + pd - r);
    shape.lineTo(x0, z0 + r);
    shape.quadraticCurveTo(x0, z0, x0 + r, z0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: ph,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 1,
    });
    geo.rotateX(-Math.PI / 2); // leży poziomo (grubość wzdłuż Y)
    geo.computeVertexNormals();
    return geo;
  }, []);

  const washerGeo = useMemo(() => new THREE.CylinderGeometry(0.17, 0.17, 0.04, 28), []);
  const hexGeo = useMemo(() => hexNutGeometry(0.12, 0.14), []);
  const studGeo = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16), []);

  const concreteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map,
        bumpMap: bump,
        bumpScale: 0.03,
        color: "#c4c8cd",
        roughness: 0.93,
        metalness: 0.02,
      }),
    [map, bump],
  );
  const steelDark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#212429", roughness: 0.46, metalness: 0.72 }),
    [],
  );
  const galv = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c2c8d0",
        roughness: 0.3,
        metalness: 0.96,
        envMapIntensity: 1.15,
      }),
    [],
  );
  const magnetMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#17191e", roughness: 0.34, metalness: 0.55 }),
    [],
  );

  // skala regulacji: 0..55 mm -> 0..0.42 jednostki
  const lift = (liftMm / 55) * 0.42;

  // bolce na froncie i z tyłu, na krawędziach kanału (x = ±boltX)
  const boltX = 0.42;
  const boltLocalY = 0.18; // wysokość bolca względem stopy (rośnie z regulacją)
  const insertTopY0 = H / 2; // top stopy przy regulacji 0

  // pojedynczy bolec M16: podkładka + nakrętka sześciokątna + trzpień
  const Bolt = ({
    x,
    z,
    front,
  }: {
    x: number;
    z: number;
    front: boolean;
  }) => (
    <group position={[x, boltLocalY + lift, z]} rotation={[Math.PI / 2, 0, 0]}>
      {/* podkładka tuż przy licu (na zewnątrz) */}
      <mesh geometry={washerGeo} material={galv} position={[0, front ? 0.03 : -0.03, 0]} castShadow />
      {/* nakrętka sześciokątna (najbardziej na zewnątrz) */}
      <mesh
        geometry={hexGeo}
        material={galv}
        position={[0, front ? 0.11 : -0.11, 0]}
        rotation={[0, front ? 0.26 : -0.26, 0]}
        castShadow
      />
      {/* trzpień w głąb bloczka */}
      <mesh geometry={studGeo} material={galv} position={[0, front ? -0.18 : 0.18, 0]} />
    </group>
  );

  return (
    <group rotation={[0, 0, 0]}>
      {/* korpus betonowy */}
      <mesh geometry={concreteGeo} material={concreteMat} castShadow receiveShadow />

      {/* ===== zespół regulowany (unosi się przy regulacji) ===== */}
      <group position={[0, lift, 0]}>
        {/* korpus stalowej stopy w kanale */}
        <mesh geometry={insertBodyGeo} material={steelDark} position={[0, insertTopY0 - 0.5, 0]} castShadow />
        {/* nakładka / płyta nośna na szczycie */}
        <mesh geometry={capGeo} material={steelDark} position={[0, insertTopY0 + 0.05, 0]} castShadow />
      </group>

      {/* śruby M16 — 4 szt. (front L/P, tył L/P), przesuwają się z regulacją */}
      <Bolt x={-boltX} z={D / 2} front />
      <Bolt x={boltX} z={D / 2} front />
      <Bolt x={-boltX} z={-D / 2} front={false} />
      <Bolt x={boltX} z={-D / 2} front={false} />

      {/* ===== chwytak magnetyczny — tylko STANDARD PLUS =====
           Krążek magnetyczny licem do widza w górnej-lewej części + pozioma
           śruba regulacyjna (gwint + łeb) — jak na renderze produktowym.
           Unosi się razem ze stalową stopą. */}
      {variant === "plus" && (
        <group position={[-0.52, boltLocalY + lift + 0.22, D / 2 + 0.04]}>
          {/* pozioma śruba gwintowana — od krążka w stronę środka, łeb sześciokątny */}
          <mesh material={galv} position={[0.27, 0, -0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.46, 18]} />
          </mesh>
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} material={galv} position={[0.09 + i * 0.05, 0, -0.02]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.047, 0.012, 6, 16]} />
            </mesh>
          ))}
          {/* łeb sześciokątny po stronie środka */}
          <mesh material={galv} position={[0.5, 0, -0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.1, 6]} />
          </mesh>
          {/* krążek magnetyczny — licem do przodu (oś Z) */}
          <mesh material={galv} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.21, 0.21, 0.07, 40]} />
          </mesh>
          <mesh material={magnetMat} position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.17, 0.17, 0.06, 40]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
