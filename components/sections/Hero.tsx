"use client"

import { Check } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react"
import type { CSSProperties, PointerEvent } from "react"

import { BorderBeam } from "@/components/ui/border-beam"
import { Cta } from "@/components/ui/cta"
import { RevealLines } from "@/components/ui/reveal"
import { SmartImage } from "@/components/ui/smart-image"
import { hero, profile } from "@/data/portfolio"
import { EASE_OUT } from "@/lib/animations"
import type { ResolvedImage } from "@/lib/images"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const PARTICLES = [
  { left: "8%", top: "70%", dur: "13s", delay: "0s", x: "18px" },
  { left: "22%", top: "88%", dur: "16s", delay: "3s", x: "-12px" },
  { left: "38%", top: "62%", dur: "11s", delay: "6s", x: "24px" },
  { left: "55%", top: "80%", dur: "15s", delay: "1.5s", x: "-20px" },
  { left: "68%", top: "58%", dur: "12s", delay: "4.5s", x: "14px" },
  { left: "82%", top: "76%", dur: "17s", delay: "2s", x: "-16px" },
  { left: "92%", top: "64%", dur: "14s", delay: "7s", x: "10px" },
]

const CARD_LAYOUT: Record<string, { pos: string; float: string; depth: number; mobile: boolean }> = {
  regression: { pos: "top-[7%] left-[-6%] sm:left-[-14%]", float: "6.5s", depth: 1.1, mobile: true },
  api: { pos: "top-[30%] right-[-5%] sm:right-[-12%]", float: "7.8s", depth: 1.6, mobile: false },
  coverage: { pos: "bottom-[24%] left-[-6%] sm:left-[-18%]", float: "5.6s", depth: 1.4, mobile: false },
  cases: { pos: "bottom-[-8%] right-[-4%] sm:right-[4%]", float: "8.6s", depth: 0.9, mobile: true },
}

function FloatingCard({
  card,
  index,
  mx,
  my,
}: {
  card: (typeof hero.floatingCards)[number]
  index: number
  mx: MotionValue<number>
  my: MotionValue<number>
}) {
  const layout = CARD_LAYOUT[card.id]
  const x = useTransform(mx, (v) => v * 26 * layout.depth)
  const y = useTransform(my, (v) => v * 26 * layout.depth)
  return (
    <motion.div
      className={cn("absolute z-20", layout.pos, !layout.mobile && "hidden lg:block")}
      style={{ x, y }}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.25 + index * 0.13, ease: EASE_OUT }}
    >
      <div className="animate-float" style={{ "--float-duration": layout.float } as CSSProperties}>
        {/* Near-opaque backing: these sit over a bright photo, so frosted glass alone washes the text out. */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-ink-2/90 py-2.5 pr-4 pl-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          <span
            className={cn(
              "grid size-8 flex-none place-items-center rounded-xl border",
              card.tone === "success" ? "border-success/40 bg-success/15 text-success" : "border-accent/40 bg-accent/15 text-accent"
            )}
          >
            {card.tone === "success" ? (
              <Check className="size-4" strokeWidth={2.5} aria-hidden />
            ) : (
              <span className="size-1.5 rounded-full bg-current" />
            )}
          </span>
          <span className="flex flex-col">
            <span className="font-mono text-[10px] font-medium tracking-[0.14em] whitespace-nowrap text-fg-2 uppercase">{card.kicker.replace("✓ ", "")}</span>
            <span
              className={cn(
                "text-[15px] leading-tight font-extrabold tracking-tight",
                card.tone === "accent" ? "font-mono text-accent-light" : "text-fg"
              )}
            >
              {card.value}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function Portrait({ image, mx, my }: { image: ResolvedImage; mx: MotionValue<number>; my: MotionValue<number> }) {
  const px = useTransform(mx, (v) => v * -12)
  const py = useTransform(my, (v) => v * -12)
  const reduce = usePrefersReducedMotion()

  return (
    <motion.div
      className="relative mx-auto w-[min(78vw,340px)] sm:w-[min(62vw,400px)] md:w-full md:max-w-[480px]"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: EASE_OUT }}
    >
      {/* warm glow */}
      <div
        aria-hidden
        className="absolute -inset-[18%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,53,0.32),rgba(255,107,53,0.08)_55%,transparent)] blur-2xl"
      />

      {/* technical marks */}
      <div aria-hidden className="pointer-events-none absolute -inset-5 hidden sm:block">
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((p) => (
          <span key={p} className={cn("absolute size-3 text-accent/70", p)}>
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
            <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
          </span>
        ))}
        <div className="absolute top-[12%] -left-1 flex h-[76%] flex-col justify-between">
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={i} className={cn("h-px bg-white/20", i % 4 === 0 ? "w-3" : "w-1.5")} />
          ))}
        </div>
      </div>

      <motion.div style={{ x: px, y: py }} className="glass relative rounded-[26px] p-2" data-cursor="EXPLORE">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[19px] bg-card">
          <SmartImage
            image={image}
            fill
            preload
            sizes="(min-width: 1024px) 480px, (min-width: 600px) 62vw, 78vw"
            className="object-cover object-[50%_18%]"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/5 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(255,107,53,0.14),transparent_60%)]" />

          {/* one-time QA scan sweep */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-0 h-24"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: ["-100%", "520%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, delay: 1.1, ease: [0.45, 0, 0.2, 1], times: [0, 0.1, 0.85, 1] }}
            >
              <div className="h-full bg-linear-to-b from-transparent to-accent/20" />
              <div className="h-px bg-accent shadow-[0_0_16px_2px_rgba(255,107,53,0.8)]" />
            </motion.div>
          )}

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 2.9, duration: 0.6 }}
            className="label-mono absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-success/30 bg-ink/60 px-2.5 py-1 !text-[9px] text-success backdrop-blur"
          >
            <Check className="size-3" strokeWidth={3} aria-hidden /> Verified
          </motion.span>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold">{profile.name}</p>
              <p className="label-mono mt-1 !text-[9.5px] text-fg-2">{profile.title} · Noida, IN</p>
            </div>
          </div>
        </div>
        <BorderBeam size={140} duration={9} colorFrom="#FF6B35" colorTo="#FF9A70" borderWidth={1.5} />
      </motion.div>
    </motion.div>
  )
}

export function Hero({ image }: { image: ResolvedImage }) {
  const reduce = usePrefersReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 })
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 })

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  const up = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease: EASE_OUT },
  })

  return (
    <section
      id="top"
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      className="relative overflow-x-clip pt-24 pb-12 sm:pt-28 lg:pt-32 lg:pb-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={
              {
                left: p.left,
                top: p.top,
                "--p-dur": p.dur,
                "--p-delay": p.delay,
                "--p-x": p.x,
                "--p-opacity": 0.55,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="container-x grid grid-cols-1 gap-y-10 md:grid-cols-[1.3fr_0.7fr] md:gap-x-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-x-16">
        {/* Eyebrow + H1 */}
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <motion.p
            {...up(0.4)}
            className="label-mono inline-flex items-center gap-3 rounded-full border border-glass-line bg-glass py-2 pr-4 pl-3 text-fg-2 backdrop-blur"
          >
            <span className="pulse-dot text-success" aria-hidden />
            <span className="text-fg">{hero.eyebrow[0]}</span>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            <span>{hero.eyebrow[1]}</span>
          </motion.p>

          <RevealLines
            as="h1"
            immediate
            delay={0.55}
            gap={0.12}
            lines={[
              hero.heading[0],
              hero.heading[1],
              <>
                {hero.heading[2].replace(/\.$/, "")}
                <span className="text-accent">.</span>
              </>,
            ]}
            className="display mt-6 text-[clamp(1.85rem,5.2vw,2.75rem)] text-fg sm:text-[clamp(2.2rem,4.5vw,3.25rem)] md:text-[clamp(2.4rem,4vw,3.5rem)]"
            lineClassName={(i) => (i === 1 ? "text-outline" : undefined)}
          />
          <span className="sr-only">
            {profile.name} — {profile.tagline}
          </span>
        </div>

        {/* Portrait */}
        <div className="relative md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
          <Portrait image={image} mx={mx} my={my} />
          {hero.floatingCards.map((c, i) => (
            <FloatingCard key={c.id} card={c} index={i} mx={mx} my={my} />
          ))}
        </div>

        {/* Lead + CTAs */}
        <div className="md:col-start-1 md:row-start-2">
          <motion.p {...up(0.95)} className="max-w-xl text-base leading-relaxed text-fg sm:text-lg">
            {hero.lead}
          </motion.p>
          <motion.p {...up(1.05)} className="mt-3 max-w-lg text-sm leading-relaxed text-fg-2">
            {hero.sub}
          </motion.p>
          <motion.div {...up(1.15)} className="mt-8 flex flex-wrap items-center gap-4">
            <Cta href="#work">View my work</Cta>
            <Cta href={profile.resume} variant="ghost" icon="down" download>
              Download resume
            </Cta>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="container-x mt-16 hidden items-center gap-4 lg:flex"
      >
        <span className="label-mono text-muted">Scroll to explore</span>
        <span className="relative h-px w-24 overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 w-8 bg-accent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          />
        </span>
      </motion.div>
    </section>
  )
}
