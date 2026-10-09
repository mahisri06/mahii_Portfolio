"use client"

import { Check, ShieldCheck, Video } from "lucide-react"
import { motion } from "motion/react"

import { EASE_OUT, viewportOnce } from "@/lib/animations"

import { Bar, BrowserFrame } from "./BrowserFrame"

const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]

export function TelehealthVisual() {
  return (
    <BrowserFrame url="portal.telehealth / appointments">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="relative flex-1 overflow-hidden rounded-lg border border-line bg-[radial-gradient(120%_100%_at_30%_20%,rgba(255,154,112,0.18),rgba(13,17,26,1)_60%)] p-3">
            <span className="flex w-fit items-center gap-1.5 rounded-full bg-ink/70 px-2 py-1 font-mono text-[9px] text-fg">
              <span className="pulse-dot !size-1.5 text-accent" aria-hidden />
              TELEHEALTH · LIVE
            </span>
            <div className="absolute inset-0 grid place-items-center" aria-hidden>
              <div className="grid size-14 place-items-center rounded-full border border-white/15 bg-white/5">
                <Video className="size-5 text-fg-2" />
              </div>
            </div>
            <div className="absolute right-2.5 bottom-2.5 h-10 w-14 rounded-md border border-white/10 bg-ink/70" aria-hidden />
          </div>
          <div className="rounded-lg border border-line bg-card p-2.5">
            <p className="font-mono text-[9px] tracking-wider text-muted uppercase">Appointments</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {SLOTS.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: EASE_OUT }}
                  className={`rounded px-1.5 py-1 text-center font-mono text-[9.5px] ${
                    i === 2 ? "bg-accent text-ink" : i === 4 ? "border border-line text-muted line-through" : "border border-line text-fg-2"
                  }`}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3">
          <div className="rounded-lg border border-line bg-card p-2.5">
            <p className="font-mono text-[9px] tracking-wider text-muted uppercase">Patient record</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="size-6 rounded-full bg-white/10" aria-hidden />
              <div className="flex-1 space-y-1">
                <Bar w="80%" />
                <Bar w="50%" className="bg-white/[0.06]" />
              </div>
            </div>
            <div className="mt-2.5 space-y-1.5">
              <Bar w="100%" className="bg-white/[0.06]" />
              <Bar w="70%" className="bg-white/[0.06]" />
            </div>
          </div>

          <div className="rounded-lg border border-line bg-card p-2.5">
            <p className="font-mono text-[9px] tracking-wider text-muted uppercase">API status</p>
            <div className="mt-1.5 space-y-1 font-mono text-[9.5px]">
              {["/appointments", "/records", "/sessions"].map((e, i) => (
                <motion.p
                  key={e}
                  className="flex justify-between gap-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  <span className="truncate text-fg-2">GET {e}</span>
                  <span className="text-success">200</span>
                </motion.p>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-lg border border-success/20 bg-success/[0.06] p-2.5">
            <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-success uppercase">
              <ShieldCheck className="size-3" aria-hidden /> Compliance
            </p>
            <ul className="mt-1.5 space-y-1">
              {["EHR", "EMR", "Audit"].map((c) => (
                <li key={c} className="flex items-center gap-1.5 font-mono text-[9.5px] text-fg-2">
                  <Check className="size-2.5 text-success" strokeWidth={3} aria-hidden /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
