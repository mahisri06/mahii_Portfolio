"use client"

import Lenis from "lenis"
import { MotionConfig } from "motion/react"
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react"

import { NAV_HEIGHT } from "@/lib/constants"

type ScrollApi = {
  scrollTo: (id: string) => void
  lock: (locked: boolean) => void
}

const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {}, lock: () => {} })

export const useSmoothScroll = () => useContext(ScrollContext)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.2 })
    lenisRef.current = lenis

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((id: string) => {
    const target = id === "top" ? 0 : document.getElementById(id)
    if (target === null) return
    const lenis = lenisRef.current
    if (lenis) {
      // The nav offset comes from `scroll-padding-top` on <html>, which Lenis honours.
      lenis.scrollTo(target, {
        duration: 1.3,
        // Content above can shift mid-flight (lazy images, reveals); land precisely.
        onComplete: () => {
          if (target === 0) return
          if (Math.abs(target.getBoundingClientRect().top - NAV_HEIGHT) > 4) lenis.scrollTo(target, { duration: 0.5 })
        },
      })
    } else if (target === 0) {
      window.scrollTo({ top: 0 })
    } else {
      target.scrollIntoView()
    }
    if (id !== "top") history.replaceState(null, "", `#${id}`)
  }, [])

  const lock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current
    if (lenis) {
      if (locked) lenis.stop()
      else lenis.start()
    }
    document.documentElement.style.overflow = locked ? "hidden" : ""
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollTo, lock }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ScrollContext.Provider>
  )
}
