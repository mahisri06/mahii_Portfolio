"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { useCallback, useState } from "react"

import { SectionHeader } from "@/components/ui/section-header"
import { AnalyticsVisual } from "@/components/visuals/AnalyticsVisual"
import { RestaurantVisual } from "@/components/visuals/RestaurantVisual"
import { TelehealthVisual } from "@/components/visuals/TelehealthVisual"
import { projects, type Project } from "@/data/portfolio"
import { slideFrom, viewportOnce } from "@/lib/animations"
import { cn } from "@/lib/utils"

import { ProjectModal } from "./ProjectModal"

const VISUALS: Record<Project["visual"], () => React.JSX.Element> = {
  restaurant: RestaurantVisual,
  telehealth: TelehealthVisual,
  analytics: AnalyticsVisual,
}

function CaseStudy({ project, flip, onOpen }: { project: Project; flip: boolean; onOpen: () => void }) {
  const Visual = VISUALS[project.visual]
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      data-cursor="VIEW CASE STUDY"
      className="group relative grid gap-8 rounded-[28px] border border-transparent p-0 transition-colors duration-700 hover:border-glass-line sm:gap-10 lg:grid-cols-12 lg:gap-14 lg:p-5 lg:hover:bg-white/[0.015]"
    >
      {/* Visual */}
      <motion.div
        variants={slideFrom(flip ? -60 : 60)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className={cn("relative lg:col-span-7", flip && "lg:order-2")}
      >
        <div className="relative overflow-hidden rounded-3xl border border-line bg-section p-3 sm:p-6">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_0%,rgba(255,107,53,0.14),transparent_70%)]" />
          <div className="relative mb-3 flex items-center justify-between sm:mb-4">
            <span className="label-mono rounded-full border border-glass-line bg-ink/60 px-2.5 py-1 !text-[9.5px] text-fg-2 backdrop-blur">
              Project visualization
            </span>
            <span className="grid size-9 translate-y-1 place-items-center rounded-full bg-accent text-ink opacity-0 transition-all duration-500 ease-(--ease-out-expo) group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
          <div className="relative aspect-[4/5] transition-transform min-[480px]:aspect-[4/3] duration-1000 ease-(--ease-out-expo) group-hover:scale-[1.03]" aria-hidden>
            <Visual />
          </div>
        </div>
        <p className="label-mono mt-3 !text-[9.5px] text-muted">Abstract product view · not the actual client interface</p>
      </motion.div>

      {/* Info */}
      <motion.div
        variants={slideFrom(flip ? 60 : -60)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className={cn("flex flex-col lg:col-span-5 lg:py-4", flip && "lg:order-1")}
      >
        <div className="flex items-center gap-4">
          <span className="text-outline font-mono text-5xl font-semibold transition-transform duration-700 ease-(--ease-out-expo) group-hover:translate-x-2 sm:text-6xl">
            {project.index}
          </span>
          <span className="label-mono text-accent-light">{project.category}</span>
        </div>

        <h3 id={`${project.id}-title`} className="mt-6 text-base font-bold text-fg-2">
          {project.name}
        </h3>
        <p className="display mt-2.5 text-[clamp(1.4rem,2.6vw,2.1rem)] text-fg">
          {project.headline.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
        <p className="mt-6 leading-relaxed text-fg-2">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-3 border-y border-line">
          {project.metrics.map((m, i) => (
            <div key={m.label} className={cn("py-4", i > 0 && "border-l border-line pl-2 sm:pl-4")}>
              <dd className="font-mono text-base sm:text-[22px] leading-tight font-semibold text-fg">{m.value}</dd>
              <dt className="label-mono mt-1.5 !text-[9px] sm:!text-[9.5px] text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-6 flex gap-3 text-sm leading-relaxed text-fg">
          <span aria-hidden className="mt-2 h-px w-5 flex-none bg-accent" />
          {project.impact}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="label-mono mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-glass-line px-5 py-3 font-semibold text-fg transition-all duration-500 ease-(--ease-out-expo) group-hover:gap-5 group-hover:border-accent group-hover:bg-accent group-hover:text-ink after:absolute after:inset-0 after:rounded-[28px] after:content-['']"
        >
          View case study
          <ArrowRight className="size-4" aria-hidden />
          <span className="sr-only">: {project.name}</span>
        </button>
      </motion.div>
    </article>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-14 sm:py-18 lg:py-24">
      <div className="container-x">
        <SectionHeader
          label="Selected work"
          titleId="work-title"
          title={["Case studies", <span key="2" className="text-fg-2">in quality.</span>]}
          aside={
            <p className="text-[17px] leading-relaxed">
              Three products, three domains — food-tech SaaS, healthcare and data analytics. Open any study for the full breakdown.
            </p>
          }
        />
        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-28">
          {projects.map((p, i) => (
            <CaseStudy key={p.id} project={p} flip={i % 2 === 1} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>
      <ProjectModal project={open} onClose={close} />
    </section>
  )
}
