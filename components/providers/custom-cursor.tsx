"use client"

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"

type CursorMode = "default" | "hover" | "label"

/**
 * Desktop-only cursor. Elements opt into a text label with
 * `data-cursor="VIEW CASE STUDY"`; plain links/buttons get the expanded ring.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")
  const [label, setLabel] = useState("")
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(fine.matches && !reduce.matches)
    update()
    fine.addEventListener("change", update)
    reduce.addEventListener("change", update)
    return () => {
      fine.removeEventListener("change", update)
      reduce.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add("has-custom-cursor")

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null
      const labelled = el?.closest<HTMLElement>("[data-cursor]")
      if (labelled?.dataset.cursor) {
        setLabel(labelled.dataset.cursor)
        setMode("label")
        return
      }
      setMode(el?.closest("a, button, [role='button'], summary") ? "hover" : "default")
    }
    const onLeave = () => setVisible(false)

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    return () => {
      root.classList.remove("has-custom-cursor")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const ringSize = mode === "label" ? 112 : mode === "hover" ? 46 : 26

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="fixed top-0 left-0 grid place-items-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: mode === "label" ? "rgba(255,107,53,0.95)" : "rgba(255,107,53,0)",
          borderColor: mode === "label" ? "rgba(255,107,53,0)" : mode === "hover" ? "rgba(255,154,112,0.9)" : "rgba(245,247,250,0.35)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="label-mono max-w-[84px] text-center !text-[10px] leading-tight font-semibold !tracking-[0.12em] text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: mode === "label" ? 0 : 1 }}
      />
    </div>
  )
}
