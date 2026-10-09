"use client"

import Image, { type ImageProps } from "next/image"
import { useEffect, useState } from "react"

import type { ResolvedImage } from "@/lib/images"

type Props = Omit<ImageProps, "src" | "alt"> & { image: ResolvedImage; alt?: string }

/** next/image with a second line of defence: swaps to the fallback URL on error. */
export function SmartImage({ image, alt, ...rest }: Props) {
  const [src, setSrc] = useState(image.src)

  useEffect(() => {
    setSrc(image.src)
  }, [image.src])

  return (
    <Image
      key={image.src}
      {...rest}
      src={src}
      alt={alt ?? image.alt}
      onError={() => {
        if (src !== image.fallback) setSrc(image.fallback)
      }}
    />
  )
}
