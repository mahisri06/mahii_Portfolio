# Mahi Srivastava — QA Engineer Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis · Magic UI components.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content in one place

All copy, metrics, projects and links live in [`data/portfolio.ts`](data/portfolio.ts).

| What | Where |
| --- | --- |
| Real photos | Drop `mahi-hero.jpg`, `mahi-about.jpg`, `mahi-personal.jpg` into `public/images/`. Local files are used automatically; until then the Unsplash placeholders in `images` are shown. |
| Resume | Replace `public/resume/Mahi-Srivastava-Resume.pdf` (currently a placeholder). |
| Email / phone | Set `profile.email` / `profile.phone`. While empty they are hidden and "Let's connect" opens LinkedIn. |
| Domain | Set `NEXT_PUBLIC_SITE_URL` (used for canonical URL, OG tags, sitemap, robots). |

## Structure

```
app/            layout (fonts, SEO), page, robots, sitemap, OG image, icon
components/
  sections/     Navbar, Hero, Stats, About, Skills, QALab, Experience, Projects,
                ProjectModal, Automation, Process, Learning, Education, Beyond,
                Contact, Footer, Background
  visuals/      Abstract project mockups (clearly labelled, not client UIs)
  ui/           Magic UI (number-ticker, border-beam, marquee, magic-card) + primitives
  providers/    Lenis smooth scroll + MotionConfig, desktop custom cursor
lib/            animation variants, constants, server-side image resolver
data/           portfolio.ts — single source of truth
```

Add more Magic UI components with `npx shadcn@latest add @magicui/<name>`.
