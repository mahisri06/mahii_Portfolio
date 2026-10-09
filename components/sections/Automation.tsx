"use client"

import { Check, Clock, Hourglass, Repeat, User } from "lucide-react"
import { motion } from "motion/react"

import { BorderBeam } from "@/components/ui/border-beam"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal"
import { SectionHeader } from "@/components/ui/section-header"
import { automation } from "@/data/portfolio"
import { EASE_OUT, viewportOnce } from "@/lib/animations"

const MANUAL_ICONS = [Repeat, Clock, User, Hourglass]

function FlowConnector() {
  return (
    <div aria-hidden className="relative flex items-center justify-center py-2 lg:py-0">
      {/* horizontal on desktop */}
      <svg viewBox="0 0 120 20" className="hidden h-5 w-28 lg:block xl:w-36">
        <line x1="0" y1="10" x2="112" y2="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="0" y1="10" x2="112" y2="10" stroke="#FF6B35" strokeWidth="1.5" className="dash-flow" />
        <path d="M108 4 L116 10 L108 16" fill="none" stroke="#FF6B35" strokeWidth="1.5" />
      </svg>
      {/* vertical on mobile/tablet */}
      <svg viewBox="0 0 20 70" className="h-16 w-5 lg:hidden">
        <line x1="10" y1="0" x2="10" y2="62" stroke="#FF6B35" strokeWidth="1.5" className="dash-flow" />
        <path d="M4 58 L10 66 L16 58" fill="none" stroke="#FF6B35" strokeWidth="1.5" />
      </svg>
      <motion.span
        className="absolute hidden size-2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(255,107,53,0.7)] lg:block"
        animate={{ x: [-52, 52], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
      />
    </div>
  )
}

export function Automation() {
  return (
    <section id="automation" aria-labelledby="automation-title" className="relative overflow-hidden bg-ink-2/60 py-28 lg:py-40">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeader
          label="Automation"
          titleId="automation-title"
          title={["From manual", <span key="b" className="text-accent-gradient">to automated.</span>]}
          aside={<p className="text-[17px] leading-relaxed">Turning repetitive regression into reusable suites — so humans test what matters and machines handle the rest.</p>}
        />

        <div className="mt-16 grid items-stretch gap-4 lg:mt-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Reveal className="rounded-3xl border border-line bg-card/60 p-6 sm:p-8">
            <p className="label-mono flex items-center gap-2 text-muted">
              <span className="size-1.5 rounded-full bg-muted" aria-hidden /> Before
            </p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-fg-2 uppercase sm:text-3xl">Manual regression</h3>
            <RevealGroup as="ul" className="mt-8 space-y-3" gap={0.08}>
              {automation.manual.map((m, i) => {
                const Icon = MANUAL_ICONS[i]
                return (
                  <RevealItem as="li" key={m} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-fg-2">
                    <Icon className="size-4 text-muted" strokeWidth={1.75} aria-hidden />
                    {m}
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </Reveal>

          <FlowConnector />

          <Reveal className="relative overflow-hidden rounded-3xl border border-accent/25 bg-[linear-gradient(160deg,rgba(255,107,53,0.10),rgba(17,23,34,0.9)_45%)] p-6 sm:p-8">
            <p className="label-mono flex items-center gap-2 text-accent">
              <span className="pulse-dot" aria-hidden /> After
            </p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">Automated regression</h3>
            <RevealGroup as="ul" className="mt-8 space-y-3" gap={0.08} delay={0.3}>
              {automation.automated.map((m) => (
                <RevealItem as="li" key={m} className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 font-semibold text-fg">
                  <span className="grid size-5 place-items-center rounded-full bg-success/15 text-success">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {m}
                </RevealItem>
              ))}
            </RevealGroup>
            <BorderBeam size={160} duration={8} colorFrom="#FF6B35" colorTo="#FF9A70" />
          </Reveal>
        </div>

        <div className="mt-20 grid items-end gap-8 border-t border-line pt-12 lg:mt-28 lg:grid-cols-12">
          <p className="text-[clamp(6.5rem,24vw,17rem)] leading-[0.8] font-extrabold tracking-[-0.07em] lg:col-span-7">
            <span className="text-accent-gradient">
              <NumberTicker value={automation.reduction} />
            </span>
            <span className="text-accent-light">%</span>
          </p>
          <div className="lg:col-span-5 lg:pb-6">
            <p className="text-2xl leading-tight font-extrabold tracking-tight uppercase sm:text-3xl">Reduction in manual regression effort</p>
            <div className="mt-8 space-y-4 font-mono text-xs text-fg-2" aria-hidden>
              <div>
                <p className="mb-2 flex justify-between">
                  <span>Manual effort · before</span>
                  <span>100%</span>
                </p>
                <div className="h-2 rounded-full bg-white/15" />
              </div>
              <div>
                <p className="mb-2 flex justify-between">
                  <span className="text-fg">With automated suites</span>
                  <span className="text-accent">~50%</span>
                </p>
                <div className="h-2 rounded-full bg-white/[0.05]">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-accent to-accent-light"
                    initial={{ width: "100%" }}
                    whileInView={{ width: "50%" }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.8, delay: 0.3, ease: EASE_OUT }}
                  />
                </div>
              </div>
            </div>
            <p className="label-mono mt-6 text-muted">Omniva Telehealth Platform · Selenium + Playwright</p>
          </div>
        </div>
      </div>
    </section>
  )
}
