import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  MapPin,
  ShieldAlert,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { profile, projects, type Project } from "@/data/portfolio"
import { SITE_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return {
      title: "Case Study Not Found | Mahi Srivastava",
    }
  }

  const pageTitle = `${project.name} | QA Case Study | Mahi Srivastava`
  const pageDesc = `${project.summary} Comprehensive QA engineering, test automation, and defect resolution breakdown by Mahi Srivastava at Knovator Technologies.`

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `/work/${project.id}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `/work/${project.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params
  const projectIndex = projects.findIndex((p) => p.id === id)

  if (projectIndex === -1) {
    notFound()
  }

  const project = projects[projectIndex]
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <div className="relative min-h-screen bg-ink text-fg antialiased selection:bg-accent selection:text-ink">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,107,53,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(8,11,18,0.7)_80%)]"
      />

      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-xl">
        <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-4">
          <Link
            href="/#work"
            className="group flex items-center gap-2.5 font-mono text-xs font-semibold text-fg-2 transition-colors hover:text-accent"
          >
            <span className="grid size-8 place-items-center rounded-full border border-line bg-card/60 transition-transform group-hover:-translate-x-1 group-hover:border-accent/40 group-hover:bg-accent/10">
              <ArrowLeft className="size-3.5 text-fg group-hover:text-accent" />
            </span>
            <span className="hidden sm:inline">Back to Portfolio</span>
          </Link>

          {/* Quick Switcher Between Case Studies */}
          <nav aria-label="Case study switcher" className="flex items-center gap-1.5 sm:gap-2">
            {projects.map((p) => {
              const isActive = p.id === project.id
              return (
                <Link
                  key={p.id}
                  href={`/work/${p.id}`}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs transition-all",
                    isActive
                      ? "border border-accent/60 bg-accent/15 font-semibold text-accent shadow-[0_0_15px_rgba(255,107,53,0.25)]"
                      : "border border-line/70 bg-card/40 text-muted hover:border-white/20 hover:text-fg"
                  )}
                >
                  <span className="font-semibold">{p.name.split(" ")[0]}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="hidden sm:inline-flex rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-ink"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </header>

      <main className="relative pb-16 sm:pb-24">
        {/* Hero Section */}
        <section className="container-x pt-6 sm:pt-10">
          {/* Breadcrumbs & Eyebrow */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link href="/#work" className="font-mono text-xs text-muted hover:text-fg transition-colors">
              Portfolio
            </Link>
            <span className="text-muted/50 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-muted">Work</span>
            <span className="text-muted/50 font-mono text-xs">/</span>
            <span className="font-mono text-xs font-semibold text-accent">Case Study · {project.name}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-bold text-accent">
              {project.role}
            </span>
            <span className="rounded-full border border-line bg-card/60 px-3 py-1 font-mono text-xs text-fg-2">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <Calendar className="size-3.5 text-accent-light" />
              {project.period}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <MapPin className="size-3.5 text-accent-light" />
              {project.location}
            </span>
          </div>

          <div className="mt-4 max-w-4xl">
            <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-fg">
              {project.name}
            </h1>
            <p className="display mt-2 text-[clamp(1.3rem,2.2vw,2rem)] text-accent-light">
              {project.headline.join(" ")}
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-2 max-w-3xl">
              {project.summary}
            </p>

            {/* Key Metrics - Smaller in design, placed just below summary */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-card/80 px-3 py-1.5 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-card"
                >
                  <span className="font-mono text-sm sm:text-base font-bold text-accent">
                    {m.value}
                  </span>
                  <span className="h-3 w-px bg-line/80" />
                  <span className="font-mono text-[11px] sm:text-xs text-muted">
                    {m.label}
                  </span>
                </div>
              ))}
              <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-card/80 px-3 py-1.5 backdrop-blur-md transition-all hover:border-success/40 hover:bg-card">
                <span className="font-mono text-sm sm:text-base font-bold text-success">
                  100%
                </span>
                <span className="h-3 w-px bg-line/80" />
                <span className="font-mono text-[11px] sm:text-xs text-muted">
                  Zero Escape Releases
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mahi's Hands-on Role & Key Work at Knovator Technologies */}
        <section className="container-x mt-7 sm:mt-10">
          <div className="rounded-3xl border border-accent/30 bg-card/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(255,107,53,0.15)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-5">
              <div>
                <p className="label-mono text-accent">Knovator Technologies Pvt. Ltd.</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                  Mahi&apos;s QA Ownership &amp; Key Deliverables
                </h2>
              </div>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 font-mono text-xs font-semibold text-accent">
                {project.role}
              </span>
            </div>

            {/* 6 Work Bullets in 2-column balanced grid */}
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {project.workBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-line/70 bg-ink-2/60 p-4 transition-all hover:border-accent/30 h-full"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="size-3.5" />
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-fg">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            {/* Tangible Deliverables authored by Mahi - 6 boxes in balanced grid */}
            <div className="mt-6 border-t border-line/60 pt-5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-light">
                Tangible QA Assets &amp; Deliverables Created
              </h3>
              <div className="mt-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.deepDive.deliverables.map((deliv, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2.5 rounded-xl border border-line/60 bg-ink-2/40 px-3.5 py-2.5 transition-all hover:border-accent/30 h-full"
                  >
                    <Check className="size-3.5 shrink-0 text-accent" />
                    <span className="font-mono text-xs text-fg-2 leading-snug">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive: The Challenge & QA Architecture */}
        <section className="container-x mt-7 sm:mt-10 space-y-5">
          {/* Top Full-Width Briefing: The Quality Challenge (2 balanced boxes) */}
          <div className="rounded-3xl border border-line bg-card/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-accent">
              <Briefcase className="size-4" />
              <span>The Problem &amp; Architecture Complexity</span>
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-fg">
              The Quality Challenge
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2 items-stretch">
              <div className="flex flex-col justify-between rounded-2xl border border-line/60 bg-ink-2/50 p-5 h-full">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-light">
                    Problem Landscape &amp; System Complexity
                  </span>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-fg-2">
                    {project.deepDive.problemContext}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-line/60 bg-ink-2/50 p-5 h-full">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-light">
                    Core Quality Bottleneck &amp; QA Challenge
                  </span>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-fg-2">
                    {project.detail.challenge}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Perfectly Balanced, Aligned Columns: Strategy & Scenarios */}
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 items-stretch">
            {/* Left Column: QA Strategy & Framework Architecture */}
            <div className="h-full rounded-3xl border border-line bg-card/60 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-accent">
                  <Layers className="size-4" />
                  <span>QA Strategy &amp; Framework Architecture</span>
                </div>
                <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-fg">
                  End-to-End Testing Strategy
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-muted">
                  Multi-tier validation architecture designed to eliminate regression risks and verify complex workflows.
                </p>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-rows-6 flex-1">
                {project.deepDive.qaArchitecture.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex flex-col justify-between rounded-2xl border border-line/60 bg-ink-2/50 p-4 transition-all hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[10px] font-mono font-bold text-accent">
                          {sIdx + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-fg truncate">
                          {step.title}
                        </h3>
                      </div>
                      <span className="rounded-md border border-line bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-accent-light shrink-0">
                        {step.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-fg-2">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: High-Value Test Scenarios */}
            <div className="h-full rounded-3xl border border-line bg-card/60 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-accent">
                  <Terminal className="size-4" />
                  <span>High-Value Test Scenarios</span>
                </div>
                <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-fg">
                  Edge Cases &amp; Scenario Coverage
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-muted">
                  Critical user journeys, mobile testing paths, and boundary checks designed and executed by Mahi.
                </p>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-rows-6 flex-1">
                {project.deepDive.coreScenarios.map((scen, scIdx) => (
                  <div
                    key={scIdx}
                    className="flex flex-col justify-between rounded-2xl border border-line/60 bg-ink-2/50 p-4 transition-all hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[10px] font-mono font-bold text-accent">
                          {scIdx + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-fg truncate">
                          {scen.title}
                        </h3>
                      </div>
                      <span className="rounded-md border border-line bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-accent-light shrink-0">
                        {scen.type}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-fg-2">
                      {scen.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Critical Defects Caught & Resolved */}
        <section className="container-x mt-7 sm:mt-10">
          <div className="rounded-3xl border border-line bg-card/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="label-mono flex items-center gap-2 text-accent">
                  <ShieldAlert className="size-4" />
                  <span>Defect Discovery &amp; Risk Mitigation</span>
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                  Critical Defects Prevented from Production
                </h2>
              </div>
              <span className="font-mono text-xs text-muted">
                Managed &amp; triaged in ClickUp &amp; Linear
              </span>
            </div>

            <p className="mt-2 text-sm sm:text-base text-fg-2 max-w-2xl">
              High-severity bugs identified by Mahi during functional, boundary, integration, and API testing before customer impact.
            </p>

            <div className="mt-5 grid gap-3.5 sm:grid-cols-3 items-stretch">
              {project.deepDive.defectsCaught.map((defect, dfIdx) => (
                <div
                  key={dfIdx}
                  className="flex flex-col justify-between rounded-2xl border border-line/80 bg-ink-2/70 p-5 transition-all hover:border-accent/40 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase",
                          defect.severity === "Critical"
                            ? "border border-red-500/40 bg-red-500/15 text-red-400"
                            : "border border-amber-500/40 bg-amber-500/15 text-amber-400"
                        )}
                      >
                        {defect.severity}
                      </span>
                      <span className="font-mono text-[10px] text-muted">Defect #{dfIdx + 1}</span>
                    </div>

                    <h3 className="mt-3 text-sm sm:text-base font-bold text-fg">
                      {defect.issue}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-fg-2">
                    {defect.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Methods Breakdown */}
        <section className="container-x mt-7 sm:mt-10">
          <div className="rounded-3xl border border-line bg-card/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent">
              <Wrench className="size-4" />
              <span>Technology Stack &amp; Quality Tools</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-fg">
              Tools Employed on this Project
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {project.deepDive.toolsUsed.map((toolGroup) => (
                <div
                  key={toolGroup.category}
                  className="flex flex-col justify-between rounded-2xl border border-line/70 bg-ink-2/50 p-5 h-full"
                >
                  <div>
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-light">
                      {toolGroup.category}
                    </h3>
                    <ul className="mt-3.5 flex flex-wrap gap-2">
                      {toolGroup.list.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-lg border border-line/80 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] sm:text-xs text-fg hover:border-accent/30 transition-colors"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous & Next Case Study Navigation */}
        <section className="container-x mt-7 sm:mt-10">
          <div className="border-t border-line/80 pt-6">
            <p className="font-mono text-xs text-muted uppercase tracking-wider">
              Browse More Case Studies
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 items-stretch">
              {/* Previous Project Card */}
              <Link
                href={`/work/${prevProject.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card/60 p-5 sm:p-6 transition-all hover:border-accent/50 hover:bg-card h-full"
              >
                <div>
                  <span className="font-mono text-xs text-muted flex items-center gap-1.5 group-hover:text-accent transition-colors">
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    Previous Case Study
                  </span>
                  <h3 className="mt-2 text-base sm:text-lg font-bold text-fg group-hover:text-accent transition-colors">
                    {prevProject.name}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-xs text-muted">{prevProject.category}</p>
              </Link>

              {/* Next Project Card */}
              <Link
                href={`/work/${nextProject.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card/60 p-5 sm:p-6 text-right transition-all hover:border-accent/50 hover:bg-card h-full"
              >
                <div>
                  <span className="font-mono text-xs text-muted flex items-center justify-end gap-1.5 group-hover:text-accent transition-colors">
                    Next Case Study
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <h3 className="mt-2 text-base sm:text-lg font-bold text-fg group-hover:text-accent transition-colors">
                    {nextProject.name}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-xs text-muted">{nextProject.category}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Footer Section */}
        <section className="container-x mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-card via-card/80 to-ink-2 p-7 sm:p-12 text-center shadow-[0_30px_90px_-20px_rgba(255,107,53,0.2)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-72 rounded-full bg-accent/20 blur-3xl"
            />
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Need Reliable QA Engineering?
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-fg max-w-xl mx-auto">
              Let&apos;s build software your users can trust.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-fg-2 max-w-lg mx-auto">
              Reach out for manual testing, end-to-end automation with Playwright/Selenium, or API test suites.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold text-ink shadow-[0_0_25px_rgba(255,107,53,0.4)] transition-all hover:bg-accent-light hover:scale-105"
              >
                Email Mahi
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-fg transition-all hover:border-accent/40 hover:bg-card"
              >
                LinkedIn Profile <ExternalLink className="size-3.5" />
              </a>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-fg transition-all hover:border-accent/40 hover:bg-card"
              >
                View All Experience
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-8">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">
            © 2026 {profile.name} · {profile.title}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-xs text-muted hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/#work" className="font-mono text-xs text-muted hover:text-accent transition-colors">
              Experience
            </Link>
            <Link href="/#contact" className="font-mono text-xs text-muted hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
