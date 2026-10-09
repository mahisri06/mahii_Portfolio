"use client"

import { motion, type Variants } from "motion/react"
import type { ElementType, ReactNode } from "react"

import { fadeUp, lineReveal, stagger, viewportOnce } from "@/lib/animations"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: "div" | "section" | "ul" | "li" | "p" | "span" | "article"
}

/** Viewport-triggered reveal: opacity, y and blur, once. */
export function Reveal({ children, className, variants = fadeUp, as = "div" }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Comp>
  )
}

/** Parent that staggers any `RevealItem` (or variant-aware motion child) inside it. */
export function RevealGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
  as?: "div" | "ul" | "ol" | "dl"
}) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Comp>
  )
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: "div" | "li"
}) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  )
}

type LinesProps = {
  lines: readonly ReactNode[]
  as?: ElementType
  id?: string
  className?: string
  lineClassName?: (i: number) => string | undefined
  /** Animate on mount (hero) rather than on viewport entry. */
  immediate?: boolean
  delay?: number
  gap?: number
}

/** Editorial line-by-line mask reveal for large headings. */
export function RevealLines({ lines, as: Tag = "h2", id, className, lineClassName, immediate, delay = 0, gap = 0.1 }: LinesProps) {
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: viewportOnce }
  return (
    <Tag id={id} className={className}>
      <motion.span className="block" variants={stagger(gap, delay)} initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <motion.span className={cn("block will-change-transform", lineClassName?.(i))} variants={lineReveal}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
