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

      <Container className="relative py-14 lg:py-20">
        {/* 1 — headline + CTAs, centered above the film */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...rise(0)} className="flex justify-center">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
          </motion.div>
          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-balance text-[2.4rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {hero.title}
            <span className="mt-1 block text-teal-700">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            {...rise(0.16)}
            className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-steel"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={hero.primaryCta.href} variant="primary" size="lg" arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        {/* 2 — the film: the centerpiece. Video fills the frame edge-to-edge. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto mt-12 max-w-[1120px]"
        >
          {/* ring-inset instead of border: the edge line sits ON the video (no
              1px content inset, no rounded-corner background bleed) so the film
              fills the frame exactly. */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-strong">
            <VideoPlayer
              src="/assets/drblocks-film-clean.mp4"
              poster="/assets/drblocks-film-poster.jpg"
              label="Film produktowy DrBlocks – regulowany bloczek fundamentowy"
              className="aspect-[1230/684]"
            />
          </div>
          {/* subtle caption under the film */}
          <p className="mt-3 text-center text-xs font-medium tracking-wide text-faint">
            Beton B30 · Stal · Regulacja wysokości
          </p>
        </motion.div>

        {/* 3 — stats, joined under the film */}
        <motion.dl
          {...rise(0.34)}
          className="mx-auto mt-10 grid max-w-[1120px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="bg-paper px-5 py-4 text-center sm:text-left">
              <dt className="font-oswald text-2xl font-bold tabular text-navy sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-mute">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
