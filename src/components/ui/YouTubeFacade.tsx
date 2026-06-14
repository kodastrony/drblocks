"use client";

import { useState } from "react";
import Image from "next/image";

export function YouTubeFacade({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  poster: string;
}) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <div className="relative aspect-video bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&playsinline=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-ink"
      aria-label={`Odtwórz film: ${title}`}
    >
      <Image
        src={poster}
        alt=""
        aria-hidden
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="scale-[1.02] object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-navy/15 transition-colors duration-300 group-hover:bg-navy/5" />
      <span className="absolute left-1/2 top-1/2 flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[var(--shadow-lift)] transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-navy">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
