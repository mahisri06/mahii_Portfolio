"use client"

import { Check, TriangleAlert } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { BorderBeam } from "@/components/ui/border-beam"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeader } from "@/components/ui/section-header"
import { qaLab } from "@/data/portfolio"
import { EASE_OUT } from "@/lib/animations"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const ROW_START = 1.35 // seconds, after the command finishes typing
const ROW_GAP = 0.32

function useTyped(text: string, active: boolean, instant: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || instant) return
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) window.clearInterval(id)
    }, 26)
    return () => window.clearInterval(id)
  }, [active, instant, text])
  return instant ? text : text.slice(0, count)
}

function Tile({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col justify-between gap-4 bg-ink-2/80 p-4 sm:p-5", className)}>
      <p className="label-mono text-muted">{label}</p>
      {children}
    </div>
  )
}

function CoverageRing({ value, run }: { value: number; run: boolean }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid size-[88px] place-items-center">
      <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#cov)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={run ? { strokeDashoffset: c * (1 - value / 100) } : undefined}
          transition={{ duration: 1.8, delay: 0.6, ease: EASE_OUT }}
        />
        <defs>
          <linearGradient id="cov" x1="0" x2="1">
            <stop offset="0" stopColor="#FF9A70" />
            <stop offset="1" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-mono text-lg font-semibold text-fg">
        <NumberTicker value={value} delay={0.6} />%
      </span>
    </div>
  )
}

export function QALab() {
  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(panelRef, { once: true, margin: "0px 0px -20% 0px" })
  const reduce = usePrefersReducedMotion()
  const typed = useTyped(qaLab.command, inView, reduce)
  const total = qaLab.passed + qaLab.failed
  const passPct = (qaLab.passed / total) * 100
  const rowDelay = (i: number) => (reduce ? 0 : ROW_START + i * ROW_GAP)
  const doneAt = rowDelay(qaLab.rows.length)

  return (
    <section id="lab" aria-labelledby="lab-title" className="relative overflow-hidden py-14 sm:py-18 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[600px] max-w-5xl rounded-full bg-[radial-gradient(closest-side,rgba(255,107,53,0.1),transparent)] blur-3xl"
      />
      <div className="container-x">
        <SectionHeader
          label="QA lab"
          titleId="lab-title"
          title={["Where", "quality gets", "measured."]}
          aside={
            <p className="text-[17px] leading-relaxed">
              A look at how I think about a test run — suites, signals and the numbers that decide whether a build ships.
            </p>
          }
        />

        <Reveal className="mt-16 lg:mt-24">
          <div ref={panelRef} className="glass relative overflow-hidden rounded-3xl">
            {/* title bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-glass-line px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-4">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </span>
                <p className="font-mono text-xs text-fg-2">
                  qa-lab <span className="text-muted">/</span> <span className="text-fg">test-run {qaLab.runId}</span>
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ delay: doneAt }}
                className="label-mono flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-semibold text-success"
              >
                <span className="pulse-dot" aria-hidden /> Status: Passing
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              {/* execution log */}
              <div className="border-b border-glass-line p-4 sm:p-6 lg:border-r lg:border-b-0">
                <p className="font-mono text-[13px] text-fg-2" aria-label={`Command: ${qaLab.command}`}>
                  <span className="text-accent">❯</span> <span className="text-fg">{typed}</span>
                  <span aria-hidden className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-pulse bg-accent/80" />
                </p>

                <ol className="mt-6 space-y-1.5">
                  {qaLab.rows.map((row, i) => (
                    <motion.li
                      key={row.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : undefined}
                      transition={{ duration: 0.5, delay: rowDelay(i), ease: EASE_OUT }}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2.5 font-mono text-[13px] transition-colors hover:bg-white/[0.03]"
                    >
                      <span
                        className={cn(
                          "grid size-5 flex-none place-items-center rounded border",
                          row.status === "pass" ? "border-success/40 bg-success/10 text-success" : "border-warning/40 bg-warning/10 text-warning"
                        )}
                      >
                        {row.status === "pass" ? (
                          <Check className="size-3" strokeWidth={3} aria-hidden />
                        ) : (
                          <TriangleAlert className="size-3" strokeWidth={2.5} aria-hidden />
                        )}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-fg">{row.name}</span>
                      <span aria-hidden className="mx-1 hidden h-px flex-1 border-t border-dashed border-white/10 sm:block" />
                      <span className="ml-auto text-muted sm:ml-0 shrink-0 text-xs">{row.time}</span>
                      <span
                        className={cn(
                          "w-14 text-right text-[11px] font-semibold tracking-wider",
                          row.status === "pass" ? "text-success" : "text-warning"
                        )}
                      >
                        {row.status === "pass" ? "PASS" : "REVIEW"}
                      </span>
                    </motion.li>
                  ))}
                </ol>

                <div className="mt-6 border-t border-glass-line pt-5">
                  <div className="flex items-center justify-between font-mono text-xs text-fg-2">
                    <span>Suite progress</span>
                    <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ delay: doneAt }}>
                      {qaLab.rows.length}/{qaLab.rows.length} suites · 1 flagged for review
                    </motion.span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full origin-left rounded-full bg-linear-to-r from-accent-light to-accent"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : undefined}
                      transition={{ duration: reduce ? 0 : doneAt - ROW_START + 0.4, delay: reduce ? 0 : ROW_START, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>

              {/* metrics */}
              <div className="grid grid-cols-2 gap-px bg-glass-line">
                <Tile label="Tests" className="col-span-2">
                  <div className="flex items-end justify-between gap-4">
                    <p className="font-mono text-sm">
                      <span className="text-3xl font-semibold text-success">
                        <NumberTicker value={qaLab.passed} delay={0.4} />
                      </span>{" "}
                      <span className="text-fg-2">PASS</span>
                      <span className="mx-3 text-muted">/</span>
                      <span className="text-3xl font-semibold text-accent">{qaLab.failed}</span> <span className="text-fg-2">FAIL</span>
                    </p>
                  </div>
                  <div className="flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden>
                    <motion.span
                      className="h-full rounded-l-full bg-success"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${passPct}%` } : undefined}
                      transition={{ duration: 1.4, delay: 0.5, ease: EASE_OUT }}
                    />
                    <span className="h-full flex-1 rounded-r-full bg-accent" />
                  </div>
                </Tile>
                <Tile label="Coverage">
                  <CoverageRing value={qaLab.coverage} run={inView} />
                </Tile>
                <Tile label="Automation">
                  <p className="flex items-center gap-2 font-mono text-lg font-semibold text-accent">
                    <span className="pulse-dot" aria-hidden /> ACTIVE
                  </p>
                  <p className="font-mono text-[11px] text-muted">Selenium · Playwright</p>
                </Tile>
                <Tile label="API">
                  <p className="font-mono text-lg font-semibold text-success">
                    200 <span className="text-fg">OK</span>
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted">GET /v1/health</p>
                </Tile>
                <Tile label="Regression">
                  <p className="flex items-center gap-2 font-mono text-lg font-semibold text-fg">
                    <Check className="size-4 text-success" strokeWidth={3} aria-hidden /> COMPLETE
                  </p>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden>
                    <motion.div
                      className="h-full origin-left bg-success"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : undefined}
                      transition={{ duration: 1.6, delay: 0.8, ease: EASE_OUT }}
                    />
                  </div>
                </Tile>
              </div>
            </div>
            <BorderBeam size={220} duration={12} colorFrom="#FF6B35" colorTo="#FF9A70" />
          </div>
          <p className="label-mono mt-4 text-center text-muted">Illustrative test run · visualises the workflow, not a client report</p>
        </Reveal>
      </div>
    </section>
  )
}
