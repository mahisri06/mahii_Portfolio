"use client"

import { Activity, Sparkles } from "lucide-react"
import { motion } from "motion/react"

import { AnalyticsVisual } from "@/components/visuals/AnalyticsVisual"
import { RestaurantVisual } from "@/components/visuals/RestaurantVisual"
import { TelehealthVisual } from "@/components/visuals/TelehealthVisual"
import type { Project } from "@/data/portfolio"

const VISUALS = {
  restaurant: RestaurantVisual,
  telehealth: TelehealthVisual,
  analytics: AnalyticsVisual,
}

export function CaseStudyVisualFrame({
  visual,
  title,
}: {
  visual: Project["visual"]
  title: string
}) {
  const VisualComponent = VISUALS[visual]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line/80 bg-section/90 p-3 sm:p-6 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
      {/* Background ambient radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_65%_at_75%_10%,rgba(255,107,53,0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 size-72 rounded-full bg-accent-light/10 blur-3xl"
      />

      {/* Frame Top Bar */}
      <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line/50 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-success">
            <span className="pulse-dot size-1.5 bg-success" aria-hidden />
            Interactive QA Simulation
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-muted">
            <Activity className="size-3 text-accent" />
            Tested &amp; Validated
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="label-mono flex items-center gap-1.5 rounded-full border border-glass-line bg-ink/70 px-2.5 py-1 !text-[10px] text-fg-2 backdrop-blur">
            <Sparkles className="size-3 text-accent" />
            {visual === "restaurant" && "Multi-Outlet SaaS Simulator"}
            {visual === "telehealth" && "EHR Consultation Session"}
            {visual === "analytics" && "Data Aggregation Engine"}
          </span>
        </div>
      </div>

      {/* Visual Component Render */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] min-[480px]:aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl"
      >
        <VisualComponent />
      </motion.div>

      {/* Caption footer */}
      <div className="relative mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-line/40 pt-3">
        <p className="font-mono text-[10.5px] text-muted">
          Abstract interactive product representation for <span className="text-fg font-medium">{title}</span>.
        </p>
        <p className="font-mono text-[10px] text-accent-light">
          Knovator Technologies Pvt. Ltd.
        </p>
      </div>
    </div>
  )
}
