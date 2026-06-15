// Jednorazowa optymalizacja assetów: duże PNG → WebP (zmiana ref w kodzie),
// logo i postery przeskalowane/przekompresowane W MIEJSCU (bez zmiany ref).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "public/assets";
const kb = (b) => `${(b / 1024) | 0}KB`;

async function toWebp(srcName, outName, width, quality) {
  const src = path.join(dir, srcName);
  const before = fs.statSync(src).size;
  const buf = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
  fs.writeFileSync(path.join(dir, outName), buf);
  console.log(`  ${srcName} (${kb(before)}) → ${outName} (${kb(buf.length)})`);
}
async function pngInPlace(name, width) {
  const p = path.join(dir, name);
  const before = fs.statSync(p).size;
  const buf = await sharp(p).resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 88 }).toBuffer();
  if (buf.length < before) { fs.writeFileSync(p, buf); console.log(`  ${name} ${kb(before)} → ${kb(buf.length)}`); }
  else console.log(`  ${name} ${kb(before)} (kept, recompress larger)`);
}
async function jpgInPlace(name, width) {
  const p = path.join(dir, name);
  const before = fs.statSync(p).size;
  const buf = await sharp(p).resize({ width, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  if (buf.length < before) { fs.writeFileSync(p, buf); console.log(`  ${name} ${kb(before)} → ${kb(buf.length)}`); }
  else console.log(`  ${name} ${kb(before)} (kept)`);
}

console.log("== Duże obrazy → WebP ==");
await toWebp("grafika1.png", "grafika1.webp", 1000, 80);
await toWebp("STANDARD-983x1024-1.png", "STANDARD-983x1024-1.webp", 820, 82);
await toWebp("STANDARD-PLUS-1966x2048-1.png", "STANDARD-PLUS-1966x2048-1.webp", 1000, 82);

console.log("== Logo (PNG w miejscu) ==");
for (const l of ["JR.png", "Komato.png", "Cont4you.png", "global-containers-1024x195-1.png", "art-pawilony.png", "syrek-1.png", "NoviPawilony-1.png"]) {
  try { await pngInPlace(l, 480); } catch (e) { console.log(`  ${l} ERR ${e.message}`); }
}

console.log("== Postery (JPG w miejscu) ==");
for (const j of ["video-poster.jpg", "hero-poster.jpg", "drblocks-film-poster.jpg"]) {
  try { await jpgInPlace(j, 1100); } catch (e) { console.log(`  ${j} ERR`); }
}

console.log("== Ikony korzyści (Zrzut-ekranu*) ==");
for (const f of fs.readdirSync(dir).filter((n) => n.startsWith("Zrzut-ekranu") && n.endsWith(".png"))) {
  try { await pngInPlace(f, 640); } catch (e) { console.log(`  ${f} ERR`); }
}
console.log("DONE");
