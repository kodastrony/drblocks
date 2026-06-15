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

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

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

  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  // user explicitly paused -> don't auto-resume on scroll
  const userPaused = useRef(false);
  // active drag on the scrub bar -> don't let timeupdate fight it
  const scrubbing = useRef(false);
  // coalesce timeupdate bursts into one state write per frame
  const rafId = useRef<number | null>(null);

  // detect coarse pointer after mount (avoids hydration mismatch)
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // The <video> carries native `autoPlay muted playsInline` (the reliable
  // muted-autoplay pattern). We only intervene for reduced-motion users: pause
  // and surface the poster + controls instead of looping motion.
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

  // cancel any pending rAF on unmount
  useEffect(() => () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
  }, []);

  // Read duration robustly: `loadedmetadata` won't fire if metadata is already
  // cached at mount, so sync immediately and also on duration/metadata events.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const sync = () => {
      if (v.duration && isFinite(v.duration)) setDuration(v.duration);
    };
    sync();
    v.addEventListener("durationchange", sync);
    v.addEventListener("loadedmetadata", sync);
    return () => {
      v.removeEventListener("durationchange", sync);
      v.removeEventListener("loadedmetadata", sync);
    };
  }, []);

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

  const seekTo = (t: number) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const clamped = Math.min(duration, Math.max(0, t));
    v.currentTime = clamped;
    setCurrent(clamped); // live preview while dragging
  };

  // Clear the scrub flag on any pointer release, including cancel / lost
  // capture (touch gesture interruption) so the time display can't freeze.
  const endScrub = () => {
    scrubbing.current = false;
  };

  const onScrubKey = (e: React.KeyboardEvent) => {
    const big = e.shiftKey ? 10 : 5;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        seekTo(current - big);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        seekTo(current + big);
        break;
      case "Home":
        e.preventDefault();
        seekTo(0);
        break;
      case "End":
        e.preventDefault();
        seekTo(duration);
        break;
      case " ":
      case "Spacebar":
        e.preventDefault();
        togglePlay();
        break;
    }
  };

  const pct = (n: number) => (duration ? `${Math.min(100, (n / duration) * 100)}%` : "0%");
  // Controls pinned open while paused, on touch, or under reduced motion.
  const deckPinned = !playing || isTouch || !!reduce;

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
        onTimeUpdate={(e) => {
          if (scrubbing.current) return;
          const t = e.currentTarget.currentTime;
          if (rafId.current) return;
          rafId.current = requestAnimationFrame(() => {
            setCurrent(t);
            rafId.current = null;
          });
        }}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
        }}
        aria-label={label ?? "Film DrBlocks"}
      >
        <source src={asset(src)} type="video/mp4" />
      </video>

      {/* center play/pause — big affordance while paused, fades on hover when playing */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Wstrzymaj film" : "Odtwórz film"}
        // While playing it fades out; the control deck holds the canonical
        // play/pause, so drop this one from the tab order and a11y tree then.
        tabIndex={playing ? -1 : 0}
        aria-hidden={playing || undefined}
        className={`absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-[var(--shadow-lift)] backdrop-blur transition-all duration-300 hover:scale-110 sm:size-16 ${
          playing ? "scale-90 opacity-0 group-hover/vid:opacity-100" : "scale-100 opacity-100"
        }`}
      >
        {playing ? <PauseIcon className="size-5 sm:size-6" /> : <PlayIcon className="ml-0.5 size-6 sm:size-7" />}
      </button>

      {/* CONTROL DECK — play · time · mute, with the scrub track beneath */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent px-3 pb-3 pt-10 transition-opacity duration-200 ${
          deckPinned ? "opacity-100" : "opacity-0 group-hover/vid:opacity-100 group-focus-within/vid:opacity-100"
        }`}
      >
        <div className="mb-2 flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Wstrzymaj film" : "Odtwórz film"}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="ml-0.5 size-4" />}
          </button>

          <span className="font-oswald text-[13px] font-semibold tabular text-white/90">
            {fmt(current)} <span className="text-white/60">/ {fmt(duration)}</span>
          </span>

          <span className="flex-1" />

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Włącz dźwięk" : "Wycisz"}
            aria-pressed={!muted}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            {muted ? <VolumeOffIcon className="size-5" /> : <VolumeOnIcon className="size-5" />}
          </button>
        </div>

        {/* SCRUB TRACK — painted layers under a transparent native range */}
        <div className="group/scrub relative flex h-5 items-center">
          <div className="absolute inset-x-0 h-1 rounded-full bg-white/25" aria-hidden />
          <div
            className="absolute left-0 h-1 rounded-full bg-white/40"
            style={{ width: pct(buffered) }}
            aria-hidden
          />
          <div
            className="absolute left-0 h-1 rounded-full bg-teal"
            style={{ width: pct(current) }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute size-3.5 -translate-x-1/2 rounded-full bg-teal opacity-0 shadow ring-2 ring-white/80 transition-opacity group-hover/scrub:opacity-100 group-focus-within/vid:opacity-100"
            style={{ left: pct(current) }}
            aria-hidden
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.05}
            value={current}
            onChange={(e) => seekTo(+e.target.value)}
            onPointerDown={() => {
              scrubbing.current = true;
            }}
            onPointerUp={endScrub}
            onPointerCancel={endScrub}
            onLostPointerCapture={endScrub}
            onKeyDown={onScrubKey}
            aria-label="Przewijanie filmu"
            aria-valuetext={`${fmt(current)} z ${fmt(duration)}`}
            className="absolute inset-x-0 -my-5 h-10 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:size-10 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:size-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
