"use client"

import {
  Code2,
  FileSearch,
  FlaskConical,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeader } from "@/components/ui/section-header"
import { processSteps } from "@/data/portfolio"

const STEP_ICONS = [
  FileSearch,
  Target,
  FlaskConical,
  Code2,
  ShieldCheck,
  Rocket,
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          label="Process"
          titleId="process-title"
          title={["How I", "approach quality."]}
          aside={
            <p className="text-[16px] leading-relaxed">
              A structured 6-stage STLC framework from requirement discovery to release gates — ensuring repeatable reliability.
            </p>
          }
        />

        {/* Compact 3x2 Connected Grid */}
        <Reveal className="mt-12 sm:mt-16">
          <ol className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {processSteps.map((step, idx) => {
              const Icon = STEP_ICONS[idx]
              return (
                <li
                  key={step.title}
                  className="group relative overflow-hidden rounded-2xl border border-line/75 bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-card/90 hover:shadow-[0_12px_35px_-10px_rgba(255,107,53,0.18)]"
                >
                  {/* Subtle hover accent ambient glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-accent/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Header: Icon + Stage Indicator */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg-2 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                        <Icon className="size-4" strokeWidth={1.8} aria-hidden />
                      </span>
                    </div>

                    {idx === processSteps.length - 1 ? (
                      <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[9.5px] font-semibold text-success">
                        Release Gate
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-muted/40 transition-colors group-hover:text-accent/60">
                        Active Stage
                      </span>
                    )}
                  </div>

                  {/* Content: Title & Concise Description */}
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-fg transition-colors group-hover:text-accent">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-fg-2">
                      {step.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
