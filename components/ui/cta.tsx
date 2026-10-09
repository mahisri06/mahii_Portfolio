"use client"

import { ArrowDown, ArrowRight } from "lucide-react"
import type { MouseEvent, ReactNode } from "react"

import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { cn } from "@/lib/utils"

import { Magnetic } from "./magnetic"

type CtaProps = {
  href: string
  children: ReactNode
  variant?: "primary" | "ghost"
  icon?: "right" | "down"
  download?: boolean
  external?: boolean
  className?: string
  size?: "md" | "lg"
  cursorLabel?: string
}

/** Pill CTA. In-page hashes route through Lenis; the arrow slides 4px on hover. */
export function Cta({
  href,
  children,
  variant = "primary",
  icon = "right",
  download,
  external,
  className,
  size = "md",
  cursorLabel,
}: CtaProps) {
  const { scrollTo } = useSmoothScroll()
  const Icon = icon === "down" ? ArrowDown : ArrowRight

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      scrollTo(href.slice(1))
    }
  }

  return (
    <Magnetic>
      <a
        href={href}
        onClick={onClick}
        download={download || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-cursor={cursorLabel}
        className={cn(
          "group/cta relative inline-flex items-center gap-2.5 overflow-hidden rounded-full font-mono font-medium tracking-[0.14em] uppercase transition-[transform,background-color,border-color,box-shadow] duration-500 ease-(--ease-out-expo) hover:scale-[1.03] active:scale-[0.98]",
          size === "lg" ? "h-14 px-7 text-xs" : "h-11 px-5 text-[11px]",
          variant === "primary"
            ? "bg-accent text-ink shadow-[0_10px_40px_-10px_rgba(255,107,53,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(255,107,53,0.85)]"
            : "border border-glass-line bg-glass text-fg backdrop-blur hover:border-accent/50 hover:bg-white/[0.06]",
          className
        )}
      >
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
          />
        )}
        <span className="relative">{children}</span>
        <Icon
          aria-hidden
          className={cn(
            "relative size-3.5 transition-transform duration-500 ease-(--ease-out-expo)",
            icon === "down" ? "group-hover/cta:translate-y-[2px]" : "group-hover/cta:translate-x-[4px]"
          )}
        />
      </a>
    </Magnetic>
  )
}
