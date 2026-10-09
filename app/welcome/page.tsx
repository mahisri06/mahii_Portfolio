"use client"

import { ArrowRight, Download, FileText, Sparkles } from "lucide-react"
import Link from "next/link"

import { Background } from "@/components/sections/Background"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-fg">
      <Background />

      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-12">
        <Link href="/" className="group flex items-center gap-2.5 font-extrabold tracking-tight">
          <span className="relative grid size-8 place-items-center rounded-lg border border-accent/40 bg-accent/10">
            <span className="size-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
          </span>
          <span className="text-base font-bold tracking-tight">{profile.shortName}</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-2 font-mono text-xs text-fg-2 transition-all hover:border-accent/40 hover:text-fg"
          >
            <span>Skip to Portfolio</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Welcome Container */}
      <main className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center px-6 pb-16 text-center">
        {/* Greeting Display */}
        <div className="mt-4 max-w-3xl">
          <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg">
            <span className="text-accent-gradient block sm:inline">Bonjour!</span>{" "}
            <span className="text-fg">Mahi this side.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-2xl font-medium leading-relaxed text-fg-2 max-w-2xl mx-auto">
            Senior QA Engineer specializing in Test Automation, API testing, and zero-defect deployments across FinTech, Healthcare, and SaaS platforms.
          </p>
        </div>

        {/* Status badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-muted">
          <span className="flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3.5 py-1.5 font-semibold text-success">
            <span className="pulse-dot size-1.5 bg-success" />
            Available for QA Engineering roles
          </span>
          <span className="rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-fg-2">
            Noida, UP, India
          </span>
          <span className="rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-fg-2">
            Playwright · Selenium · Postman
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-4 font-mono text-sm font-bold text-ink shadow-[0_0_35px_rgba(255,107,53,0.45)] transition-all duration-300 hover:scale-105 hover:bg-accent-light"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card/70 px-6 py-4 font-mono text-sm font-semibold text-fg transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            <FileText className="size-4" />
            <span>Case Studies</span>
          </Link>

          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card/70 px-6 py-4 font-mono text-sm font-semibold text-fg transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            <Download className="size-4" />
            <span>Resume</span>
          </a>
        </div>
      </main>
    </div>
  )
}
