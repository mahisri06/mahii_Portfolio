"use client"

import { motion } from "motion/react"

import { RevealGroup, RevealItem } from "@/components/ui/reveal"
import { SectionHeader } from "@/components/ui/section-header"
import { learning } from "@/data/portfolio"

type Kind = (typeof learning.items)[number]["kind"]

/** Small looping motif per card — restrained, CSS/transform only. */
function Motif({ kind }: { kind: Kind }) {
  if (kind === "pipeline") {
    return (
      <div className="flex items-center gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex items-center gap-1.5">
            <motion.span
              className="size-2.5 rounded-full border border-accent/50"
              animate={{ backgroundColor: ["rgba(255,107,53,0)", "rgba(255,107,53,0.9)", "rgba(255,107,53,0)"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45 }}
            />
            {i < 3 && <span className="h-px w-4 bg-white/15" />}
          </span>
        ))}
      </div>
    )
  }
  if (kind === "workflow") {
    return (
      <div className="flex items-center gap-2" aria-hidden>
        <motion.span
          className="size-4 rounded-full border-2 border-accent/25 border-t-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <span className="font-mono text-[10px] text-muted">on: push</span>
      </div>
    )
  }
  if (kind === "security") {
    return (
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="relative flex size-3.5 items-center justify-center">
          <motion.span
            className="absolute size-3.5 rounded-full border border-accent/60"
            animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.9, 0.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="size-1.5 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[10px] text-muted">scan</span>
      </div>
    )
  }
  if (kind === "shield") {
    return (
      <svg viewBox="0 0 16 16" className="size-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <motion.path
          d="M8 1.5 L13 3.5 V7.5 C13 11 8 14 8 14 C8 14 3 11 3 7.5 V3.5 Z"
          animate={{ pathLength: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    )
  }
  if (kind === "load") {
    return (
      <div className="flex h-4 items-end gap-[3px]" aria-hidden>
        {[30, 55, 40, 75, 60, 90, 70].map((h, i) => (
          <motion.span
            key={i}
            className="w-1 origin-bottom rounded-sm bg-accent/70"
            style={{ height: `${h}%` }}
            animate={{ scaleY: [0.6, 1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    )
  }
  return (
    <svg viewBox="0 0 60 16" className="h-4 w-16" aria-hidden>
      <motion.path
        d="M0 12 L10 10 L20 13 L30 6 L40 8 L50 3 L60 5"
        fill="none"
        stroke="#FF9A70"
        strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8 }}
      />
    </svg>
  )
}

export function Learning() {
  return (
    <section id="learning" aria-labelledby="learning-title" className="relative py-14 sm:py-18 lg:py-22">
      <div className="container-x">
        <SectionHeader
          label="Always learning"
          titleId="learning-title"
          title={["The toolset", "keeps evolving."]}
          aside={<p className="text-[17px] leading-relaxed">{learning.text}</p>}
        />

        <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" gap={0.08}>
          {learning.items.map((item) => (
            <RevealItem key={item.name}>
              <div className="group h-full rounded-2xl border border-dashed border-white/12 bg-card/50 p-5 transition-colors duration-500 hover:border-accent/40 hover:bg-card">
                <div className="flex items-center justify-between">
                  <span className="label-mono !text-[10px] text-muted">{item.area}</span>
                  <span className="label-mono rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 !text-[9px] text-warning">Learning</span>
                </div>
                <p className="mt-8 font-mono text-[13px] leading-tight font-semibold tracking-[0.1em] text-fg-2 uppercase">
                  {item.status[0]}
                  <br />
                  <span className="text-accent-light">{item.status[1]}</span>
                </p>
                <div className="mt-6 flex items-end justify-between gap-3 border-t border-line pt-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <Motif kind={item.kind} />
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
