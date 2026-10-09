"use client"

import { ArrowUpRight, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, type MouseEvent } from "react"

import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { navLinks, profile, type NavId } from "@/data/portfolio"
import { EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

/** Maps every section id on the page to the nav item that should light up. */
const SECTION_TO_NAV: Record<string, NavId> = {
  about: "about",
  expertise: "expertise",
  lab: "expertise",
  experience: "work",
  work: "work",
  learning: "about",
  education: "about",
  beyond: "about",
  contact: "contact",
}

function useActiveSection() {
  const [active, setActive] = useState<NavId | null>(null)
  useEffect(() => {
    const sections = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    let ticking = false
    const update = () => {
      ticking = false
      const probe = window.innerHeight * 0.38
      let current: NavId | null = null
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= probe) current = SECTION_TO_NAV[el.id]
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return active
}

export function Navbar() {
  const { scrollTo, lock } = useSmoothScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    lock(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, lock])

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    if (open) {
      setOpen(false)
      // Wait for the overlay to start closing and scroll to unlock.
      window.setTimeout(() => scrollTo(id), 320)
    } else {
      scrollTo(id)
    }
  }

  return (
    <>
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "relative flex w-full items-center justify-between rounded-full border px-4 transition-all duration-700 ease-(--ease-out-expo) sm:px-5",
          scrolled
            ? "h-14 max-w-5xl border-glass-line bg-ink/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150"
            : "h-16 max-w-[1320px] border-transparent bg-transparent"
        )}
      >
        <a
          href="#top"
          onClick={(e) => go(e, "top")}
          className="group flex items-center gap-2.5 font-extrabold tracking-[-0.02em]"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="relative grid size-7 place-items-center rounded-md border border-accent/40 bg-accent/10">
            <span className="size-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
          </span>
          <span className="text-[15px]">{profile.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative block rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-300",
                  active === l.id ? "text-fg" : "text-fg-2 hover:text-fg"
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-glass-line bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.resume}
            download
            className="group hidden h-9 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 font-mono text-[11px] font-medium tracking-[0.14em] text-accent-light uppercase transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink sm:inline-flex"
          >
            Resume
            <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-glass-line bg-glass md:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/[0.97] px-6 pt-24 pb-8 backdrop-blur-xl md:hidden overflow-y-auto overscroll-contain"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <motion.ul
              className="relative flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {navLinks.map((l) => (
                <motion.li
                  key={l.id}
                  className="overflow-hidden border-b border-line"
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
                >
                  <a href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="flex items-baseline justify-between py-5">
                    <span className="display text-[2.1rem] text-fg">{l.label}</span>
                    <span className="font-mono text-xs text-accent">→</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="relative mt-auto flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              <a href={profile.resume} download className="label-mono text-accent-light">
                Download resume ↓
              </a>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
