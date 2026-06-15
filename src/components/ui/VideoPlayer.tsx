"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function VolumeOnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
function VolumeOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
      <path d="m17 9 5 5M22 9l-5 5" />
    </svg>
  );
}

export function VideoPlayer({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  // user explicitly paused -> don't auto-resume on scroll
  const userPaused = useRef(false);

  // The <video> carries native `autoPlay muted playsInline` (the reliable
  // muted-autoplay pattern). We only intervene for reduced-motion users: pause
  // and surface the poster + play button instead of looping motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      userPaused.current = true;
      v.pause();
    } else {
      v.muted = true;
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [reduce]);

  // Pause when scrolled out of view; resume when back (only if user didn't pause).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    // unmuting should also resume playback
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  return (
    <div className={`group/vid relative overflow-hidden bg-ink ${className}`}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={asset(poster)}
        preload="metadata"
        autoPlay
        playsInline
        loop
        muted
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setReady(true)}
        aria-label={label ?? "Film DrBlocks"}
      >
        <source src={asset(src)} type="video/mp4" />
      </video>

      {/* soft gradient for control legibility */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-300 group-hover/vid:opacity-100"
        aria-hidden
      />

      {/* center play/pause — visible while paused or on hover */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Wstrzymaj film" : "Odtwórz film"}
        className={`absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-[var(--shadow-lift)] backdrop-blur transition-all duration-300 hover:scale-110 ${
          playing ? "scale-90 opacity-0 group-hover/vid:opacity-100" : "scale-100 opacity-100"
        }`}
      >
        {playing ? <PauseIcon className="size-6" /> : <PlayIcon className="ml-0.5 size-7" />}
      </button>

      {/* label chip */}
      {label && ready && (
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-ink/55 px-3 py-1.5 backdrop-blur-sm">
          <span className="size-2 animate-pulse rounded-full bg-magenta" />
          <span className="font-oswald text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
            {label}
          </span>
        </div>
      )}

      {/* mute / unmute */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Włącz dźwięk" : "Wycisz"}
        aria-pressed={!muted}
        className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-ink/55 text-white backdrop-blur-sm transition-colors hover:bg-ink/80"
      >
        {muted ? <VolumeOffIcon className="size-5" /> : <VolumeOnIcon className="size-5" />}
      </button>
    </div>
  );
}
