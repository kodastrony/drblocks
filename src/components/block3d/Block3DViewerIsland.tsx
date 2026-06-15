"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";

const BlockViewer = dynamic(() => import("@/components/block3d/BlockViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] w-full items-center justify-center rounded-2xl border border-white/10 bg-[#141d28] text-sm text-white/60 sm:h-[460px]">
      Ładowanie modelu 3D…
    </div>
  ),
});

export function Block3DViewerIsland() {
  const [show, setShow] = useState(false);

  if (show) return <BlockViewer />;

  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className="group relative block h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2a38] to-[#11171f] sm:h-[460px]"
      aria-label="Załaduj interaktywny model 3D bloczka"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
      <Image
        src={asset("/assets/STANDARD-983x1024-1.webp")}
        alt="Regulowany bloczek fundamentowy DrBlocks Standard Block"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 font-oswald text-[10px] font-semibold uppercase tracking-wider text-white">
        Model 3D
      </span>
      <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-navy shadow-[var(--shadow-lift)] transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-navy" strokeWidth={2}>
          <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Obejrzyj w 3D
      </span>
    </button>
  );
}
