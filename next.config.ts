import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Placeholder photos; once real photos live in /public/images this can go.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
}

export default nextConfig
