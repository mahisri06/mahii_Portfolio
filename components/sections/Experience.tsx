"use client"

import { ArrowDown, ArrowRight, Briefcase, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion, useInView, useScroll, useSpring } from "motion/react"
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"

import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeader } from "@/components/ui/section-header"
import { experiences, projects } from "@/data/portfolio"
import { EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

function Node({ marker, children, last }: { marker: string; children: ReactNode; last?: boolean }) {
  const ref = useRef<HTMLLIElement>(null)
  const active = useInView(ref, { once: true, margin: "0px 0px -45% 0px" })
  return (
    <li ref={ref} className={cn("relative pl-12 sm:pl-16", !last && "pb-14 sm:pb-20")}>
      <span className="absolute top-1 left-0 grid size-[30px] place-items-center" aria-hidden>
        <span
          className={cn(
            "absolute inset-0 rounded-full border transition-colors duration-700",
            active ? "border-accent/50 bg-accent/10" : "border-line bg-ink"
          )}
        />
        <span
          className={cn(
            "relative size-2 rounded-full transition-all duration-700",
            active ? "scale-100 bg-accent shadow-[0_0_14px_3px_rgba(255,107,53,0.6)]" : "scale-75 bg-white/20"
          )}
        />
      </span>
      <motion.div
        initial={{ opacity: 0.25, x: 8 }}
        animate={active ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <p className="label-mono text-muted">{marker}</p>
        {children}
      </motion.div>
    </li>
  )
}

export function Experience() {
  const { scrollTo } = useSmoothScroll()
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  const [activeCompanyId, setActiveCompanyId] = useState<string>("bingo")

  useEffect(() => {
    const handleScroll = () => {
      const knovatorEl = document.getElementById("exp-knovator")
      if (!knovatorEl) return

      const rect = knovatorEl.getBoundingClientRect()
      // If Knovator has scrolled into upper view (<= 240px from top), switch active to knovator
      if (rect.top <= 240) {
        setActiveCompanyId("knovator")
      } else {
        setActiveCompanyId("bingo")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToCompany = (id: string) => {
    setActiveCompanyId(id)
    const target = document.getElementById(`exp-${id}`)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollTo(id)
  }

  const currentExp = experiences.find((e) => e.current) ?? experiences[0]

  return (
    <section id="work" aria-labelledby="experience-title" className="relative py-14 sm:py-18 lg:py-24">
      <div id="experience" className="absolute -top-24 pointer-events-none" />
      <div className="container-x">
        <SectionHeader
          label="Experience"
          titleId="experience-title"
          title={["Owning quality", "from test case", "to release."]}
          aside={
            <p className="text-[16px] leading-relaxed">
              2+ years across FinTech, SaaS, Healthcare and Analytics — owning end-to-end QA, test automation frameworks, and zero-defect releases.
            </p>
          }
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Interactive Clickable Company Roles with Active Scroll Spy */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28 space-y-4">
              {experiences.map((exp) => {
                const isActive = activeCompanyId === exp.id
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => scrollToCompany(exp.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative w-full text-left overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-400 cursor-pointer block",
                      isActive
                        ? "border-accent/60 bg-card shadow-[0_16px_40px_-12px_rgba(255,107,53,0.4)] ring-1 ring-accent/30"
                        : "border-line bg-card/50 opacity-70 hover:opacity-100 hover:border-white/20 hover:bg-card/75"
                    )}
                  >
                    {isActive && (
                      <div aria-hidden className="absolute -top-16 -right-16 size-44 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-xl border transition-colors",
                          isActive
                            ? "border-accent/40 bg-accent/15 text-accent"
                            : "border-white/10 bg-white/[0.04] text-fg-2 group-hover:text-accent group-hover:border-accent/30"
                        )}
                      >
                        <Briefcase className="size-4" strokeWidth={1.8} aria-hidden />
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "label-mono flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] transition-colors",
                            isActive
                              ? "border border-success/40 bg-success/15 text-success font-semibold"
                              : "border border-line bg-white/[0.03] text-muted"
                          )}
                        >
                          {exp.current && <span className="pulse-dot size-1.5" aria-hidden />}
                          {exp.period}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-xs transition-transform duration-300",
                            isActive
                              ? "text-accent translate-x-0.5 font-bold"
                              : "text-muted/40 group-hover:translate-x-0.5 group-hover:text-fg"
                          )}
                        >
                          →
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className={cn("text-xl font-bold tracking-tight transition-colors", isActive ? "text-fg" : "text-fg-2 group-hover:text-fg")}>
                        {exp.company}
                      </h3>
                      <p className="mt-0.5 text-sm font-semibold text-accent-light">
                        {exp.role} · <span className="text-fg-2 font-normal">{exp.location}</span>
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-muted">{exp.domain}</p>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-fg-2">{exp.description}</p>

                    <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Tags">
                      {exp.tags.map((t) => (
                        <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-fg-2">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </button>
                )
              })}
            </Reveal>
          </div>

          {/* Right Column: Detailed Timeline Progression */}
          <div className="relative lg:col-span-7">
            <div aria-hidden className="absolute top-2 bottom-2 left-[14.5px] w-px bg-line">
              <motion.div className="h-full w-full origin-top bg-linear-to-b from-accent via-accent-light to-accent/20" style={{ scaleY: progress }} />
            </div>

            <ol ref={listRef} className="relative">
              {/* Current Role Node: Bingo Manufacturing and Marketing */}
              <div id="exp-bingo" className="scroll-mt-28">
                <Node marker="April 2026 — Present · Current Company">
                  <div className="flex items-center gap-2">
                    <h4 className="mt-1 text-xl font-bold sm:text-2xl text-fg">{currentExp.company}</h4>
                  </div>
                  <p className="mt-1 font-mono text-sm font-semibold text-accent-light">
                    {currentExp.role} · {currentExp.location}
                  </p>
                  <p className="label-mono mt-1 text-muted">{currentExp.domain}</p>

                  <p className="mt-3 max-w-xl leading-relaxed text-fg-2">
                    {currentExp.description}
                  </p>

                  <ul className="mt-4 space-y-2 max-w-xl text-xs sm:text-[13px] text-fg-2">
                    {currentExp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Node>
              </div>

              {/* Previous Role Node: Knovator Technologies */}
              <div id="exp-knovator" className="scroll-mt-28">
                <Node marker="March 2024 — April 2026 · 2 Years">
                  <h4 className="mt-1 text-xl font-bold sm:text-2xl text-fg">Knovator Technologies Pvt. Ltd.</h4>
                  <p className="mt-1 font-mono text-sm font-semibold text-accent-light">
                    QA Engineer · Surat, Gujarat
                  </p>
                  <p className="label-mono mt-1 text-muted">SaaS | Healthcare | Restaurant | Mobile Testing (Android & iOS) · Agile/Scrum</p>
                  <p className="mt-3 max-w-xl leading-relaxed text-fg-2">
                    Owned end-to-end QA across 3 production vertical platforms. Tested mobile applications on real Android &amp; iOS devices using LambdaTest for Omniva Telehealth and Restaurant Food Ordering systems. Built and maintained automated regression suites using Playwright and Selenium WebDriver that reduced manual regression effort by 50%.
                  </p>
                </Node>

                {/* Projects Under Knovator */}
                {projects.map((p, index) => (
                  <Node
                    key={p.id}
                    marker={`Delivered at Knovator · ${p.category}`}
                    last={index === projects.length - 1}
                  >
                    <div className="mt-2 flex flex-wrap items-center gap-2.5">
                      <h4 className="text-xl font-bold sm:text-2xl text-fg">{p.name}</h4>
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                        {p.role}
                      </span>
                    </div>

                    <p className="mt-2 max-w-xl leading-relaxed text-fg-2">{p.summary}</p>

                    <div className="mt-5">
                      <Link
                        href={`/work/${p.id}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink hover:shadow-[0_0_20px_rgba(255,107,53,0.35)]"
                      >
                        Explore dedicated case study
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </div>
                  </Node>
                ))}
              </div>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
