"use client"

import { Check, TriangleAlert } from "lucide-react"
import { motion } from "motion/react"

import { EASE_OUT, viewportOnce } from "@/lib/animations"

import { BrowserFrame } from "./BrowserFrame"

const REGIONS = [
  { r: "Region 1", v: 82 },
  { r: "Region 2", v: 64 },
  { r: "Region 3", v: 91 },
  { r: "Region 4", v: 47 },
]

const ROWS = [
  { s: "Sector A", ok: true },
  { s: "Sector B", ok: true },
  { s: "Sector C", ok: false },
  { s: "Sector D", ok: true },
]

export function AnalyticsVisual() {
  return (
    <BrowserFrame url="admin.reporting / sector-data">
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="col-span-2 rounded-lg border border-line bg-card p-2.5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] tracking-wider text-muted uppercase">Reporting trend</p>
            <span className="flex gap-1.5 font-mono text-[9px]">
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">Web portal</span>
              <span className="rounded border border-line px-1.5 py-0.5 text-muted">Admin</span>
            </span>
          </div>
          <svg viewBox="0 0 300 70" className="mt-2 h-16 w-full" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FF6B35" stopOpacity="0.35" />
                <stop offset="1" stopColor="#FF6B35" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[17, 35, 53].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
            ))}
            <motion.path
              d="M0 55 C30 50 45 30 75 34 S120 52 150 40 S200 12 230 20 S275 30 300 10 L300 70 L0 70 Z"
              fill="url(#area)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 1, duration: 0.8 }}
            />
            <motion.path
              d="M0 55 C30 50 45 30 75 34 S120 52 150 40 S200 12 230 20 S275 30 300 10"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 1.6, ease: EASE_OUT }}
            />
          </svg>
        </div>

        <div className="rounded-lg border border-line bg-card p-2.5">
          <p className="font-mono text-[9px] tracking-wider text-muted uppercase">Multi-region</p>
          <ul className="mt-2 space-y-2">
            {REGIONS.map((r, i) => (
              <li key={r.r} className="space-y-1">
                <p className="flex justify-between font-mono text-[9px] text-fg-2">
                  <span>{r.r}</span>
                  <span>{r.v}</span>
                </p>
                <div className="h-1 rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full origin-left rounded-full bg-fg-2/60"
                    style={{ width: `${r.v}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.9, ease: EASE_OUT }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-card p-2.5">
          <p className="font-mono text-[9px] tracking-wider text-muted uppercase">Data integrity</p>
          <ul className="mt-2 space-y-1.5">
            {ROWS.map((r, i) => (
              <motion.li
                key={r.s}
                className="flex items-center justify-between rounded border border-line bg-white/[0.02] px-2 py-1 font-mono text-[9.5px]"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              >
                <span className="text-fg-2">{r.s}</span>
                {r.ok ? (
                  <span className="flex items-center gap-1 text-success">
                    <Check className="size-2.5" strokeWidth={3} aria-hidden />
                    OK
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-warning">
                    <TriangleAlert className="size-2.5" aria-hidden />
                    FLAG
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </BrowserFrame>
  )
}
