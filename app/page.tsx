import { About } from "@/components/sections/About"
import { Background } from "@/components/sections/Background"
import { Beyond } from "@/components/sections/Beyond"
import { Contact } from "@/components/sections/Contact"
import { Education } from "@/components/sections/Education"
import { Experience } from "@/components/sections/Experience"
import { Footer } from "@/components/sections/Footer"
import { Hero } from "@/components/sections/Hero"
import { Learning } from "@/components/sections/Learning"
import { Navbar } from "@/components/sections/Navbar"
import { QALab } from "@/components/sections/QALab"
import { Skills } from "@/components/sections/Skills"
import { Stats } from "@/components/sections/Stats"
import { IntroGreeting } from "@/components/ui/IntroGreeting"
import { profile, projects } from "@/data/portfolio"
import { SEO, SITE_URL } from "@/lib/constants"
import { resolveImages } from "@/lib/images"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: SEO.description,
  url: SITE_URL,
  sameAs: [profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Bingo Manufacturing and Marketing Pvt. Ltd." },
  knowsAbout: ["Manual Testing", "Automation Testing", "Selenium WebDriver", "Playwright", "API Testing", "Postman", "FinTech Testing"],
  subjectOf: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, about: p.category })),
}

export default function Home() {
  const images = resolveImages()
  return (
    <>
      <IntroGreeting />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Background />
      <Navbar />
      <main id="main">
        <Hero image={images.heroImage} />
        <Stats />
        <About image={images.aboutImage} />
        <Skills />
        <QALab />
        <Experience />
        <Learning />
        <Education />
        <Beyond image={images.personalImage} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
