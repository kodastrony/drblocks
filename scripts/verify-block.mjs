// Numeryczna weryfikacja geometrii bloczka (bez GL — czysta geometria three).
import * as THREE from "three";

let fails = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "  ✓" : "  ✗ FAIL"} ${msg}`);
  if (!cond) fails++;
};
const finite = (geo) => {
  const a = geo.attributes.position.array;
  for (let i = 0; i < a.length; i++) if (!Number.isFinite(a[i])) return false;
  return true;
};
const box = (geo) => {
  geo.computeBoundingBox();
  const b = geo.boundingBox;
  return {
    x: [b.min.x, b.max.x],
    y: [b.min.y, b.max.y],
    z: [b.min.z, b.max.z],
    tris: geo.index ? geo.index.count / 3 : geo.attributes.position.count / 3,
  };
};

/* --- te same stałe co w BlockModel.tsx (PEŁNA bryła + czapa okrakiem na DŁUŻSZYCH bokach) --- */
const W = 1.9, H = 1.2, D = 3.0;
const blockTopY = H / 2;       // 0.6
const studR = 0.075;
const boltY = 0.32;
const maxLift = 0.5;
const skirtX = W / 2 + 0.02;   // 0.97 — ścianki na licach ±X (dłuższe boki)
const boltZ = 0.6;             // rozstaw śrub wzdłuż Z
const capLen = 2.4;            // długość czapy wzdłuż Z
const skirtH = 1.0, slotW = 0.22, washerR = 0.28;
const skirtTopOverlap = 0.06;
const skirtMeshY = blockTopY - skirtH / 2 + skirtTopOverlap; // 0.16
const slotTopGeom = boltY - skirtMeshY;

/* --- forkedSkirtGeo (kopia) — szczeliny otwarte do dołu --- */
function forkedSkirtGeo(pw, ph, thick, slotX, sW, slotTopY) {
  const hw = pw / 2, top = ph / 2, bot = -ph / 2, r = sW / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-hw, bot);
  shape.lineTo(-slotX - r, bot);
  shape.lineTo(-slotX - r, slotTopY);
  shape.absarc(-slotX, slotTopY, r, Math.PI, 0, true);
  shape.lineTo(-slotX + r, bot);
  shape.lineTo(slotX - r, bot);
  shape.lineTo(slotX - r, slotTopY);
  shape.absarc(slotX, slotTopY, r, Math.PI, 0, true);
  shape.lineTo(slotX + r, bot);
  shape.lineTo(hw, bot);
  shape.lineTo(hw, top);
  shape.lineTo(-hw, top);
  shape.lineTo(-hw, bot);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thick, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 1, steps: 1,
  });
  geo.translate(0, 0, -thick / 2);
  geo.computeVertexNormals();
  return geo;
}

console.log("\n== Geometrie ==");
const concrete = (() => {
  const w = W / 2, h = H / 2;
  const s = new THREE.Shape();
  s.moveTo(-w, -h); s.lineTo(w, -h); s.lineTo(w, h); s.lineTo(-w, h); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: D, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, steps: 1 });
  g.translate(0, 0, -D / 2); g.computeVertexNormals(); return g;
})();
const skirt = forkedSkirtGeo(capLen, skirtH, 0.05, boltZ, slotW, slotTopGeom);

ok(finite(concrete), "beton: brak NaN");
ok(finite(skirt), "ścianka (widełki) ze szczelinami: brak NaN");
const pb = box(skirt);
ok(pb.tris > 8, `ścianka triangulowana (tris=${pb.tris})`);
const cb = box(concrete);
console.log(`  beton bbox x=${cb.x.map(n=>n.toFixed(2))} y=${cb.y.map(n=>n.toFixed(2))} z=${cb.z.map(n=>n.toFixed(2))}`);
ok(Math.abs((cb.x[1]-cb.x[0]) - W) < 0.12, `szerokość ≈ ${W} (=${(cb.x[1]-cb.x[0]).toFixed(2)})`);
ok(Math.abs((cb.y[1]-cb.y[0]) - H) < 0.12, `wysokość ≈ ${H} (=${(cb.y[1]-cb.y[0]).toFixed(2)})`);
ok(Math.abs((cb.z[1]-cb.z[0]) - D) < 0.12, `głębokość ≈ ${D} (=${(cb.z[1]-cb.z[0]).toFixed(2)})`);
ok((cb.z[1]-cb.z[0]) > (cb.x[1]-cb.x[0]), "bloczek dłuższy (Z) niż szerszy (X) — proporcje 30×19");

console.log("\n== Beton: proporcje vs film 19×30×12 ==");
const ratio = (cb.x[1]-cb.x[0]) / (cb.y[1]-cb.y[0]); // szer/wys ~ 19/12 = 1.58
ok(Math.abs(ratio - 19/12) < 0.2, `szer/wys ≈ ${(19/12).toFixed(2)} (=${ratio.toFixed(2)})`);
const ratioD = (cb.z[1]-cb.z[0]) / (cb.y[1]-cb.y[0]); // gł/wys ~ 30/12 = 2.5
ok(Math.abs(ratioD - 30/12) < 0.2, `gł/wys ≈ ${(30/12).toFixed(2)} (=${ratioD.toFixed(2)})`);

console.log("\n== NIERUCHOMA śruba pozostaje w szczelinie przy regulacji (stopa ślizga się) ==");
// szczelina w układzie stopy: wierzchołek (zaokrąglony) w skirtMeshY+slotTopGeom, otwarta do dołu (skirtMeshY-skirtH/2)
// stopa unosi się o L → szczelina przesuwa się w górę; śruba (boltY, świat) musi zostać w szczelinie
for (const L of [0, 0.25, 0.5]) {
  const arcTopWorld = skirtMeshY + slotTopGeom + slotW / 2 + L; // szczyt zaokrąglenia (r nad środkiem łuku)
  const slotBotWorld = skirtMeshY - skirtH / 2 + L;             // otwarty dół szczeliny
  const inside = boltY + studR <= arcTopWorld + 1e-9 && boltY >= slotBotWorld - 1e-9;
  ok(inside, `lift=${L}: trzpień (y=${boltY}±${studR}) w szczelinie [${slotBotWorld.toFixed(2)}..${arcTopWorld.toFixed(2)}]`);
}
ok(studR <= slotW / 2 + 1e-9, `trzpień w X mieści się w szczelinie (studR=${studR} ≤ ${(slotW/2).toFixed(3)})`);

console.log("\n== Talerz (duża podkładka) dociska szczelinę; nakrętka na zewnątrz lica ==");
ok(washerR > slotW / 2, `podkładka („talerz") szersza niż szczelina (R=${washerR} > ${(slotW/2).toFixed(3)})`);
ok(washerR > 0.155, `podkładka większa od nakrętki (R=${washerR} > 0.155 — „nie bezpośrednio śrubą, lecz talerzem")`);
const nutOuter = 0.155 + 0.14 / 2;        // 0.225 (lokalnie od lica ścianki)
const nutXface = skirtX + nutOuter;
ok(nutXface > W / 2, `nakrętka wystaje poza lico ±X betonu (x=${nutXface.toFixed(2)} > ${(W/2).toFixed(2)})`);

console.log("\n== Wcięcia otwarte do dołu (nie zamknięte kapsuły) ==");
const slotBottomLocal = skirtMeshY - skirtH / 2; // dolny otwarty kraniec
ok(slotBottomLocal < boltY - 0.2, `szczelina sięga znacznie poniżej śruby — „od śruby do samego dołu" (dół=${slotBottomLocal.toFixed(2)})`);

console.log("\n== Czapa: okrakiem na DŁUŻSZYCH bokach (±X), ciągła (płyta łączy ścianki) ==");
ok(skirtX > W / 2, `ścianki na ZEWNĄTRZ liców ±X (skirtX=${skirtX} > ${(W/2).toFixed(2)})`);
const plateHalfW = (2 * skirtX + 0.04) / 2;
ok(plateHalfW >= skirtX - 1e-9, `płyta sięga do ścianek — czapa CIĄGŁA, bez przerwy (płyta±${plateHalfW.toFixed(2)} ≥ ${skirtX})`);
ok(boltZ + washerR < capLen / 2, `śruby+talerze mieszczą się w długości czapy (${(boltZ+washerR).toFixed(2)} < ${(capLen/2).toFixed(2)})`);
ok((skirtMeshY + skirtH / 2) - blockTopY >= skirtTopOverlap - 1e-6, `góra ścianki WCHODZI w płytę (overlap=${((skirtMeshY + skirtH/2) - blockTopY).toFixed(3)} ≥ ${skirtTopOverlap} → bez szpary)`);
ok(skirtMeshY - skirtH / 2 - 0.008 >= -H / 2 - 1e-6, `spód ścianki ≥ spód bryły (${(skirtMeshY - skirtH/2 - 0.008).toFixed(3)} ≥ ${(-H/2).toFixed(2)})`);

console.log(`\n${fails === 0 ? "WSZYSTKO OK ✓" : fails + " BŁĘDÓW ✗"}\n`);
process.exit(fails === 0 ? 0 : 1);
