"use client"

import type { MouseEvent } from "react"

import { useSmoothScroll } from "@/components/providers/smooth-scroll"
import { profile } from "@/data/portfolio"

const LINKS = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
]

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollTo(id)
  }

  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-2xl font-black tracking-tight uppercase text-fg">
            <span className="text-accent">MAHI</span> SRIVASTAVA
          </p>
          <p className="label-mono mt-2 font-semibold text-accent">{profile.title}</p>
          <p className="label-mono mt-6 text-muted">Manual Testing · Automation · API Testing</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="text-fg-2 transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-2 transition-colors hover:text-accent">
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col justify-between gap-6 md:col-span-3 md:items-end md:text-right">
          <a href="#top" onClick={(e) => go(e, "top")} className="label-mono text-fg-2 transition-colors hover:text-accent">
            Back to top ↑
          </a>
          <p className="label-mono text-muted">© 2026 {profile.name}</p>
        </div>
      </div>
      <div aria-hidden className="overflow-hidden">
        <p className="footer-watermark display translate-y-[18%] text-center text-[19vw] font-black leading-none tracking-tighter select-none">
          MAHI
        </p>
      </div>
    </footer>
  )
}
