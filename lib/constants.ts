/** Replace via NEXT_PUBLIC_SITE_URL once the site has a real domain. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahi-srivastava.example"

export const SEO = {
  title: "Mahi Srivastava | QA Engineer | Automation & Software Testing",
  description:
    "QA Engineer specializing in Manual Testing, Automation Testing, Playwright, Selenium, AI-augmented QA and API Testing across Healthcare, Restaurant, Analytics and Fintech.",
  keywords: [
    "QA Engineer",
    "Software Testing",
    "Automation Testing",
    "Manual Testing",
    "Selenium WebDriver",
    "Playwright",
    "API Testing",
    "Postman",
    "Mahi Srivastava",
  ],
}

/** Clearance for the floating nav; keep in sync with `scroll-padding-top` in globals.css. */
export const NAV_HEIGHT = 88
