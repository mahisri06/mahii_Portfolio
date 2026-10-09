"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

import { EASE_OUT, viewportOnce } from "@/lib/animations"
import { cn } from "@/lib/utils"

import { Reveal, RevealLines } from "./reveal"

export function SectionLabel({ label, className }: { index?: string; label: string; className?: string }) {
  return (
    <motion.p
      className={cn("label-mono flex items-center gap-2.5 text-accent-light", className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="pulse-dot size-1.5 bg-accent" aria-hidden />
      <span className="font-semibold tracking-wider uppercase text-accent">{label}</span>
    </motion.p>
  )
}

type HeaderProps = {
  index?: string
  label: string
  title: readonly ReactNode[]
  titleId?: string
  aside?: ReactNode
  className?: string
  titleClassName?: string
}

/** Asymmetric header: big editorial title left, supporting copy bottom-right. */
export function SectionHeader({ index, label, title, titleId, aside, className, titleClassName }: HeaderProps) {
  return (
    <header className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <SectionLabel index={index} label={label} />
        <RevealLines id={titleId} lines={title} className={cn("display mt-5 text-[clamp(1.75rem,3.6vw,3rem)] text-fg", titleClassName)} />
      </div>
      {aside && <Reveal className="max-w-md text-fg-2 lg:col-span-4 lg:justify-self-end lg:pb-3">{aside}</Reveal>}
    </header>
  )
}
