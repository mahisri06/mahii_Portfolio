import "server-only"
import { existsSync } from "node:fs"
import path from "node:path"

import { images, type ImageKey } from "@/data/portfolio"

export type ResolvedImage = { src: string; fallback: string; alt: string }
export type ResolvedImages = Record<ImageKey, ResolvedImage>

/**
 * Uses the local photo in /public when it exists, otherwise the remote
 * placeholder. Resolved at render time on the server, so the browser never
 * requests a missing file.
 */
export function resolveImages(): ResolvedImages {
  const out = {} as ResolvedImages
  for (const key of Object.keys(images) as ImageKey[]) {
    const asset = images[key]
    const local = path.join(process.cwd(), "public", asset.src)
    out[key] = { ...asset, src: existsSync(local) ? asset.src : asset.fallback }
  }
  return out
}
