"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { hero } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-teal-50 blur-3xl"
        aria-hidden
      />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-24">
        <div>
          <motion.div {...rise(0)}>
            <SectionLabel>{hero.eyebrow}</SectionLabel>
          </motion.div>
          <motion.h1
            {...rise(0.08)}
            className="mt-6 text-balance text-[2.6rem] leading-[1.04] tracking-tight sm:text-6xl"
          >
            {hero.title}
            <span className="mt-1 block text-teal-700">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-steel"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} variant="primary" size="lg" arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.dl {...rise(0.34)} className="mt-12 grid max-w-xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-3">
            {hero.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-teal/60 pl-3">
                <dt className="font-oswald text-xl font-bold tabular text-navy sm:text-2xl">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-mute">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-line bg-navy shadow-[var(--shadow-lift)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 animate-pulse rounded-full bg-magenta" />
                <span className="font-oswald text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  DrBlocks – trzyma poziom
                </span>
              </div>
              <span className="font-oswald text-sm font-bold tracking-tight text-white">
                Dr<span className="text-teal">·</span>BLOCKS
              </span>
            </div>
            <VideoPlayer
              src="/assets/drblocks-film.mp4"
              poster="/assets/video-poster.jpg"
              className="aspect-[1230/784]"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-line bg-white px-4 py-3 shadow-[var(--shadow-card)] sm:block">
            <p className="font-oswald text-xs font-semibold uppercase tracking-wider text-teal-700">
              Beton B30 · Stal · Regulacja
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
