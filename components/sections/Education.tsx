"use client"

import { GraduationCap } from "lucide-react"

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal"
import { SectionLabel } from "@/components/ui/section-header"
import { education } from "@/data/portfolio"

export function Education() {
  const d = education.degree
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-12 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel label="Education" />
            <h2 id="education-title" className="mt-4 text-2xl font-extrabold tracking-[-0.03em] uppercase sm:text-[26px]">
              Education
            </h2>
          </div>

          <div className="space-y-4 lg:col-span-8">
            <Reveal className="flex flex-col gap-6 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center sm:p-7">
              <span className="grid size-12 flex-none place-items-center rounded-xl border border-line bg-white/[0.03] text-fg-2">
                <GraduationCap className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="flex-1">
                <p className="label-mono text-accent">{d.short}</p>
                <h3 className="mt-1 text-xl font-bold">{d.name}</h3>
                <p className="mt-2 text-sm text-fg-2">
                  {d.college} · {d.university}
                </p>
              </div>
              <dl className="flex gap-6 font-mono text-sm sm:flex-col sm:gap-1 sm:text-right">
                <div>
                  <dt className="sr-only">Year</dt>
                  <dd className="text-fg">{d.year}</dd>
                </div>
                <div>
                  <dt className="sr-only">Score</dt>
                  <dd className="text-fg-2">{d.score}</dd>
                </div>
              </dl>
            </Reveal>

            <RevealGroup as="ul" className="divide-y divide-line rounded-2xl border border-line" gap={0.06}>
              {education.school.map((s) => (
                <RevealItem as="li" key={s.grade} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4 text-sm">
                  <span className="text-fg-2">
                    <span className="font-semibold text-fg">{s.grade}</span> · {s.school}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-muted shrink-0">{s.year}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
