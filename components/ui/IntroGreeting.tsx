"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { EASE_OUT } from "@/lib/animations"

export function IntroGreeting() {
  const [open, setOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Displays once on each page load/reload, then automatically reveals portfolio after 2.5 seconds
    const timer = setTimeout(() => {
      setOpen(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setOpen(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro-curtain"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-ink/95 px-6 backdrop-blur-2xl"
          onClick={dismiss}
        >
          {/* Ambient Lighting & Grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,53,0.18),transparent_65%)]"
          />
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-40"
          />

          {/* Top Theme Toggle */}
          <div
            className="absolute top-6 right-6 z-10 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <ThemeToggle />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            {/* Main Greeting Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
              className="mt-4"
            >
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg">
                <span className="text-accent-gradient block sm:inline">Bonjour!</span>{" "}
                <span className="text-fg">Mahi this side.</span>
              </h1>

              <p className="mt-5 text-base sm:text-xl font-medium leading-relaxed text-fg-2 max-w-xl mx-auto">
                Senior QA Engineer building confidence in software through thoughtful test automation, API validation, and zero-defect releases.
              </p>
            </motion.div>

            {/* Quick status pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE_OUT }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs text-muted"
            >
              <span className="flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-3 py-1 font-semibold text-success">
                <span className="pulse-dot size-1.5 bg-success" />
                Available for QA Engineering roles
              </span>
              <span className="rounded-full border border-line bg-card/60 px-3 py-1 text-fg-2">
                Noida, UP, India
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
