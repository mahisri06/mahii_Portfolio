"use client"

import { motion } from "motion/react"

import { Reveal, RevealGroup, RevealItem, RevealLines } from "@/components/ui/reveal"
import { SectionLabel } from "@/components/ui/section-header"
import { about } from "@/data/portfolio"
import { EASE_OUT, viewportOnce } from "@/lib/animations"
import type { ResolvedImage } from "@/lib/images"

function EnginePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
      className="glass w-full rounded-3xl border border-line bg-card/70 p-6 sm:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <span className="label-mono font-bold text-fg text-sm">QA Engineering Profile</span>
          <p className="text-[11px] font-mono text-muted mt-0.5">Discipline &amp; Quality Principles</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-[10px] font-semibold text-success">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          Active · Open for Roles
        </span>
      </div>

      <dl className="mt-6 space-y-4">
        {/* Facts List */}
        {about.facts.map((fact) => (
          <div key={fact.k} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-line/40 pb-2.5">
            <dt className="font-mono text-xs text-muted uppercase tracking-wider">{fact.k}</dt>
            <dd className="font-mono text-xs font-semibold text-fg sm:text-right">{fact.v}</dd>
          </div>
        ))}

        {/* Focus Capabilities */}
        <div className="pt-1">
          <dt className="font-mono text-xs text-muted uppercase tracking-wider mb-2">Focus Capabilities</dt>
          <dd className="flex flex-wrap gap-2">
            {about.engine.focus.map((f) => (
              <span key={f} className="rounded-xl border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold text-accent-light">
                {f}
              </span>
            ))}
          </dd>
        </div>

        {/* Industry Domains */}
        <div className="pt-1">
          <dt className="font-mono text-xs text-muted uppercase tracking-wider mb-2">Verified Industry Domains</dt>
          <dd className="flex flex-wrap gap-2">
            {about.engine.domains.map((d) => (
              <span key={d} className="rounded-xl border border-line bg-ink-2/60 px-2.5 py-1 font-mono text-xs font-medium text-fg-2">
                {d}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </motion.div>
  )
}

export function About({ image }: { image?: ResolvedImage } = {}) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-14 sm:py-18 lg:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left — editorial narrative & QA philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <SectionLabel label="Behind the quality" />
            <RevealLines
              id="about-title"
              lines={about.heading}
              className="display mt-4 text-[clamp(1.85rem,3.8vw,3.2rem)] font-extrabold tracking-tight"
              lineClassName={(i) => (i === 1 ? "text-fg-2" : undefined)}
            />
            <Reveal className="mt-4 font-mono text-base sm:text-lg text-accent-light">
              {"// "}
              {about.kicker}
            </Reveal>

            {/* Technical QA introduction paragraphs */}
            <RevealGroup className="mt-8 space-y-5 text-[15px] sm:text-[15.5px] leading-relaxed text-fg-2" gap={0.1}>
              <RevealItem>
                <p className="text-lg sm:text-xl leading-relaxed font-semibold text-fg">
                  {about.paragraphs[0]}
                </p>
              </RevealItem>
              {about.paragraphs.slice(1).map((p) => (
                <RevealItem key={p}>
                  <p>{p}</p>
                </RevealItem>
              ))}
              <RevealItem>
                <div className="relative mt-2 rounded-2xl border-l-4 border-accent bg-card/60 p-5 border border-line backdrop-blur-md">
                  <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-fg">
                    {about.highlight}
                    <span className="text-accent">.</span>
                  </p>
                  <span className="mt-2 block font-mono text-xs font-normal tracking-[0.16em] text-muted uppercase">
                    Shift-Left QA → Automated Gates → Zero Defect Release
                  </span>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Right — aligned QA Engineering Profile Card */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28">
            <EnginePanel />
          </div>
        </div>
      </div>
    </section>
  )
}
