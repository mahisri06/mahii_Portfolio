"use client"

import { Award, CheckCircle2, ShieldCheck, Zap } from "lucide-react"
import { motion } from "motion/react"

import { Marquee } from "@/components/ui/marquee"
import { NumberTicker } from "@/components/ui/number-ticker"
import { stats, toolTicker } from "@/data/portfolio"
import { EASE_OUT, viewportOnce } from "@/lib/animations"
import { cn } from "@/lib/utils"

const STAT_ICONS = [Award, CheckCircle2, ShieldCheck, Zap]

export function Stats() {
  return (
    <section aria-label="Key metrics" className="relative mt-4">
      <div className="container-x">
        {/* Streamlined metrics strip evenly aligned */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2/80 shadow-[0_14px_44px_-16px_rgba(0,0,0,0.85)] backdrop-blur-xl"
        >
          {/* Subtle top edge glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/35 to-transparent"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length]
              return (
                <div
                  key={s.label}
                  className={cn(
                    "flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3.5 px-3 py-4 sm:px-6 sm:py-5",
                    i % 2 === 1 && "border-l border-white/[0.08]",
                    i >= 2 && "border-t border-white/[0.08] lg:border-t-0",
                    i === 2 && "lg:border-l"
                  )}
                >
                  <span className="grid size-8 sm:size-9 flex-none place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                    <Icon className="size-3.5 sm:size-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline font-mono text-base sm:text-xl font-bold leading-tight tracking-tight text-fg">
                      <NumberTicker value={s.value} delay={0.15 + i * 0.08} />
                      <span className="ml-0.5 text-xs font-semibold text-accent">{s.suffix}</span>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.08em] sm:tracking-[0.12em] text-muted uppercase leading-tight mt-0.5">
                      {s.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Tool Ticker: Restored to original full-width implementation */}
      <div className="fade-mask-x mt-4 py-4" aria-label="Core tools">
        <Marquee pauseOnHover className="[--duration:46s] [--gap:2.5rem]">
          {toolTicker.map((t) => (
            <span key={t} className="label-mono flex items-center gap-10 whitespace-nowrap text-fg-2">
              {t}
              <span aria-hidden className="text-accent">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
