"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { asset } from "@/lib/asset";

export type Variant = "standard" | "plus";

/* =========================================================================
   DrBlocks — regulowany bloczek fundamentowy (model proceduralny, PBR).
   Wymiary referencyjne z filmu produktowego: 19 (szer.) × 30 (gł.) × 12 (wys.) cm.
   Skala modelu: 1 jednostka = 10 cm.  Układ: X = szerokość, Y = wysokość,
   Z = głębokość. Korpus wyśrodkowany w (0,0,0).

   Konstrukcja (wg renderów STANDARD / STANDARD-PLUS):
   • betonowy korytkowy korpus (profil U, kanał otwarty od góry),
   • czarna stalowa stopa-siodło wchodząca w kanał (płyta nośna + korpus +
     dwie ścianki czołowe z pionowymi szczelinami) — UNOSI się przy regulacji,
   • 4× ocynkowana śruba M16 (trzpień + podkładka + nakrętka) — NIERUCHOME,
     zakotwione w betonie; stopa przesuwa się po nich w szczelinach,
   • PRZÓD: nakrętki ośmiokątne, TYŁ: okrągłe nakrętki kołpakowe,
   • PLUS: chwytak magnetyczny (wkręt + magnetyczny krążek).
   ========================================================================= */

/* ---- niezmienne wymiary (stałe modułowe) ----
   KONSTRUKCJA: PEŁNA bryła betonu + stalowa CZAPA (podstawka) NA WIERZCHU, opadająca
   na lico PRZÓD/TYŁ dwiema ściankami z wcięciami na śruby. Czapa unosi się (regulacja),
   a w lukę między wierzchem betonu a czapą wlewa się podlewkę (TYLKO w obrębie czarnej bazy). */
const W = 1.9; // szerokość (X) — krótszy wymiar poziomy
const H = 1.2; // wysokość (Y)
const D = 3.0; // głębokość (Z) — DŁUŻSZY wymiar poziomy
const blockTopY = H / 2; // 0.6 — górne lico pełnej bryły betonu

const studR = 0.075; // M16 ≈ Ø16 mm
const boltY = 0.32; // wysokość osi śruby (świat) — NIERUCHOMA (zakotwiona w betonie)
const maxLift = 0.5; // 55 mm regulacji ≈ 0.5 jednostki
// CZAPA okrakiem na szerokości (X), opadająca na DWA DŁUŻSZE boki (lica ±X), jeden ciągły kształt.
const skirtX = W / 2 + 0.02; // 0.97 — ścianki czapy na licu ±X (dłuższe boki)
const boltZ = 0.6; // rozstaw śrub wzdłuż długości (Z)
const capLen = 2.4; // długość czapy wzdłuż Z
// ścianka czapy: PŁYTA z 2 pionowymi szczelinami OTWARTYMI DO DOŁU; opada z wierzchu betonu
const skirtH = 1.0; // wysokość ścianki
const skirtTopOverlap = 0.06; // ścianka wchodzi w płytę → BEZ szpary ściana↔sufit
const skirtMeshY = blockTopY - skirtH / 2 + skirtTopOverlap; // 0.16
const slotW = 0.22; // szerokość szczeliny
const slotTopGeom = boltY - skirtMeshY; // wierzchołek szczeliny = oś śruby przy lift 0
const washerR = 0.28; // DUŻY talerz dociskowy (większy — jak na inspiracji)

/* =========================================================================
   PROCEDURALNE TEKSTURY PBR (canvas → mapy normalnych / chropowatości)
   ========================================================================= */
function newCanvas(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  return c;
}
function toTex(canvas: HTMLCanvasElement, repeat = 1, srgb = false) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 16;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
/* mapa normalnych z mapy wysokości (Sobel) */
function heightToNormal(height: HTMLCanvasElement, strength: number, repeat = 1) {
  const size = height.width;
  const src = height.getContext("2d")!.getImageData(0, 0, size, size).data;
  const out = newCanvas(size);
  const octx = out.getContext("2d")!;
  const img = octx.createImageData(size, size);
  const H_ = (x: number, y: number) => {
    x = (x + size) % size;
    y = (y + size) % size;
    return src[(y * size + x) * 4] / 255;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (H_(x - 1, y) - H_(x + 1, y)) * strength;
      const dy = (H_(x, y - 1) - H_(x, y + 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      img.data[i] = ((dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = (1 / len) * 0.5 * 255 + 128;
      img.data[i + 3] = 255;
    }
  }
  octx.putImageData(img, 0, 0);
  return toTex(out, repeat);
}

/* beton B30 FORMOWANY (as-cast): kruszywo SCHOWANE pod mleczkiem cementowym →
   matowa chłodno-szara powierzchnia, miękkie chmurkowe plamy, rzadkie ciemne pory
   (bug-holes), delikatne ślady szalunku. NIE terrazzo. */
function makeConcrete(lowPower = false) {
  // na telefonie 512 px zamiast 1024 — Sobel (heightToNormal) i pętle ziarna
  // skalują się z polem (size²), więc to ~4× mniej pracy na głównym wątku przy
  // pierwszym otwarciu modelu (koniec „zacięcia" w momencie tapnięcia).
  const size = lowPower ? 512 : 1024;
  const k = lowPower ? 0.25 : 1; // gęstość ziarna proporcjonalna do pola
  const rnd = Math.random;
  const alb = newCanvas(size), hgt = newCanvas(size), rgh = newCanvas(size);
  const a = alb.getContext("2d")!, h = hgt.getContext("2d")!, r = rgh.getContext("2d")!;
  a.fillStyle = "#ababa4"; a.fillRect(0, 0, size, size); // wyschnięty zaczyn (chłodny jasny szary)
  h.fillStyle = "#808080"; h.fillRect(0, 0, size, size);
  r.fillStyle = "#dadada"; r.fillRect(0, 0, size, size); // matowy ~0.85

  // 1) chmurkowe plamy zaczynu — GŁÓWNY motyw (miękkie, niski kontrast)
  for (let i = 0; i < 16; i++) {
    const x = rnd() * size, y = rnd() * size, rad = size * (0.25 + rnd() * 0.25);
    const c = rnd() > 0.5 ? 184 : 158; // ±~13 wokół bazy 171
    const g = a.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(${c},${c},${c - 6},${0.1 + rnd() * 0.08})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    a.fillStyle = g; a.beginPath(); a.arc(x, y, rad, 0, Math.PI * 2); a.fill();
  }
  // 2) „ghost aggregate" — ledwo widoczne kruszywo pod skórką (ta sama szarość)
  for (let i = 0; i < 500 * k; i++) {
    const x = rnd() * size, y = rnd() * size, rad = 8 + rnd() * 18;
    const v = 168 + ((rnd() * 8) | 0) - 4; // ±4
    a.fillStyle = `rgba(${v},${v},${v - 3},0.22)`;
    a.beginPath(); a.arc(x, y, rad, 0, Math.PI * 2); a.fill();
    const hv = 130 + ((rnd() * 14) | 0); // bardzo delikatne podniesienie
    h.fillStyle = `rgba(${hv},${hv},${hv},0.25)`;
    h.beginPath(); h.arc(x, y, rad, 0, Math.PI * 2); h.fill();
  }
  // 3) drobne ziarno — mała amplituda, bez koloru
  for (let i = 0; i < 55000 * k; i++) {
    const x = rnd() * size, y = rnd() * size, v = 165 + rnd() * 12; // ±6
    a.fillStyle = `rgba(${v},${v},${v - 3},0.3)`;
    a.fillRect(x, y, 1, 1);
  }
  // 4) ślady szalunku — 2 ledwie widoczne, prawie proste linie
  for (let i = 0; i < 2; i++) {
    a.strokeStyle = "rgba(120,120,116,0.12)"; a.lineWidth = 1.5;
    a.beginPath();
    if (rnd() > 0.5) { const x = rnd() * size; a.moveTo(x, 0); a.lineTo(x + (rnd() - 0.5) * 24, size); }
    else { const y = rnd() * size; a.moveTo(0, y); a.lineTo(size, y + (rnd() - 0.5) * 24); }
    a.stroke();
  }
  // 5) pory / bug-holes — rzadkie ciemne okrągłe pitki (sygnaturowy detal)
  const pit = (x: number, y: number, rad: number) => {
    a.fillStyle = `rgba(40,38,35,${0.55 + rnd() * 0.25})`; a.beginPath(); a.arc(x, y, rad, 0, Math.PI * 2); a.fill();
    a.fillStyle = "rgba(20,19,17,0.6)"; a.beginPath(); a.arc(x, y, rad * 0.5, 0, Math.PI * 2); a.fill();
    h.fillStyle = "rgba(48,48,48,0.9)"; h.beginPath(); h.arc(x, y, rad, 0, Math.PI * 2); h.fill(); // wgłębienie
    r.fillStyle = "rgba(255,255,255,0.6)"; r.beginPath(); r.arc(x, y, rad, 0, Math.PI * 2); r.fill(); // bardziej chropowate
  };
  for (let i = 0; i < 24; i++) pit(rnd() * size, rnd() * size, 0.8 + rnd() * (rnd() < 0.85 ? 2.2 : 4));
  for (let c = 0; c < 4; c++) { // kilka skupisk
    const cx = rnd() * size, cy = rnd() * size;
    for (let i = 0; i < 5; i++) pit(cx + (rnd() - 0.5) * 44, cy + (rnd() - 0.5) * 44, 0.8 + rnd() * 2);
  }
  // 6) drobna wariacja chropowatości ±0.04 (kruszy jednolity połysk)
  for (let i = 0; i < 9000 * k; i++) {
    const x = rnd() * size, y = rnd() * size, v = 218 + ((rnd() * 20) | 0) - 10;
    r.fillStyle = `rgba(${v},${v},${v},0.3)`; r.fillRect(x, y, 2, 2);
  }
  return {
    map: toTex(alb, 2, true),
    normal: heightToNormal(hgt, 1.6, 2), // mniejszy relief — as-cast jest niemal płaski
    rough: toTex(rgh, 2),
  };
}

/* stal ocynkowana: SUBTELNY „spangle" — delikatne, metaliczne, nie kamienne */
function makeGalv() {
  const size = 256;
  const rgh = newCanvas(size), hgt = newCanvas(size);
  const r = rgh.getContext("2d")!, h = hgt.getContext("2d")!;
  r.fillStyle = "#5e5e5e"; r.fillRect(0, 0, size, size); // ~0.37 roughness bazowo (błyszczący)
  h.fillStyle = "#808080"; h.fillRect(0, 0, size, size);
  // duże, miękkie „kwiaty" ocynku — niski kontrast
  for (let i = 0; i < 220; i++) {
    const cx = Math.random() * size, cy = Math.random() * size;
    const n = 4 + ((Math.random() * 3) | 0), rad = Math.random() * 22 + 10;
    const rv = 84 + ((Math.random() * 26) | 0); // 0.33–0.43 — wąski zakres
    const hv = 124 + ((Math.random() * 14) | 0);
    r.fillStyle = `rgba(${rv},${rv},${rv},0.55)`;
    h.fillStyle = `rgba(${hv},${hv},${hv},0.5)`;
    r.beginPath(); h.beginPath();
    for (let k = 0; k <= n; k++) {
      const ang = (k / n) * Math.PI * 2 + Math.random() * 0.25;
      const rr = rad * (0.7 + Math.random() * 0.4);
      const px = cx + Math.cos(ang) * rr, py = cy + Math.sin(ang) * rr;
      if (k === 0) { r.moveTo(px, py); h.moveTo(px, py); } else { r.lineTo(px, py); h.lineTo(px, py); }
    }
    r.fill(); h.fill();
  }
  // mikro-ziarno (metaliczny połysk)
  for (let i = 0; i < 4000; i++) {
    const v = 70 + ((Math.random() * 40) | 0);
    r.fillStyle = `rgba(${v},${v},${v},0.18)`;
    r.fillRect(Math.random() * size, Math.random() * size, 1, 1);
  }
  return { rough: toTex(rgh, 2), normal: heightToNormal(hgt, 0.4, 2) };
}

/* OCYNK SZCZOTKOWANY — czapa/stopa regulacyjna (SREBRNY metal, NIE czarny).
   Duże, miękkie „kwiaty" spangle (niski kontrast) + KIERUNKOWE smugi szczotki
   + wyraźniejsze rysy/zadrapania + zmienna chropowatość. Tak jak na zdjęciach IRL
   (zwłaszcza wir szczotkowania widoczny z góry). */
function makeGalvPlate(lowPower = false) {
  const size = lowPower ? 256 : 512;
  const kd = lowPower ? 0.4 : 1; // mniej smug/rys na telefonie (tańszy Sobel + pętle)
  const rnd = Math.random;
  const rgh = newCanvas(size), hgt = newCanvas(size);
  const r = rgh.getContext("2d")!, h = hgt.getContext("2d")!;
  r.fillStyle = "#74747a"; r.fillRect(0, 0, size, size); // ~0.45 bazowo — lśniący ocynk
  h.fillStyle = "#808080"; h.fillRect(0, 0, size, size);

  // 1) duże, miękkie kwiaty ocynku (spangle) — niski kontrast
  for (let i = 0; i < 90 * kd; i++) {
    const cx = rnd() * size, cy = rnd() * size;
    const n = 5 + ((rnd() * 4) | 0), rad = 24 + rnd() * 48;
    const rv = 100 + ((rnd() * 30) | 0); // 0.39–0.51 — wąski zakres
    const hv = 122 + ((rnd() * 14) | 0);
    r.fillStyle = `rgba(${rv},${rv},${rv},0.38)`;
    h.fillStyle = `rgba(${hv},${hv},${hv},0.45)`;
    r.beginPath(); h.beginPath();
    for (let k = 0; k <= n; k++) {
      const ang = (k / n) * Math.PI * 2 + rnd() * 0.3;
      const rr = rad * (0.65 + rnd() * 0.5);
      const px = cx + Math.cos(ang) * rr, py = cy + Math.sin(ang) * rr;
      if (k === 0) { r.moveTo(px, py); h.moveTo(px, py); } else { r.lineTo(px, py); h.lineTo(px, py); }
    }
    r.fill(); h.fill();
  }
  // 2) KIERUNKOWE smugi szczotki (lekko ukośne) — sygnatura giętej blachy
  for (let i = 0; i < 1600 * kd; i++) {
    const y = rnd() * size, x = rnd() * size, len = 30 + rnd() * 120;
    const drift = (rnd() - 0.5) * 6;
    const hv = 120 + ((rnd() * 22) | 0) - 11;
    h.strokeStyle = `rgba(${hv},${hv},${hv},0.2)`;
    h.lineWidth = rnd() < 0.7 ? 0.6 : 1.1;
    h.beginPath(); h.moveTo(x, y); h.lineTo(x + len, y + drift); h.stroke();
    if (rnd() < 0.4) {
      const rv2 = rnd() > 0.5 ? 60 : 95;
      r.strokeStyle = `rgba(${rv2},${rv2},${rv2},0.16)`; r.lineWidth = 0.7;
      r.beginPath(); r.moveTo(x, y); r.lineTo(x + len, y + drift); r.stroke();
    }
  }
  // 3) wyraźne rysy/zadrapania (ciemniejsze w rough = gładsze, błyszczące przetarcia)
  for (let i = 0; i < 60 * kd; i++) {
    const x = rnd() * size, y = rnd() * size, len = 20 + rnd() * 80;
    const ang = (rnd() - 0.5) * 0.9;
    const dx = Math.cos(ang) * len, dy = Math.sin(ang) * len;
    r.strokeStyle = "rgba(46,46,46,0.5)"; r.lineWidth = rnd() < 0.5 ? 0.5 : 1;
    r.beginPath(); r.moveTo(x, y); r.lineTo(x + dx, y + dy); r.stroke();
    h.strokeStyle = "rgba(150,150,150,0.4)"; h.lineWidth = 0.6;
    h.beginPath(); h.moveTo(x, y); h.lineTo(x + dx, y + dy); h.stroke();
  }
  // 4) mikro-ziarno (metaliczne migotanie)
  for (let i = 0; i < 6000 * kd; i++) {
    const v = 95 + ((rnd() * 36) | 0);
    r.fillStyle = `rgba(${v},${v},${v},0.15)`;
    r.fillRect(rnd() * size, rnd() * size, 1, 1);
  }
  return { rough: toTex(rgh, 1.4), normal: heightToNormal(hgt, 0.7, 1.4) };
}

/* PLAKIETKA „drBLOCKS.PL" — WIERNE logo marki 1:1.
   Zamiast przybliżać niestandardowy font ręcznie, kładziemy PRAWDZIWY wordmark
   (biała wersja `logo-light.png`, 1280×233, z ikoną-bloczkiem zamiast „O") na ciemnym,
   lekko metalicznym szyldzie i doklejamy „.PL" w rozmiarze „dr". Obraz ładuje się
   asynchronicznie → po wczytaniu przerysowujemy canvas i `tex.needsUpdate = true`. */
function makeLogoBadge() {
  const W = 600, H = 248; // 2.42:1 — proporcja realnej tabliczki znamionowej (jak na zdjęciu)
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;

  const draw = (logo?: HTMLImageElement) => {
    x.clearRect(0, 0, W, H);
    // lico — SZCZOTKOWANA STAL, średni SZARY (tylko trochę ciemniejszy niż jasny ocynk czapy)
    const bg = x.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#8b9097"); bg.addColorStop(0.5, "#7d838a"); bg.addColorStop(1, "#6c7178");
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    // poziome szczotkowanie stali (drobne jasne/ciemne smugi, subtelne na jasnym tle)
    for (let i = 0; i < 170; i++) {
      const yy = Math.random() * H, xx = Math.random() * W * 0.4, len = W * (0.3 + Math.random() * 0.7);
      const v = Math.random() > 0.5 ? 255 : 40, a = 0.025 + Math.random() * 0.05;
      x.strokeStyle = `rgba(${v},${v},${v},${a})`; x.lineWidth = Math.random() < 0.7 ? 1 : 1.5;
      x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + len, yy + (Math.random() - 0.5)); x.stroke();
    }
    // górny połysk (subtelny)
    const sheen = x.createLinearGradient(0, 0, 0, H * 0.45);
    sheen.addColorStop(0, "rgba(255,255,255,0.11)"); sheen.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = sheen; x.fillRect(0, 0, W, H * 0.45);
    // RAMKA — fazowana, podniesiona krawędź metalowej płytki (jasny highlight + cień)
    x.lineWidth = 4; x.strokeStyle = "rgba(255,255,255,0.3)"; x.strokeRect(6, 6, W - 12, H - 12);
    x.lineWidth = 2; x.strokeStyle = "rgba(0,0,0,0.4)"; x.strokeRect(9, 9, W - 18, H - 18);

    // układ wiersza: [wordmark] [.pl] — wyśrodkowany, „.pl" małe (jak „dr")
    const padX = W * 0.085, availW = W - 2 * padX, availH = H * 0.42, ar = 1280 / 233;
    let wmH = availH, wmW = wmH * ar;
    x.font = `800 ${wmH * 0.5}px 'Arial Black','Arial',sans-serif`;
    let gap = wmH * 0.05, plW = x.measureText(".pl").width;
    const total0 = wmW + gap + plW;
    if (total0 > availW) { const s = availW / total0; wmH *= s; wmW *= s; plW *= s; gap *= s; }
    const wmY = (H - wmH) / 2, sx = (W - (wmW + gap + plW)) / 2;
    // CZARNE logo (logo-dark.png) — nadruk/grawer na szarej stali
    if (logo) x.drawImage(logo, sx, wmY, wmW, wmH);
    x.fillStyle = "#15171a"; x.textBaseline = "alphabetic";
    x.font = `800 ${wmH * 0.5}px 'Arial Black','Arial',sans-serif`;
    x.fillText(".pl", sx + wmW + gap, wmY + wmH * 0.97);
    tex.needsUpdate = true;
  };

  draw(); // szyld + „.pl" od razu; wordmark (czarny) dorysujemy po wczytaniu obrazu
  const img = new Image();
  img.onload = () => draw(img);
  img.src = asset("/assets/logo-dark.png");
  return tex;
}

/* CIEŃ KONTAKTOWY pod tabliczką — miękkie AO przy krawędzi + delikatny rzut „od światła
   z góry". Naklejka na licu czapy (TYLKO halo widoczne dookoła; środek zakrywa sama
   tabliczka). „Uziemia" płytkę niezależnie od kierunku światła sceny — tak jak w renderach
   produktowych. Czerń z alfą → mnoży/przyciemnia metal czapy pod spodem. */
function makeBadgeShadow() {
  const W = 364, H = 200;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const x = cv.getContext("2d")!;
  const bw = W * 0.742, bh = H * 0.559, bx = (W - bw) / 2, by = (H - bh) / 2, r = 14;
  const rr = (X: number, Y: number, Wd: number, Ht: number, rad: number) => {
    x.beginPath(); x.moveTo(X + rad, Y);
    x.arcTo(X + Wd, Y, X + Wd, Y + Ht, rad); x.arcTo(X + Wd, Y + Ht, X, Y + Ht, rad);
    x.arcTo(X, Y + Ht, X, Y, rad); x.arcTo(X, Y, X + Wd, Y, rad); x.closePath();
  };
  // 1) miękki, szeroki rzut cienia (światło z góry → cień w dół)
  x.save(); x.fillStyle = "rgba(0,0,0,0.5)"; x.shadowColor = "rgba(0,0,0,0.5)";
  x.shadowBlur = 28; x.shadowOffsetX = -4; x.shadowOffsetY = 13; rr(bx, by, bw, bh, r); x.fill(); x.restore();
  // 2) ciasne AO tuż przy krawędzi (dookoła) — styk tabliczki z licem
  x.save(); x.fillStyle = "rgba(0,0,0,0.62)"; x.shadowColor = "rgba(0,0,0,0.62)";
  x.shadowBlur = 11; rr(bx, by, bw, bh, r); x.fill(); x.restore();
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 16;
  return t;
}

/* ---- ścianka czołowa stopy: PŁYTA z 2 pionowymi szczelinami OTWARTYMI DO DOŁU
   (zaokrąglone u góry na wysokości śruby, otwarte przy dolnej krawędzi) ---- */
function forkedSkirtGeo(pw: number, ph: number, thick: number, slotX: number, sW: number, slotTopY: number) {
  const hw = pw / 2, top = ph / 2, bot = -ph / 2, r = sW / 2;
  const cr = 0.09; // promień zaokrąglenia DOLNYCH narożników (lewo/prawo)
  const shape = new THREE.Shape();
  // obrys CCW: zaokrąglony dolny-lewy róg → dolna krawędź z 2 wcięciami → zaokrąglony dolny-prawy → góra
  shape.moveTo(-hw, bot + cr);
  shape.quadraticCurveTo(-hw, bot, -hw + cr, bot); // zaokrąglony dolny-lewy róg
  shape.lineTo(-slotX - r, bot);
  shape.lineTo(-slotX - r, slotTopY);
  shape.absarc(-slotX, slotTopY, r, Math.PI, 0, true); // łuk nad lewą szczeliną
  shape.lineTo(-slotX + r, bot);
  shape.lineTo(slotX - r, bot);
  shape.lineTo(slotX - r, slotTopY);
  shape.absarc(slotX, slotTopY, r, Math.PI, 0, true); // łuk nad prawą szczeliną
  shape.lineTo(slotX + r, bot);
  shape.lineTo(hw - cr, bot);
  shape.quadraticCurveTo(hw, bot, hw, bot + cr); // zaokrąglony dolny-prawy róg
  shape.lineTo(hw, top);
  shape.lineTo(-hw, top);
  shape.lineTo(-hw, bot + cr);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thick, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 1, steps: 1,
  });
  geo.translate(0, 0, -thick / 2);
  geo.computeVertexNormals();
  return geo;
}

/* płyta nośna (nakładka) czapy — leży na wierzchu, NAKRYWA obie ścianki (ciągła, bez szpary) */
function plateGeometry() {
  const pw = 2 * skirtX + 0.08, pd = capLen + 0.04, ph = 0.09, rr = 0.03;
  const shape = new THREE.Shape();
  const x0 = -pw / 2, z0 = -pd / 2;
  shape.moveTo(x0 + rr, z0);
  shape.lineTo(x0 + pw - rr, z0);
  shape.quadraticCurveTo(x0 + pw, z0, x0 + pw, z0 + rr);
  shape.lineTo(x0 + pw, z0 + pd - rr);
  shape.quadraticCurveTo(x0 + pw, z0 + pd, x0 + pw - rr, z0 + pd);
  shape.lineTo(x0 + rr, z0 + pd);
  shape.quadraticCurveTo(x0, z0 + pd, x0, z0 + pd - rr);
  shape.lineTo(x0, z0 + rr);
  shape.quadraticCurveTo(x0, z0, x0 + rr, z0);
  /* WLEWY BETONU — 2 okrągłe otwory na PRZEKĄTNEJ (świat: X = shapeX, Z = −shapeY):
       mały — PRZÓD-PRAWO  (świat X−0.50, Z−0.78) → shape (−0.50, +0.78)
       duży — TYŁ-LEWO     (świat X+0.50, Z+0.78) → shape (+0.50, −0.78) */
  const pourHole = (sx: number, sy: number, rad: number) => {
    const p = new THREE.Path();
    p.absarc(sx, sy, rad, 0, Math.PI * 2, true);
    shape.holes.push(p);
  };
  pourHole(-0.5, 0.78, 0.1); // mały wlew (przód-prawo)
  pourHole(0.5, -0.78, 0.17); // duży wlew (tył-lewo)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: ph, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 1,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

/* PEŁNA bryła betonu z lekko sfazowanymi krawędziami */
function concreteGeometry() {
  const w = W / 2, h = H / 2;
  const s = new THREE.Shape();
  s.moveTo(-w, -h);
  s.lineTo(w, -h);
  s.lineTo(w, h);
  s.lineTo(-w, h);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: D, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, steps: 1,
  });
  geo.translate(0, 0, -D / 2);
  geo.computeVertexNormals();
  return geo;
}

type Geos = {
  concrete: THREE.BufferGeometry; plate: THREE.BufferGeometry;
  skirt: THREE.BufferGeometry; washer: THREE.BufferGeometry; washerBevel: THREE.BufferGeometry;
  hexNut: THREE.BufferGeometry; hexNutTop: THREE.BufferGeometry; boltEnd: THREE.BufferGeometry;
  boltThread: THREE.BufferGeometry; boltSocket: THREE.BufferGeometry;
  badge: THREE.BufferGeometry; badgeShadow: THREE.BufferGeometry; boss: THREE.BufferGeometry;
  stud: THREE.BufferGeometry; gripCup: THREE.BufferGeometry; gripMagnet: THREE.BufferGeometry;
  gripHead: THREE.BufferGeometry; gripShank: THREE.BufferGeometry; gripThread: THREE.BufferGeometry;
  gripTip: THREE.BufferGeometry; grout: THREE.BufferGeometry;
};
type Mats = {
  concrete: THREE.Material; cap: THREE.Material; badge: THREE.Material; badgeEdge: THREE.Material;
  badgeShadow: THREE.Material; galv: THREE.Material; magnet: THREE.Material;
  groutSide: THREE.MeshStandardMaterial; groutCap: THREE.MeshStandardMaterial;
};

/* ---- pojedyncza śruba M16 (NIERUCHOMA, zakotwiona w betonie) ----
   Na licu ±X (dłuższy bok). side=+1 (prawe lico +X) / −1 (lewe lico −X). rotation Z = ∓side·π/2
   ⇒ lokalne +Y → świat ±X (na zewnątrz). Stos: trzpień │ DUŻY talerz │ nakrętka 6-kątna.
   IDENTYCZNE po OBU stronach (potwierdzone na zdjęciach IRL — brak okrągłych kołpakowych). */
function Bolt({ z, side, geos, mat, socketMat }: { z: number; side: number; geos: Geos; mat: THREE.Material; socketMat: THREE.Material }) {
  return (
    <group position={[side * skirtX, boltY, z]} rotation={[0, 0, (-side * Math.PI) / 2]}>
      {/* trzpień przez szczelinę */}
      <mesh geometry={geos.stud} material={mat} position={[0, 0.0, 0]} castShadow />
      {/* DUŻY talerz: płaska podkładka + sfazowana krawędź */}
      <mesh geometry={geos.washer} material={mat} position={[0, 0.045, 0]} castShadow />
      <mesh geometry={geos.washerBevel} material={mat} position={[0, 0.078, 0]} />
      {/* nakrętka sześciokątna + faza + wystający, GWINTOWANY koniec trzpienia */}
      <mesh geometry={geos.hexNut} material={mat} position={[0, 0.15, 0]} castShadow />
      <mesh geometry={geos.hexNutTop} material={mat} position={[0, 0.23, 0]} />
      <mesh geometry={geos.boltEnd} material={mat} position={[0, 0.245, 0]} />
      {[0, 1, 2].map((i) => (
        <mesh key={i} geometry={geos.boltThread} material={mat} position={[0, 0.215 + i * 0.025, 0]} rotation={[Math.PI / 2, 0, 0]} />
      ))}
      {/* wpuszczone ciemne gniazdo (industrial) w czole trzpienia */}
      <mesh geometry={geos.boltSocket} material={socketMat} position={[0, 0.27, 0]} />
    </group>
  );
}

export function BlockModel({
  variant = "standard",
  liftMm = 0,
  grout = false,
  lowPower = false,
}: {
  variant?: Variant;
  liftMm?: number;
  grout?: boolean;
  lowPower?: boolean;
}) {
  // wkręt chwytaka: POZIOMO (jak śruby obok) — łeb prosto na zewnątrz (−X), ostrze w głąb czapy
  const gripQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0)),
    [],
  );
  // środek wkrętu chwytaka w Y — POD plakietką (która zeszła niżej) na licu −X
  const gripY = 0.22;

  const { geos, mats, textures, groutFaces } = useMemo(() => {
    const concreteTex = makeConcrete(lowPower);
    const galvTex = makeGalv();
    const galvPlateTex = makeGalvPlate(lowPower);
    const logoTex = makeLogoBadge();
    const badgeShadowTex = makeBadgeShadow();
    // klony tekstur dla BOKÓW podlewki — repeat.y sterowany wg `lift` (bez rozciągania).
    // Ta SAMA tekstura co bryła → podlewka wygląda jak beton.
    const groutSideMap = concreteTex.map.clone(); groutSideMap.needsUpdate = true;
    const groutSideNrm = concreteTex.normal.clone(); groutSideNrm.needsUpdate = true;
    const groutSideRgh = concreteTex.rough.clone(); groutSideRgh.needsUpdate = true;
    for (const t of [groutSideMap, groutSideNrm, groutSideRgh]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 16;
    }
    if (groutSideMap.colorSpace !== undefined) groutSideMap.colorSpace = THREE.SRGBColorSpace;
    const textures = [
      concreteTex.map, concreteTex.normal, concreteTex.rough,
      galvTex.rough, galvTex.normal, galvPlateTex.rough, galvPlateTex.normal, logoTex, badgeShadowTex,
      groutSideMap, groutSideNrm, groutSideRgh,
    ];
    const geos: Geos = {
      concrete: concreteGeometry(),
      plate: plateGeometry(),
      skirt: forkedSkirtGeo(capLen, skirtH, 0.05, boltZ, slotW, slotTopGeom),
      // DUŻY talerz — płaska podkładka + sfazowana krawędź (więcej detalu, true-to-size)
      washer: new THREE.CylinderGeometry(washerR, washerR, 0.04, 48),
      washerBevel: new THREE.CylinderGeometry(washerR - 0.02, washerR, 0.025, 48),
      // nakrętka SZEŚCIOKĄTNA (jak na renderze) + sfazowana górna krawędź
      hexNut: new THREE.CylinderGeometry(0.15, 0.15, 0.13, 6),
      hexNutTop: new THREE.CylinderGeometry(0.128, 0.15, 0.03, 6),
      // wystający koniec trzpienia w środku nakrętki + zarys gwintu + gniazdo (industrial)
      boltEnd: new THREE.CylinderGeometry(0.062, 0.062, 0.07, 24),
      boltThread: new THREE.TorusGeometry(0.064, 0.009, 8, 22),
      boltSocket: new THREE.CylinderGeometry(0.038, 0.038, 0.05, 6),
      // plakietka „drBLOCKS.pl" — cienki BOX (realna grubość tabliczki) + boss (gwintowany otwór)
      badge: new THREE.BoxGeometry(0.46, 0.19, 0.022),
      // płaszczyzna cienia kontaktowego pod tabliczką (większa → halo wychodzi poza krawędź)
      badgeShadow: new THREE.PlaneGeometry(0.62, 0.34),
      boss: new THREE.CylinderGeometry(0.085, 0.1, 0.07, 32),
      stud: new THREE.CylinderGeometry(studR, studR, 0.34, 24),
      // chwytak PLUS: DUŻY magnes (srebrny rim + czarne lico), CIEŃSZY trzon
      gripCup: new THREE.CylinderGeometry(0.26, 0.26, 0.07, 48),
      gripMagnet: new THREE.CylinderGeometry(0.215, 0.215, 0.05, 48),
      gripHead: new THREE.CylinderGeometry(0.07, 0.07, 0.06, 28),
      gripShank: new THREE.CylinderGeometry(0.034, 0.034, 0.5, 28),
      gripThread: new THREE.TorusGeometry(0.04, 0.012, 10, 24),
      gripTip: new THREE.ConeGeometry(0.034, 0.1, 28),
      // wypełnienie luki — sześcian jednostkowej wysokości, skalowany w Y wg `lift`
      grout: new THREE.BoxGeometry(W - 0.02, 1, capLen - 0.04),
    };
    const mats: Mats = {
      // beton — kolor niesie mapa albedo (#fff), czysty dielektryk, NISKI relief (as-cast)
      concrete: new THREE.MeshStandardMaterial({
        map: concreteTex.map, normalMap: concreteTex.normal, roughnessMap: concreteTex.rough,
        normalScale: new THREE.Vector2(0.32, 0.35), color: "#ffffff", roughness: 1.0, metalness: 0.0,
        envMapIntensity: 0.55,
      }),
      // CZAPA/STOPA REGULACYJNA — OCYNK SZCZOTKOWANY, SREBRNY metal (metalness 1!),
      // NIE czarny. Mapy chropowatości/normalnych z makeGalvPlate (smugi szczotki + spangle).
      cap: new THREE.MeshStandardMaterial({
        color: "#c9cdd2", roughnessMap: galvPlateTex.rough, roughness: 1.0, metalness: 1.0,
        normalMap: galvPlateTex.normal, normalScale: new THREE.Vector2(0.5, 0.5), envMapIntensity: 1.25,
      }),
      // plakietka „drBLOCKS.pl" — LICO: szara szczotkowana stal, NISKA metaliczność (0.28) →
      // matowo-satynowa: ŚWIATŁO i CIEŃ kładą się DYFUZYJNIE (jak na korpusie), NIE jak lustro,
      // więc pod kątem NIE czernieje. Niskie envMapIntensity. receiveShadow na meshu.
      badge: new THREE.MeshStandardMaterial({
        map: logoTex, color: "#ffffff", roughness: 0.62, metalness: 0.28, envMapIntensity: 0.45,
      }),
      // krawędzie (grubość) tabliczki — średnia stal (też nie czernieje pod kątem)
      badgeEdge: new THREE.MeshStandardMaterial({
        color: "#5e6267", roughness: 0.55, metalness: 0.4, envMapIntensity: 0.6,
      }),
      // cień kontaktowy tabliczki — NIEOŚWIETLONY (basic), czerń z alfą; mnoży/przyciemnia lico
      // czapy pod spodem. depthWrite=false + polygonOffset → bez z-fightingu na licu.
      badgeShadow: new THREE.MeshBasicMaterial({
        map: badgeShadowTex, transparent: true, opacity: 0.92, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3,
      }),
      // ocynk hardware — prawdziwy metal (metalness 1) — śruby/talerze/chwytak
      galv: new THREE.MeshStandardMaterial({
        color: "#dee2e8", roughnessMap: galvTex.rough, roughness: 1.0, metalness: 1.0,
        normalMap: galvTex.normal, normalScale: new THREE.Vector2(0.12, 0.12), envMapIntensity: 1.4,
      }),
      magnet: new THREE.MeshStandardMaterial({ color: "#0d0f12", roughness: 0.5, metalness: 0.45 }),
      // podlewka — BOKI: IDENTYCZNA jak beton (mapa+normal+rough), `repeat.y` wg wysokości
      groutSide: new THREE.MeshStandardMaterial({
        map: groutSideMap, normalMap: groutSideNrm, roughnessMap: groutSideRgh,
        normalScale: new THREE.Vector2(0.32, 0.35), color: "#ffffff", roughness: 1.0, metalness: 0.0,
        envMapIntensity: 0.55,
      }),
      // podlewka — GÓRA/DÓŁ: ta sama mapa co bryła (stały repeat)
      groutCap: new THREE.MeshStandardMaterial({
        map: concreteTex.map, normalMap: concreteTex.normal, roughnessMap: concreteTex.rough,
        normalScale: new THREE.Vector2(0.32, 0.35), color: "#ffffff", roughness: 1.0, metalness: 0.0,
        envMapIntensity: 0.55,
      }),
    };
    // BoxGeometry kolejność ścian: [+X,-X,+Y,-Y,+Z,-Z] → boki 0,1,4,5; góra/dół 2,3
    const groutFaces = [mats.groutSide, mats.groutSide, mats.groutCap, mats.groutCap, mats.groutSide, mats.groutSide];
    return { geos, mats, textures, groutFaces };
    // `lowPower` jest stałe przez całe życie komponentu (ustalane raz przy starcie),
    // więc to nadal jednorazowe wyliczenie — tylko poprawne wg trybu urządzenia.
  }, [lowPower]);

  // geos/mats/textures pochodzą z useMemo([]) → są stałe; sprzątanie tylko przy odmontowaniu
  useEffect(() => {
    return () => {
      Object.values(geos).forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lift = (liftMm / 55) * maxLift;

  // podlewka: kontruj rozciąganie UV (repeat.y wg wysokości). Materiał = JAK BETON (stały #fff/1.0).
  const ry = Math.max(lift, 0.001) * 4;
  mats.groutSide.map?.repeat.set(2, ry);
  mats.groutSide.normalMap?.repeat.set(2, ry);
  mats.groutSide.roughnessMap?.repeat.set(2, ry);

  return (
    <group>
      {/* ===== PEŁNA bryła betonu (nieruchoma) ===== */}
      <mesh geometry={geos.concrete} material={mats.concrete} castShadow receiveShadow />

      {/* ===== PODLEWKA CEMENTOWA — wypełnia lukę TYLKO gdy włączona =====
           Wygląda jak beton (ta sama tekstura). OFF → luki nie wypełnia. Rośnie z `lift`. */}
      {grout && lift > 0.001 && (
        <mesh
          geometry={geos.grout}
          material={groutFaces}
          position={[0, blockTopY + lift / 2, 0]}
          scale={[1, lift, 1]}
          receiveShadow
        />
      )}

      {/* ===== stalowa CZAPA / podstawka — JEDEN ciągły kształt (płyta + 2 ścianki na
           DŁUŻSZYCH bokach ±X), okrakiem na szerokości. Unosi się o `lift`; ślizga się
           po NIERUCHOMYCH śrubach; długie wcięcia do dołu pokazują regulację. */}
      <group position={[0, lift, 0]}>
        {/* płyta nośna (nakładka) — leży na wierzchu betonu, łączy obie ścianki; 2 wlewy betonu */}
        <mesh geometry={geos.plate} material={mats.cap} position={[0, blockTopY + 0.035, 0]} castShadow receiveShadow />
        {/* ścianka na lewym dłuższym licu (−X, PRZÓD) */}
        <mesh geometry={geos.skirt} material={mats.cap} position={[-skirtX, skirtMeshY, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow />
        {/* ścianka na prawym dłuższym licu (+X, TYŁ) */}
        <mesh geometry={geos.skirt} material={mats.cap} position={[skirtX, skirtMeshY, 0]} rotation={[0, Math.PI / 2, 0]} castShadow />

        {/* CIEŃ KONTAKTOWY pod tabliczką — naklejka na licu czapy; halo wychodzi poza krawędź
             tabliczki i „uziemia" ją (AO + delikatny rzut). Renderowany ZA samą tabliczką. */}
        <mesh
          geometry={geos.badgeShadow}
          material={mats.badgeShadow}
          position={[-skirtX - 0.027, 0.47, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          renderOrder={1}
        />
        {/* PLAKIETKA „drBLOCKS.pl" — środkowo-górne lico −X (przód); cienki BOX (grubość),
             lico (+Z → świat −X, indeks 4) = logo, pozostałe ścianki = ciemna stal krawędzi. */}
        <mesh
          geometry={geos.badge}
          material={[mats.badgeEdge, mats.badgeEdge, mats.badgeEdge, mats.badgeEdge, mats.badge, mats.badgeEdge]}
          position={[-skirtX - 0.04, 0.47, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          castShadow
          receiveShadow
        />

        {/* ===== chwytak magnetyczny — tylko STANDARD PLUS =====
             Na PRZODZIE (lico −X), MIĘDZY śrubami (z=0), tuż POD plakietką. Wkręt poziomy
             (gripQuat: +Y→−X) wkręcony w WYSTAJĄCY boss; na końcu DUŻY magnes:
             srebrny rim (obudowa) + czarne lico do widza. Trzon CIEŃSZY niż śruby obok. */}
        {variant === "plus" && (
          <group position={[-skirtX - 0.025, gripY, 0]}>
            <group quaternion={gripQuat}>
              {/* wystający boss (gwintowany otwór) na licu */}
              <mesh geometry={geos.boss} material={mats.galv} position={[0, 0.03, 0]} castShadow />
              {/* ostrze WKRĘCONE w głąb czapy */}
              <mesh geometry={geos.gripTip} material={mats.galv} position={[0, -0.06, 0]} rotation={[Math.PI, 0, 0]} castShadow />
              {/* cieńszy trzon z gwintem grubozwojnym */}
              <mesh geometry={geos.gripShank} material={mats.galv} position={[0, 0.2, 0]} castShadow />
              {Array.from({ length: 9 }).map((_, i) => (
                <mesh key={i} geometry={geos.gripThread} material={mats.galv} position={[0, 0.02 + i * 0.045, 0]} rotation={[Math.PI / 2, 0, 0]} />
              ))}
              {/* DUŻY magnes na końcu: kołnierz + srebrna obudowa (rim) + czarne lico na zewnątrz */}
              <mesh geometry={geos.gripHead} material={mats.galv} position={[0, 0.46, 0]} castShadow />
              <mesh geometry={geos.gripCup} material={mats.galv} position={[0, 0.52, 0]} castShadow />
              <mesh geometry={geos.gripMagnet} material={mats.magnet} position={[0, 0.57, 0]} castShadow />
            </group>
          </group>
        )}
      </group>

      {/* ===== śruby M16 — 4 szt., NIERUCHOME (na licach ±X) =====
           IDENTYCZNE 6-kątne po OBU stronach (potwierdzone na zdjęciach IRL). */}
      <Bolt z={-boltZ} side={-1} geos={geos} mat={mats.galv} socketMat={mats.magnet} />
      <Bolt z={boltZ} side={-1} geos={geos} mat={mats.galv} socketMat={mats.magnet} />
      <Bolt z={-boltZ} side={1} geos={geos} mat={mats.galv} socketMat={mats.magnet} />
      <Bolt z={boltZ} side={1} geos={geos} mat={mats.galv} socketMat={mats.magnet} />
    </group>
  );
}
