"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { partners } from "@/lib/partners";
import { MAP_W, MAP_H, POLAND_PATH, project } from "./poland-geo";
import type { SiteContent } from "@/i18n/types";

type MapStrings = SiteContent["partner"]["map"];
type Rect = { x: number; y: number; w: number; h: number };

const PTS = partners.map((p) => project(p.coords[0], p.coords[1]));
// DrBlocks HQ — Bielsko-Biała (network hub the partner connections radiate from).
const HQ = project(49.822, 19.047);

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const overlaps = (a: Rect, b: Rect) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

// Gentle hub→partner connection (control point lifted above the midpoint).
function arcPath(i: number) {
  const [px, py] = PTS[i];
  const [hx, hy] = HQ;
  const len = Math.hypot(px - hx, py - hy) || 1;
  const cx = (hx + px) / 2;
  const cy = (hy + py) / 2 - len * 0.2;
  return `M${hx} ${hy} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${px} ${py}`;
}

const RADII = [13, 20, 30, 44, 60, 80];

// Light "engineering graph paper": a fine teal grid + stronger major lines every
// 5 cells, with a soft teal glow in the centre. Harmonizes with the teal map.
const PAPER: React.CSSProperties = {
  backgroundColor: "#f4faf9",
  backgroundImage: [
    "radial-gradient(72% 62% at 50% 42%, rgba(45,189,176,0.13), rgba(45,189,176,0) 72%)",
    "linear-gradient(to right, rgba(15,140,130,0.10) 1px, transparent 1px)",
    "linear-gradient(to bottom, rgba(15,140,130,0.10) 1px, transparent 1px)",
    "linear-gradient(to right, rgba(45,189,176,0.07) 1px, transparent 1px)",
    "linear-gradient(to bottom, rgba(45,189,176,0.07) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "100% 100%, 120px 120px, 120px 120px, 24px 24px, 24px 24px",
};

export function PartnerMap({ t }: { t: MapStrings }) {
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [cw, setCw] = useState(700);

  const wrapRef = useRef<HTMLDivElement>(null);
  const emphasized = hover ?? active;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCw(e.contentRect.width));
    ro.observe(el);
    setCw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const s = cw / MAP_W;
  const ch = cw * (MAP_H / MAP_W);
  const screen = useMemo(() => PTS.map(([x, y]) => ({ x: x * s, y: y * s })), [s]);

  // Stable, guaranteed non-overlapping label layout (independent of hover).
  const labels = useMemo(() => {
    const placed: Rect[] = [];
    const pinRects: Rect[] = screen.map((p) => ({ x: p.x - 8, y: p.y - 8, w: 16, h: 16 }));
    const order = [...partners.keys()].sort((a, b) => screen[a].y - screen[b].y);
    const out: Record<number, Rect> = {};
    const M = 6; // edge margin
    for (const i of order) {
      const p = screen[i];
      const w = partners[i].name.length * 7.1 + 22;
      const h = 24;
      // Bias label placement toward the map centre so edge pins never overflow.
      const hx = p.x > cw / 2 ? -1 : 1; // inward horizontal
      const vy = p.y > ch / 2 ? -1 : 1; // inward vertical
      const dirs: [number, number][] = [
        [hx, 0], [0, vy], [hx, vy], [-hx, 0],
        [0, -vy], [hx, -vy], [-hx, vy], [-hx, -vy],
      ];
      let box: Rect | null = null;
      outer: for (const r of RADII) {
        for (const [dx, dy] of dirs) {
          const cand: Rect =
            dx === 0
              ? { x: p.x - w / 2, y: dy < 0 ? p.y - r - h : p.y + r, w, h }
              : dx > 0
                ? { x: p.x + r, y: p.y - h / 2 + dy * (h / 2 + 2), w, h }
                : { x: p.x - r - w, y: p.y - h / 2 + dy * (h / 2 + 2), w, h };
          if (cand.x < M || cand.y < M || cand.x + w > cw - M || cand.y + h > ch - M) continue;
          if (placed.some((q) => overlaps(cand, q))) continue;
          if (pinRects.some((q, j) => j !== i && overlaps(cand, q))) continue;
          box = cand;
          break outer;
        }
      }
      if (!box) box = { x: clamp(p.x - w / 2, M, cw - w - M), y: clamp(p.y - h / 2, M, ch - h - M), w, h };
      placed.push(box);
      out[i] = box;
    }
    return out;
  }, [screen, cw, ch]);

  const emphArc = emphasized != null ? arcPath(emphasized) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      {/* MAP — light engineering blueprint */}
      <div
        ref={wrapRef}
        style={{ ...PAPER, aspectRatio: `${MAP_W} / ${MAP_H}` }}
        className="relative w-full overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]"
      >
        <style>{pmStyles}</style>

        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="pm-tint" x1="0.2" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#2dbdb0" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#16a99c" stopOpacity="0.11" />
            </linearGradient>
          </defs>

          {/* country: soft teal-tinted region (grid shows through) + crisp outline */}
          <path className="pm-fill-in" d={POLAND_PATH} fill="url(#pm-tint)" />
          <path className="pm-poland-draw" d={POLAND_PATH} fill="none" stroke="#0f8c82" strokeWidth="1.8" strokeLinejoin="round" />

          {/* network connections from HQ to every partner */}
          {partners.map((p, i) => (
            <path
              key={`arc-${p.name}`}
              className="pm-arc"
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
              d={arcPath(i)}
              fill="none"
              stroke="#2dbdb0"
              strokeWidth="1.2"
              strokeOpacity={i === emphasized ? 0.9 : 0.3}
              strokeLinecap="round"
            />
          ))}

          {/* on hover: a light pulse travels along the highlighted connection */}
          {emphArc && (
            <circle r="3" fill="#0f8c82">
              <animateMotion dur="1.4s" repeatCount="indefinite" rotate="auto" path={emphArc} />
            </circle>
          )}

          {/* partner pins — clean survey markers */}
          {partners.map((p, i) => {
            const [x, y] = PTS[i];
            const on = i === emphasized;
            const col = p.category === "producent" ? "#0f8c82" : "#046bd2";
            const colOn = p.category === "producent" ? "#16a99c" : "#046bd2";
            return (
              <g key={p.name} transform={`translate(${x} ${y})`} style={{ cursor: "pointer" }}>
                {on && (
                  <circle r="9" fill="none" stroke={colOn} strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="r" values="7;14;7" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r="7.5" fill="#ffffff" opacity="0.9" />
                <circle r="6" fill={on ? colOn : "#ffffff"} stroke={col} strokeWidth="2.2" />
                <circle r="2.4" fill={on ? "#ffffff" : col} />
              </g>
            );
          })}

          {/* HQ — DrBlocks (brand navy hub) */}
          <g transform={`translate(${HQ[0]} ${HQ[1]})`}>
            <circle r="11" fill="none" stroke="#1e293b" strokeWidth="1.4" opacity="0.35">
              <animate attributeName="r" values="9;16;9" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r="9" fill="#ffffff" />
            <circle r="8" fill="#1e293b" />
            <path d="M0 -4.4 1.2 -1.3 4.4 -1.3 1.9 0.6 2.9 3.6 0 1.8 -2.9 3.6 -1.9 0.6 -4.4 -1.3 -1.2 -1.3Z" fill="#2dbdb0" />
          </g>
        </svg>

        {/* HQ label */}
        <div
          className="pointer-events-none absolute z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-2 py-0.5 text-center font-display text-[11px] font-bold text-white shadow-[var(--shadow-card)]"
          style={{ left: HQ[0] * s, top: HQ[1] * s + 13 }}
        >
          DrBlocks
        </div>

        {/* leader lines (pixel space) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${cw} ${ch}`} preserveAspectRatio="none" aria-hidden="true">
          {partners.map((p, i) => {
            const L = labels[i];
            if (!L) return null;
            const pt = screen[i];
            const cx = clamp(pt.x, L.x, L.x + L.w);
            const cy = clamp(pt.y, L.y, L.y + L.h);
            const on = i === emphasized;
            return (
              <line key={p.name} x1={pt.x} y1={pt.y} x2={cx} y2={cy} stroke={on ? "#0f8c82" : "#94a3b8"} strokeOpacity={on ? 0.9 : 0.5} strokeWidth="1" />
            );
          })}
        </svg>

        {/* labels — light chips matching the site UI */}
        <div className="absolute inset-0">
          {partners.map((p, i) => {
            const L = labels[i];
            if (!L) return null;
            const on = i === emphasized;
            return (
              <button
                key={p.name}
                type="button"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setActive(i)}
                style={{ left: L.x, top: L.y, width: L.w, height: L.h }}
                className={clsx(
                  "absolute flex items-center justify-center whitespace-nowrap rounded-md px-2 text-center font-display text-[12px] font-semibold leading-none shadow-[var(--shadow-card)] transition-colors duration-200",
                  on
                    ? "z-20 border border-teal bg-teal text-white"
                    : "z-10 border border-line bg-white text-navy hover:border-teal/50 hover:text-teal-800",
                )}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* legend */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1 rounded-lg border border-line bg-white/90 px-3 py-2 text-[11px] text-steel">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-teal-700" />
            {t.legendProducer}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#046bd2]" />
            {t.legendContractor}
          </span>
        </div>
      </div>

      {/* LIST — sticky panel that settles against the bottom of the map.
          No wheel trapping: hovering it scrolls the page like the rest. */}
      <div className="flex flex-col rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="font-oswald text-xs font-semibold uppercase tracking-[0.14em] text-mute">{t.listHeading}</h3>
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-teal-50 px-2 py-0.5 font-oswald text-[11px] font-bold text-teal-800">
            {partners.length}
          </span>
        </div>
        <ul className="pm-scroll flex-1 divide-y divide-line/70 lg:overflow-y-auto">
          {partners.map((p, i) => {
            const on = i === emphasized;
            const prod = p.category === "producent";
            return (
              <li key={p.name}>
                <button
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setActive(i)}
                  className={clsx(
                    "flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors",
                    on ? "bg-mist" : "hover:bg-mist/50",
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <span
                      className={clsx(
                        "size-2.5 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-mist transition-all",
                        prod ? "bg-teal-700" : "bg-[#046bd2]",
                        on ? (prod ? "ring-teal-700/25" : "ring-[#046bd2]/25") : "ring-transparent",
                      )}
                    />
                    <span>
                      <span className="block font-display text-[15px] font-semibold leading-tight text-navy">{p.name}</span>
                      <span className="mt-0.5 block text-sm text-steel">{p.city}</span>
                    </span>
                  </span>
                  <span
                    className={clsx(
                      "shrink-0 rounded-full px-2.5 py-1 font-oswald text-[10px] font-semibold uppercase tracking-wide",
                      prod ? "bg-teal-50 text-teal-800" : "bg-[#eaf3fc] text-[#0a5bb8]",
                    )}
                  >
                    {prod ? t.categoryProducer : t.categoryContractor}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const pmStyles = `
.pm-poland-draw{stroke-dasharray:5400;stroke-dashoffset:5400;animation:pm-draw 1.8s cubic-bezier(.16,1,.3,1) .1s forwards}
@keyframes pm-draw{to{stroke-dashoffset:0}}
.pm-fill-in{opacity:0;animation:pm-fade .9s ease-out .5s forwards}
@keyframes pm-fade{to{opacity:1}}
.pm-arc{stroke-dasharray:900;stroke-dashoffset:900;animation:pm-arc-draw 1s cubic-bezier(.16,1,.3,1) forwards}
@keyframes pm-arc-draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion: reduce){
  .pm-poland-draw,.pm-arc{stroke-dashoffset:0;animation:none}
  .pm-fill-in{opacity:1;animation:none}
}
.pm-scroll{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent}
.pm-scroll::-webkit-scrollbar{width:9px}
.pm-scroll::-webkit-scrollbar-track{background:transparent}
.pm-scroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;border:3px solid #fff;background-clip:content-box}
.pm-scroll::-webkit-scrollbar-thumb:hover{background:#94a3b8;background-clip:content-box}
`;
