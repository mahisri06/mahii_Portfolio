import type { Transition, Variants } from "motion/react"

/** Expo-out: fast start, long graceful settle. Used for most reveals. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
/** Softer in-out for looping or layout motion. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const revealTransition: Transition = { duration: 0.9, ease: EASE_OUT }

/** Section-level reveal: opacity 0→1, y 30→0, blur 6px→0. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: revealTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Line-mask reveal: each line slides up from behind an overflow-hidden mask. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE_OUT } },
}

export const slideFrom = (x: number): Variants => ({
  hidden: { opacity: 0, x, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE_OUT } },
})

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const
