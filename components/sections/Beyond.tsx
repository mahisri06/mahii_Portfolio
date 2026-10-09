"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { RevealLines } from "@/components/ui/reveal"
import { SectionLabel } from "@/components/ui/section-header"
import { SmartImage } from "@/components/ui/smart-image"
import { beyond } from "@/data/portfolio"
import type { ResolvedImage } from "@/lib/images"

export function Beyond({ image }: { image: ResolvedImage }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section id="beyond" aria-labelledby="beyond-title" className="relative py-14 sm:py-18 lg:py-24">
      <div className="container-x">
        <SectionLabel label="Beyond the test case" />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div ref={ref} className="relative lg:col-span-6">
            <div className="group relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-card" data-cursor="EXPLORE">
              <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                <SmartImage
                  image={image}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover grayscale-[0.5] transition-[filter,transform] duration-1000 ease-(--ease-out-expo) group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </motion.div>
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(200deg,rgba(255,107,53,0.18),transparent_45%),linear-gradient(to_top,rgba(8,11,18,0.7),transparent_50%)]" />
              <p className="label-mono absolute bottom-5 left-5 text-fg-2">Human behind the test runs</p>
            </div>
          </div>

          <RevealLines
            id="beyond-title"
            lines={beyond.lines}
            gap={0.16}
            className="display text-[clamp(1.65rem,3.2vw,2.65rem)] lg:col-span-6"
            lineClassName={(i) => (i === 1 ? "text-outline" : i === 2 ? "text-accent-gradient" : undefined)}
          />
        </div>
      </div>
    </section>
  )
}
