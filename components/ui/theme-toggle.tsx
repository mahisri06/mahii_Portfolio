"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { useTheme } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid size-9 place-items-center rounded-full border border-line bg-card/60",
          className
        )}
      />
    )
  }

  const isLight = theme === "light"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "group relative grid size-9 place-items-center rounded-full border transition-all duration-300 cursor-pointer",
        isLight
          ? "border-amber-500/40 bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          : "border-line bg-card/60 text-fg-2 hover:border-accent/40 hover:text-accent hover:bg-accent/10",
        className
      )}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isLight ? 180 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {isLight ? (
          <Sun className="size-4 text-amber-500" strokeWidth={2} />
        ) : (
          <Moon className="size-4" strokeWidth={2} />
        )}
      </motion.div>
    </button>
  )
}
