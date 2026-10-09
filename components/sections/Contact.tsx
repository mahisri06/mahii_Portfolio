"use client"

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { motion } from "motion/react"

import { Cta } from "@/components/ui/cta"
import { LinkedinIcon } from "@/components/ui/linkedin-icon"
import { RevealGroup, RevealItem, RevealLines } from "@/components/ui/reveal"
import { SectionLabel } from "@/components/ui/section-header"
import { contact, profile } from "@/data/portfolio"
import { EASE_OUT, fadeUp, viewportOnce } from "@/lib/animations"

export function Contact() {
  const primaryHref = profile.email ? `mailto:${profile.email}` : profile.linkedin

  const details = [
    { icon: LinkedinIcon, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
    profile.email && { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
    profile.phone && { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, external: false },
    { icon: MapPin, label: "Location", value: profile.location, href: undefined, external: false },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; external: boolean }[]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-16 pb-14 lg:pt-24 lg:pb-18">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[38%] left-1/2 -z-10 h-[700px] w-[1100px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,53,0.28),rgba(255,107,53,0.06)_50%,transparent)] blur-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 2, ease: EASE_OUT }}
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 rotate-180 opacity-70" />

      <div className="container-x flex flex-col items-center text-center">
        <SectionLabel label="Contact" />
        <RevealLines
          id="contact-title"
          lines={contact.heading}
          gap={0.14}
          className="display mt-6 text-[clamp(1.9rem,4.8vw,3.6rem)]"
          lineClassName={(i) => (i === 1 ? "text-accent-gradient" : undefined)}
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl text-base text-fg-2 sm:text-lg"
        >
          {contact.sub}
        </motion.p>

        <motion.div
          className="relative mt-12 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.55, ease: EASE_OUT }}
        >
          <span aria-hidden className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-accent/25 blur-3xl" />
          <Cta href={primaryHref} external={!profile.email} size="lg">
            Let&apos;s connect
          </Cta>
          <Cta href={profile.resume} variant="ghost" icon="down" download size="lg">
            Download resume
          </Cta>
        </motion.div>

        <RevealGroup as="ul" className="mt-20 grid w-full max-w-4xl gap-px overflow-hidden rounded-2xl border border-line bg-line text-left sm:grid-cols-2 lg:mt-24" gap={0.07}>
          {details.map((d) => {
            const Icon = d.icon
            const inner = (
              <>
                <span className="grid size-10 flex-none place-items-center rounded-xl border border-line bg-white/[0.03] text-fg-2 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="label-mono block text-muted">{d.label}</span>
                  <span className="mt-1 block truncate text-[15px] font-semibold text-fg">{d.value}</span>
                </span>
                {d.href && (
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                )}
              </>
            )
            return (
              <RevealItem as="li" key={d.label} className="bg-ink-2">
                {d.href ? (
                  <a
                    href={d.href}
                    target={d.external ? "_blank" : undefined}
                    rel={d.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-card"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group flex items-center gap-4 px-5 py-5">{inner}</div>
                )}
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
