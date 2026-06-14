import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const TEAL = "var(--color-teal)";

type P = SVGProps<SVGSVGElement>;

/* ---------- UI icons ---------- */
export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" stroke={TEAL} />
  </svg>
);
export const MapPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" stroke={TEAL} />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4 12 5 5L20 6" />
  </svg>
);
export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
/* ---------- Step icons ---------- */
export const StepGrid = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 18h16" />
    <circle cx="7.5" cy="9" r="1.4" />
    <circle cx="12" cy="9" r="1.4" stroke={TEAL} />
    <circle cx="16.5" cy="9" r="1.4" />
    <path d="M7.5 10.4V18M12 10.4V18M16.5 10.4V18" />
  </svg>
);
export const StepLevel = (p: P) => (
  <svg {...base} {...p}>
    <rect x="7" y="10" width="10" height="6" rx="1" />
    <path d="M4 19h16" />
    <path d="M12 3v5" stroke={TEAL} />
    <path d="m9.5 5.5 2.5-2.5 2.5 2.5" stroke={TEAL} />
  </svg>
);
export const StepLoad = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v8" stroke={TEAL} />
    <path d="m8.5 7.5 3.5 3.5 3.5-3.5" stroke={TEAL} />
    <rect x="6" y="13" width="12" height="7" rx="1" />
    <path d="M4 13h16" />
  </svg>
);
export const StepCheck = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8 12 2.6 2.6L16 9" stroke={TEAL} />
  </svg>
);

export const stepIcons: Record<string, (p: P) => React.ReactNode> = {
  grid: StepGrid,
  level: StepLevel,
  load: StepLoad,
  check: StepCheck,
};
