import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Briefcase, Calendar, CheckCircle2, MapPin } from "lucide-react"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { profile, projects } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Case Studies in Quality Engineering | Mahi Srivastava",
  description:
    "Explore in-depth QA engineering and test automation case studies across Food Tech SaaS, Healthcare Telehealth EHR, and Enterprise Data Analytics by Mahi Srivastava.",
  alternates: {
    canonical: "/work",
  },
}

export default function WorkIndexPage() {
  return (
    <div className="relative min-h-screen bg-ink text-fg antialiased selection:bg-accent selection:text-ink">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,107,53,0.12),transparent_70%)]"
      />

      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-xl">
        <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-xs font-semibold text-fg-2 transition-colors hover:text-accent"
          >
            <span className="grid size-8 place-items-center rounded-full border border-line bg-card/60 transition-transform group-hover:-translate-x-1 group-hover:border-accent/40 group-hover:bg-accent/10">
              <ArrowLeft className="size-3.5 text-fg group-hover:text-accent" />
            </span>
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-ink"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </header>

      <main className="container-x pt-8 sm:pt-14 pb-16 sm:pb-20">
        <div className="max-w-3xl">
          <p className="label-mono text-accent">Selected Case Studies</p>
          <h1 className="mt-3 text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-fg">
            Engineering trust into every release.
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-fg-2">
            Detailed breakdowns of quality strategy, Playwright/Selenium test automation, REST API validation, and critical defect discoveries across multi-tenant SaaS, healthcare EHR compliance, and enterprise analytics platforms.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="mt-8 sm:mt-12 grid gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-3xl border border-line/80 bg-card/60 p-6 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.15)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/50 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                    <Briefcase className="size-5" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-accent-light block">
                      {p.category}
                    </span>
                    <span className="font-mono text-[11px] text-muted block">
                      {p.company} · {p.period}
                    </span>
                  </div>
                </div>

                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                  {p.role}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
                  {p.name}
                </h2>
                <p className="mt-2 text-base text-accent-light font-medium">
                  {p.headline.join(" ")}
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-2 max-w-3xl">
                  {p.summary}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-6 rounded-2xl border border-line/60 bg-ink-2/50 p-4 sm:p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-light">
                  Key QA Accomplishments:
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-xs sm:text-[13px] text-fg-2">
                  {p.workBullets.slice(0, 4).map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics & CTA Link */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/50 pt-5">
                <ul className="flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <li
                      key={m.label}
                      className="rounded-lg border border-line bg-ink/70 px-3 py-1.5 font-mono text-xs"
                    >
                      <span className="font-bold text-accent">{m.value}</span>{" "}
                      <span className="text-muted">{m.label}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/work/${p.id}`}
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold text-ink shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all hover:bg-accent-light hover:scale-105"
                >
                  Explore Full Case Study
                  <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

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
