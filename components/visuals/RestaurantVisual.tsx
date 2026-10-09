"use client"

import { Clock, MapPin, Store } from "lucide-react"
import { motion } from "motion/react"

import { EASE_OUT, viewportOnce } from "@/lib/animations"

import { Bar, BrowserFrame } from "./BrowserFrame"

const ORDERS = [
  { id: "#A-1042", type: "Pickup", outlet: "Outlet A", state: "Ready", tone: "text-success border-success/30 bg-success/10" },
  { id: "#A-1043", type: "Delivery", outlet: "Outlet C", state: "In progress", tone: "text-accent border-accent/30 bg-accent/10" },
  { id: "#A-1044", type: "Curbside", outlet: "Outlet B", state: "Scheduled", tone: "text-fg-2 border-line bg-white/5" },
]

const HOURS = [62, 78, 54, 88, 70, 92, 66]

export function RestaurantVisual() {
  return (
    <BrowserFrame url="app.ordering-platform / orders">
      <div className="grid h-full grid-cols-[auto_1fr] gap-3">
        <div className="flex flex-col gap-2.5 rounded-lg border border-line bg-white/[0.02] p-2" aria-hidden>
          {[Store, Clock, MapPin].map((I, i) => (
            <span key={i} className={`grid size-7 place-items-center rounded-md ${i === 0 ? "bg-accent/15 text-accent" : "text-muted"}`}>
              <I className="size-3.5" />
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Orders", "Live"],
              ["Locations", "Multi"],
              ["Availability", "Synced"],
            ].map(([k, v], i) => (
              <motion.div
                key={k}
                className="rounded-lg border border-line bg-card p-2.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: EASE_OUT }}
              >
                <p className="font-mono text-[9px] tracking-wider text-muted uppercase">{k}</p>
                <p className="mt-1 text-sm font-bold text-fg sm:text-base">{v}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-1.5">
            {["Pickup", "Delivery", "Curbside"].map((t, i) => (
              <span
                key={t}
                className={`rounded-md px-2 py-1 font-mono text-[9.5px] ${i === 0 ? "bg-accent text-ink" : "border border-line text-fg-2"}`}
              >
                {t}
              </span>
            ))}
          </div>

          <ul className="space-y-1.5">
            {ORDERS.map((o, i) => (
              <motion.li
                key={o.id}
                className="flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-2.5 py-1.5"
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: EASE_OUT }}
              >
                <span className="font-mono text-[10px] text-fg">{o.id}</span>
                <span className="hidden font-mono text-[10px] text-muted sm:inline">{o.type}</span>
                <span className="truncate font-mono text-[10px] text-muted">{o.outlet}</span>
                <span className={`ml-auto rounded border px-1.5 py-0.5 font-mono text-[9px] ${o.tone}`}>{o.state}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto rounded-lg border border-line bg-card p-2.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] tracking-wider text-muted uppercase">Fulfillment hours</p>
              <Bar w="30px" />
            </div>
            <div className="mt-2 flex h-9 items-end gap-1.5">
              {HOURS.map((h, i) => (
                <motion.span
                  key={i}
                  className={`flex-1 origin-bottom rounded-sm ${i === 5 ? "bg-accent" : "bg-white/15"}`}
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.7 + i * 0.05, duration: 0.8, ease: EASE_OUT }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
