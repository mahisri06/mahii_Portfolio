import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Manrope } from "next/font/google"

import { CustomCursor } from "@/components/providers/custom-cursor"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { profile } from "@/data/portfolio"
import { SEO, SITE_URL } from "@/lib/constants"

import "./globals.css"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: SEO.title,
    description: SEO.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${plexMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mahi-theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches)){document.documentElement.classList.add("light");document.documentElement.setAttribute("data-theme","light");}else{document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
            <CustomCursor />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
