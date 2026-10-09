"use client"

import { Check, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"

import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import type { Project } from "@/data/portfolio"
import { EASE_OUT } from "@/lib/animations"

type Props = { project: Project | null; onClose: () => void }

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-5">
      <h4 className="label-mono text-accent">{label}</h4>
      <div className="mt-3 text-[15px] leading-relaxed text-fg-2">{children}</div>
    </section>
  )
}

export function ProjectModal({ project, onClose }: Props) {
  const { lock } = useSmoothScroll()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const opener = document.activeElement as HTMLElement | null
    lock(true)
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      lock(false)
      opener?.focus()
    }
  }, [project, onClose, lock])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <button type="button" aria-label="Close case study" onClick={onClose} className="absolute inset-0 bg-ink/80 backdrop-blur-md" tabIndex={-1} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.id}-modal-title`}
            data-lenis-prevent
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-3xl border border-glass-line bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-3xl"
          >
            <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-64 w-96 rounded-full bg-accent/15 blur-3xl" />
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink-2/85 px-5 py-4 backdrop-blur-xl sm:px-8">
              <p className="label-mono text-muted">
                <span className="text-accent">{project.index}</span> / Case study
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid size-10 place-items-center rounded-full border border-glass-line bg-glass transition-colors hover:border-accent/50 hover:text-accent"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="relative px-5 pt-8 pb-10 sm:px-8 sm:pt-10">
              <p className="label-mono text-accent-light">{project.category}</p>
              <h3 id={`${project.id}-modal-title`} className="mt-2.5 text-[clamp(1.45rem,3.2vw,2.2rem)] leading-[1.06] font-extrabold tracking-[-0.035em]">
                {project.name}
              </h3>

              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-card px-3 py-4 sm:px-5">
                    <dd className="font-mono text-lg font-semibold text-fg sm:text-2xl">{m.value}</dd>
                    <dt className="label-mono mt-1 !text-[9.5px] text-muted sm:!text-[10.5px]">{m.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <Block label="Overview">
                  <p>{project.detail.overview}</p>
                </Block>
                <Block label="Challenge">
                  <p>{project.detail.challenge}</p>
                </Block>
                <Block label="Approach">
                  <p>{project.detail.approach}</p>
                </Block>
                <Block label="Testing">
                  <ul className="space-y-1.5">
                    {project.detail.testing.map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span aria-hidden className="mt-2.5 h-px w-3 flex-none bg-accent" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block label="Tools & methods">
                  <ul className="flex flex-wrap gap-2">
                    {project.detail.tools.map((t) => (
                      <li key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-fg">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block label="Impact">
                  <ul className="space-y-2">
                    {project.detail.impact.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-fg">
                        <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-success/15 text-success">
                          <Check className="size-3" strokeWidth={3} aria-hidden />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </Block>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
