import type { MetadataRoute } from "next"

import { projects } from "@/data/portfolio"
import { SITE_URL } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
  return routes
}
