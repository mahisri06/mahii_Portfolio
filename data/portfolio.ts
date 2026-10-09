/**
 * Single source of truth for all portfolio content.
 *
 * To swap in real photographs, drop files into /public/images using the
 * paths below. If a local file is missing the matching `fallback` URL is used
 * automatically (resolved on the server, so no broken-image requests).
 */

export type ImageAsset = {
  src: string
  fallback: string
  alt: string
}

export const images = {
  heroImage: {
    src: "/images/mahi-portrait.jpg",
    fallback:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    alt: "Portrait of Mahi Srivastava, QA Engineer",
  },
  aboutImage: {
    src: "/images/mahi-about.jpg",
    fallback:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
    alt: "Mahi Srivastava at work",
  },
  personalImage: {
    src: "/images/mahi-personal.jpg",
    fallback:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    alt: "Mahi Srivastava collaborating with a colleague",
  },
} satisfies Record<string, ImageAsset>

export type ImageKey = keyof typeof images

export const profile = {
  name: "Mahi Srivastava",
  shortName: "MAHI",
  title: "Sr. QA Engineer",
  tagline: "QA Engineer | Manual & Automation Testing | Selenium | Playwright | API Testing",
  location: "Noida, UP, India",
  coordinates: "28.53° N · 77.39° E",
  linkedin: "https://www.linkedin.com/in/mahisrivastava063",
  linkedinLabel: "linkedin.com/in/mahisrivastava063",
  email: "mahisrivastava0603@gmail.com",
  phone: "+91 96968 19365",
  resume: "/resume/Mahi-Srivastava-Resume.pdf",
}

export const navLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const

export type NavId = (typeof navLinks)[number]["id"]

export const hero = {
  eyebrow: ["QA Engineer", "Manual + Automation"],
  heading: ["Make software", "worth", "trusting."],
  lead: "I build confidence in complex software through thoughtful testing, automation and continuous quality improvement.",
  sub: "2+ years of experience in Manual & Automation Testing across Healthcare, Restaurant, Analytics and Fintech domains.",
  floatingCards: [
    { id: "regression", kicker: "✓ Automated", value: "Regression", tone: "success" },
    { id: "api", kicker: "API", value: "200 OK", tone: "success" },
    { id: "coverage", kicker: "Coverage", value: "98%", tone: "accent" },
    { id: "cases", kicker: "Test cases", value: "150+", tone: "accent" },
  ],
} as const

export type Stat = { value: number; suffix: string; label: string }

export const stats: Stat[] = [
  { value: 2, suffix: "+", label: "Years experience" },
  { value: 150, suffix: "+", label: "Test cases" },
  { value: 98, suffix: "%", label: "Test coverage" },
  { value: 50, suffix: "%", label: "Less manual regression" },
]

export const toolTicker = [
  "Selenium WebDriver",
  "Playwright",
  "JavaScript",
  "Postman",
  "LambdaTest",
  "Android & iOS Mobile",
  "REST APIs",
  "JIRA",
  "Azure DevOps",
  "Git",
  "Agile / Scrum",
  "STLC · SDLC",
]

export const about = {
  heading: ["Quality is not", "the last step."],
  kicker: "It's built into every step.",
  paragraphs: [
    "QA Engineer specializing in Test Automation frameworks, AI-augmented validation strategies, and multi-tier quality engineering across Healthcare, Restaurant systems, Analytics pipelines, and Fintech ecosystems.",
    "Hands-on expertise in designing resilient end-to-end automation suites using Playwright, Selenium WebDriver, and JavaScript with Page Object Model (POM) architecture, cutting manual regression cycles by 50% while accelerating deployment cadences.",
    "Deep expertise across the complete STLC and SDLC—from requirement traceability matrices (RTM) and boundary-value edge cases to contract and schema-level REST API testing via Postman, and leveraging AI tooling for intelligent test case generation and defect root-cause analysis in Agile/Scrum teams.",
  ],
  highlight: "Continuous Quality & AI-Driven Test Automation",
  facts: [
    { k: "Role", v: "QA Engineer" },
    { k: "Core Domains", v: "Healthcare · Restaurant · Analytics · Fintech" },
    { k: "Automation & AI", v: "Playwright · Selenium · AI Test Generation" },
    { k: "QA Discipline", v: "E2E Suites · REST APIs · STLC / RTM Gates" },
  ],
  engine: {
    title: "QA Engineer",
    focus: ["Automation", "AI Testing", "Reliability", "Coverage"],
    domains: ["Healthcare", "Restaurant", "Analytics", "Fintech"],
  },
}

export type SkillIcon =
  | "bot"
  | "theater"
  | "braces"
  | "globe"
  | "layers"
  | "send"
  | "server"
  | "arrowIn"
  | "arrowOut"
  | "alert"
  | "hand"
  | "repeat"
  | "check"
  | "plug"
  | "flame"
  | "flask"
  | "list"
  | "workflow"
  | "kanban"
  | "target"
  | "git"
  | "rocket"
  | "zap"
  | "sparkles"

export type Skill = {
  name: string
  detail: string
  icon: SkillIcon
  tag?: string
  featured?: boolean
}

export type SkillGroup = {
  id: string
  title: string
  caption: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "automation",
    title: "Automation & AI",
    caption: "Repeatable & intelligent test execution",
    skills: [
      { name: "Playwright", detail: "End-to-end automation · JavaScript & headless runs", icon: "theater", tag: "E2E", featured: true },
      { name: "Selenium WebDriver", detail: "Cross-browser suites · Java/JS · Reusable frameworks", icon: "bot", tag: "WEB", featured: true },
      { name: "AI-Augmented QA", detail: "Prompt-based test generation · Predictive regression", icon: "sparkles", tag: "AI", featured: true },
      { name: "JavaScript / TypeScript", detail: "Automation logic, custom assertions & scripts", icon: "braces", tag: "LANG", featured: true },
      { name: "Page Object Model (POM)", detail: "Modular, maintainable & decoupled test architectures", icon: "layers", tag: "DESIGN" },
      { name: "Cross-Browser Testing", detail: "Chrome, Firefox, Safari & Edge compatibility", icon: "globe", tag: "UI" },
    ],
  },
  {
    id: "api",
    title: "API Testing",
    caption: "Contract, endpoint & schema validation",
    skills: [
      { name: "Postman", detail: "Collections, Newman CLI runs & test assertions", icon: "send", tag: "TOOL", featured: true },
      { name: "RESTful API Testing", detail: "HTTP methods, payload checks, headers & status codes", icon: "server", tag: "REST", featured: true },
      { name: "JSON Schema Validation", detail: "Contract testing, response structure & data types", icon: "arrowIn", tag: "SCHEMA" },
      { name: "Auth & Token Verification", detail: "Bearer tokens, OAuth 2.0 flows & session security", icon: "alert", tag: "SECURITY" },
    ],
  },
  {
    id: "testing",
    title: "Manual & STLC",
    caption: "Structured test design & quality gates",
    skills: [
      { name: "Mobile App Testing", detail: "Android & iOS real devices · Gestures, responsiveness & latency", icon: "globe", tag: "MOBILE", featured: true },
      { name: "Test Case Design", detail: "Boundary Value Analysis & Equivalence Partitioning", icon: "list", tag: "DESIGN", featured: true },
      { name: "Regression Testing", detail: "Continuous regression runs to protect core flows", icon: "repeat", tag: "SUITES", featured: true },
      { name: "Functional & UI Testing", detail: "Validating user journeys against acceptance criteria", icon: "check", tag: "FUNCTIONAL" },
      { name: "Integration Testing", detail: "Cross-service data flows & third-party integrations", icon: "plug", tag: "INTEGRATION" },
      { name: "RTM & Defect Lifecycle", detail: "Traceability matrix, severity triage & resolution", icon: "workflow", tag: "STLC" },
      { name: "Smoke & Sanity Testing", detail: "Rapid build health verification prior to releases", icon: "flame", tag: "GATES" },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    caption: "Ecosystem, tracking & build pipelines",
    skills: [
      { name: "LambdaTest", detail: "Real-device cloud grid · Android & iOS mobile app validation", icon: "globe", tag: "MOBILE", featured: true },
      { name: "JIRA", detail: "Sprint defect tracking, Agile ceremonies & workflows", icon: "kanban", tag: "AGILE", featured: true },
      { name: "Azure DevOps", detail: "Test Plans, work items, boards & backlog tracking", icon: "workflow", tag: "MANAGEMENT" },
      { name: "Git & GitHub", detail: "Version control, PR reviews & test suite branches", icon: "git", tag: "VCS", featured: true },
      { name: "CI/CD & Jenkins", detail: "Pipeline-triggered regression & build validation", icon: "rocket", tag: "CI/CD" },
    ],
  },
]

export const qaLab = {
  runId: "#2026",
  command: "npx playwright test --project=regression",
  rows: [
    { name: "Login validation", status: "pass", time: "0.84s" },
    { name: "API authentication", status: "pass", time: "0.31s" },
    { name: "Checkout workflow", status: "pass", time: "2.12s" },
    { name: "Availability rules", status: "pass", time: "1.07s" },
    { name: "Regression suite", status: "pass", time: "4.56s" },
    { name: "Edge-case validation", status: "warn", time: "0.92s" },
  ] as { name: string; status: "pass" | "warn"; time: string }[],
  passed: 124,
  failed: 4,
  coverage: 98,
}

export type Metric = { value: string; label: string }

export type ArchitectureStep = {
  title: string
  badge: string
  description: string
}

export type CaseStudyDeepDive = {
  problemContext: string
  qaArchitecture: ArchitectureStep[]
  coreScenarios: { title: string; type: string; description: string }[]
  defectsCaught: { issue: string; severity: "Critical" | "High" | "Medium"; outcome: string }[]
  toolsUsed: { category: string; list: string[] }[]
  deliverables: string[]
}

export type Project = {
  id: string
  index: string
  name: string
  category: string
  headline: string[]
  summary: string
  metrics: Metric[]
  scope: string[]
  impact: string
  visual: "restaurant" | "telehealth" | "analytics"
  workBullets: string[]
  role: string
  company: string
  period: string
  location: string
  deepDive: CaseStudyDeepDive
  detail: {
    overview: string
    challenge: string
    approach: string
    testing: string[]
    tools: string[]
    impact: string[]
  }
}

export const projects: Project[] = [
  {
    id: "case-01",
    index: "01",
    name: "Restaurant & Food Ordering System",
    category: "Food Tech / Hospitality SaaS",
    headline: ["Quality at", "multi-outlet scale."],
    summary:
      "QA Engineer for a multi-tenant SaaS platform, independently owning end-to-end quality assurance across Pickup, Delivery and Curbside order workflows.",
    metrics: [
      { value: "150+", label: "Test cases" },
      { value: "98%", label: "Coverage" },
      { value: "30+", label: "Critical defects" },
    ],
    scope: [
      "Business hours vs fulfillment hours",
      "Item-level availability",
      "Timezone-based scheduling",
      "POS integrations",
      "Pricing synchronization",
      "Real-time data consistency",
    ],
    impact:
      "Identified and resolved 30+ critical POS integration defects and achieved 98% test coverage.",
    visual: "restaurant",
    role: "QA Engineer",
    company: "Knovator Technologies Pvt. Ltd.",
    period: "March 2024 — April 2026",
    location: "Surat, Gujarat",
    workBullets: [
      "QA Engineer owning end-to-end QA across Pickup, Delivery, and Curbside workflows for multi-tenant outlets.",
      "Tested mobile ordering app on real Android & iOS devices using LambdaTest, validating responsive UI, push notifications, and curbside check-in.",
      "Designed 150+ structured test cases (98% coverage) for business hours, item availability, and timezone scheduling.",
      "Resolved 30+ critical POS integration defects, including pricing sync failures and inventory drifts.",
      "Built automated regression suites using Selenium WebDriver & Playwright (JS), cutting manual regression by 50%.",
      "Conducted REST API validation with Postman and managed sprints/bug triage in ClickUp.",
    ],
    deepDive: {
      problemContext:
        "The SaaS solution served multi-tenant restaurant brands across varied geographic regions with distinct outlet operating hours, fulfillment buffers, pickup time slots, curbside geofencing, and third-party POS integrations. Inconsistencies between POS pricing and cloud checkout menus caused cart abandons, while scheduling boundary bugs allowed customer orders outside kitchen operating windows.",
      qaArchitecture: [
        {
          title: "Requirement Traceability Matrix",
          badge: "RTM & STLC",
          description:
            "Linked 150+ acceptance criteria to automated & manual test cases across Pickup, Delivery, and Curbside fulfillment modes.",
        },
        {
          title: "Operating Hour Boundary Analysis",
          badge: "Boundary & Edge",
          description:
            "Validated operating vs fulfillment hour crossovers, midnight trading transitions, prep-time buffers, and holiday trading calendars.",
        },
        {
          title: "Automated Checkout Regression",
          badge: "Playwright / E2E",
          description:
            "Built E2E automated regression suite in JavaScript using Playwright & Selenium WebDriver covering the full customer checkout journey.",
        },
        {
          title: "Real-Device Mobile App Testing",
          badge: "LambdaTest Cloud",
          description:
            "Tested mobile app journeys on real Android & iOS devices via LambdaTest, validating touch gestures, outlet GPS, and push alerts.",
        },
        {
          title: "REST API & POS Webhook Suites",
          badge: "Postman / API",
          description:
            "Validated POS webhook delivery, price sync endpoints, discount calculations, and order dispatch JSON payloads.",
        },
        {
          title: "Defect Lifecycle & SLA Triage",
          badge: "ClickUp / Agile",
          description:
            "Managed sprint bug triage in ClickUp under 2-week Agile cycles, tracking defect severities, verification logs, and release gates.",
        },
      ],
      coreScenarios: [
        {
          title: "Operating vs Fulfillment Hours",
          type: "Boundary Value",
          description:
            "Validated orders placed at T-minus 1 minute to closing, kitchen buffer limits, and scheduled pre-orders crossing midnight.",
        },
        {
          title: "Item Modifier & Stock Drift",
          type: "Integration",
          description:
            "Simulated out-of-stock modifiers on POS systems during active customer sessions to verify graceful cart re-validation.",
        },
        {
          title: "Mobile App Testing (Android & iOS via LambdaTest)",
          type: "Mobile Testing",
          description:
            "Tested restaurant mobile app on real Android & iOS via LambdaTest, validating touch gestures, order flows, push alerts, and network switching.",
        },
        {
          title: "Curbside Arrival & Dispatch",
          type: "E2E Workflow",
          description:
            "Tested arrival notification webhooks, parking spot metadata persistence, and kitchen display ticket generation.",
        },
        {
          title: "Multi-Outlet Tax & Surcharges",
          type: "Calculations",
          description:
            "Checked jurisdiction-based tax calculations and service charge percentages across 5 distinct franchise outlet configurations.",
        },
        {
          title: "Cross-Device Cart & Session Continuity",
          type: "Cross-Platform",
          description:
            "Verified real-time cart state, applied coupon codes, and order tracking continuity between Android/iOS mobile apps and web ordering portals.",
        },
      ],
      defectsCaught: [
        {
          issue: "POS Price Synchronization Race Condition",
          severity: "Critical",
          outcome:
            "Discovered an async race condition where discounts updated on the POS were dropped during payment tokenization; fixed before multi-tenant launch.",
        },
        {
          issue: "Timezone Boundary Order Scheduling",
          severity: "Critical",
          outcome:
            "Identified timezone parsing bug converting UTC dates incorrectly, causing next-day curbside orders to default to immediate kitchen dispatch.",
        },
        {
          issue: "Modifier Price Recalculation Drift",
          severity: "High",
          outcome:
            "Caught item customization bug where removing an add-on retained the surcharge in checkout total calculation.",
        },
      ],
      toolsUsed: [
        {
          category: "Automation & Frameworks",
          list: ["Playwright", "Selenium WebDriver", "JavaScript", "Page Object Model (POM)"],
        },
        {
          category: "Mobile Testing (LambdaTest)",
          list: ["LambdaTest Cloud Grid", "Android Mobile Testing", "iOS Mobile Testing", "Responsive Emulation"],
        },
        {
          category: "API & Webhooks",
          list: ["Postman", "Newman", "RESTful Endpoints", "JSON Schema Validation"],
        },
        {
          category: "Management & STLC",
          list: ["ClickUp", "JIRA", "RTM", "Agile / Scrum", "Test Case Design"],
        },
      ],
      deliverables: [
        "Master Test Strategy & Coverage Plan across 3 fulfillment modes",
        "150+ Documented Test Scenarios in ClickUp",
        "Mobile App Test Execution Matrix (Android & iOS via LambdaTest)",
        "Automated Checkout Regression Test Suite (Playwright & Selenium)",
        "Postman API Collection for POS Webhook & Endpoint Validation",
        "Sprint Bug Metrics & Defect Burn-down Reports",
      ],
    },
    detail: {
      overview:
        "A multi-tenant SaaS platform for restaurants handling Pickup, Delivery and Curbside orders. As QA Engineer, Mahi owned quality end-to-end across web and mobile apps.",
      challenge:
        "Every order depends on overlapping rules — business hours vs fulfillment hours, item-level availability and timezone-based scheduling — while menus and pricing stay in sync with POS systems in real time across web and mobile platforms.",
      approach:
        "Independently owned QA across all three order workflows on web and mobile (Android & iOS via LambdaTest), designing test cases around scheduling and availability rules and validating integration behaviour with POS systems.",
      testing: [
        "Business hours vs fulfillment hours",
        "Mobile app testing (Android & iOS via LambdaTest)",
        "Item-level availability & modifiers",
        "Timezone-based scheduling",
        "POS integrations & pricing synchronization",
        "Real-time data consistency",
      ],
      tools: ["LambdaTest (Android & iOS)", "Selenium WebDriver", "Playwright", "Postman", "Test case design", "Defect management"],
      impact: [
        "150+ test cases authored",
        "98% test coverage achieved",
        "30+ critical POS integration defects identified and resolved",
      ],
    },
  },
  {
    id: "case-02",
    index: "02",
    name: "Omniva Telehealth Platform",
    category: "Healthcare / EHR-EMR",
    headline: ["Testing where", "reliability matters."],
    summary:
      "Authored and executed 100+ test cases for telehealth functionality and validated EHR/EMR compliance requirements.",
    metrics: [
      { value: "100+", label: "Test cases" },
      { value: "50%", label: "Less manual regression" },
      { value: "60+", label: "Defects managed" },
    ],
    scope: [
      "Telehealth functionality",
      "EHR/EMR compliance requirements",
      "Automated regression with Selenium & Playwright",
      "API testing with Postman",
      "Defect lifecycle management",
    ],
    impact:
      "Managed 60+ defects and improved defect resolution time by approximately 30%.",
    visual: "telehealth",
    role: "QA Engineer",
    company: "Knovator Technologies Pvt. Ltd.",
    period: "March 2024 — April 2026",
    location: "Surat, Gujarat",
    workBullets: [
      "Authored and executed 100+ test cases covering strict EHR/EMR compliance and healthcare privacy requirements.",
      "Conducted mobile app testing on real Android & iOS devices using LambdaTest, validating patient intake, biometric login, and mobile consultation responsiveness.",
      "Validated live WebRTC audio/video consultations, audio/video toggle locators, and appointment lifecycles.",
      "Built automated regression suites using Selenium WebDriver and Playwright (JS) that cut manual regression effort by 50%.",
      "Conducted REST API testing via Postman to validate medical encounter endpoints and payloads.",
      "Tracked and managed 60+ defects in ClickUp, accelerating average bug resolution turnaround by 30%.",
    ],
    deepDive: {
      problemContext:
        "Omniva Telehealth required strict adherence to EHR/EMR compliance standards, zero-data-loss patient records, and real-time audio/video consultations across patient and clinician portals. Flaky browser permissions, video session drops, and audit log discrepancies posed severe clinical and compliance risks.",
      qaArchitecture: [
        {
          title: "EHR/EMR Compliance Matrix",
          badge: "HIPAA & Audit",
          description:
            "Mapped healthcare data protection criteria to immutable audit trails, role-based patient chart access, and UTC server logs.",
        },
        {
          title: "Real-Device Mobile App Testing",
          badge: "LambdaTest Cloud",
          description:
            "Tested Omniva patient & clinician apps on Android & iOS via LambdaTest, validating biometric logins, push alerts, and responsive UI.",
        },
        {
          title: "WebRTC Real-Time Media Testing",
          badge: "Media Streams",
          description:
            "Validated camera/mic switching, packet-loss recovery, and call renegotiation across Chrome, Safari, Firefox, and Edge.",
        },
        {
          title: "E2E Consultation Automation",
          badge: "Playwright / POM",
          description:
            "Engineered Page Object Model regression suites with Playwright & Selenium covering booking, intake forms, and chart sign-offs.",
        },
        {
          title: "Medical Encounter API Suites",
          badge: "Postman / JWT",
          description:
            "Conducted contract-level API testing in Postman, validating JWT authorization, session headers, and medical payload schemas.",
        },
        {
          title: "Defect SLA & Priority Triage",
          badge: "ClickUp / Agile",
          description:
            "Triaged 60+ healthcare defects in ClickUp with strict severity SLAs, reducing turnaround time by 30% without production escapes.",
        },
      ],
      coreScenarios: [
        {
          title: "WebRTC Audio/Video Reconnection",
          type: "Real-Time Comms",
          description:
            "Simulated camera toggle, microphone mute/unmute locators, network drops, and auto-reconnect without patient room disconnection.",
        },
        {
          title: "EHR Audit Trail & Privacy Gates",
          type: "Compliance",
          description:
            "Verified that viewing medical records generated immutable audit log entries with verified clinician user IDs and UTC timestamps.",
        },
        {
          title: "Omniva Mobile App Testing (Android & iOS via LambdaTest)",
          type: "Mobile Testing",
          description:
            "Tested Omniva patient & clinician apps on Android & iOS via LambdaTest, validating biometric logins, permissions, and appointment alerts.",
        },
        {
          title: "Clinician Scheduling Concurrency",
          type: "Concurrency",
          description:
            "Tested simultaneous appointment bookings across overlapping patient sessions to prevent double-booking race conditions.",
        },
        {
          title: "Prescription Intake & Sign-off",
          type: "Functional",
          description:
            "Validated doctor signature workflows, medication dosage boundary validation, and secure PDF dispatch.",
        },
        {
          title: "Cross-Platform Video & Chat Continuity",
          type: "Cross-Platform",
          description:
            "Tested live WebRTC consultation session recovery and in-call secure messaging when patients switched between mobile devices (Android/iOS) and web browsers.",
        },
      ],
      defectsCaught: [
        {
          issue: "WebRTC Renegotiation Crash on Camera Switch",
          severity: "Critical",
          outcome:
            "Caught fatal WebRTC stream drop when doctors switched camera inputs on multi-monitor setups; resolved with fallback media track renegotiation.",
        },
        {
          issue: "EHR Encounter Timestamp Mismatch",
          severity: "Critical",
          outcome:
            "Discovered client-side timezone override that mismatched audit timestamps with server database records, failing compliance audit criteria.",
        },
        {
          issue: "Patient Intake Form Validation Bypass",
          severity: "High",
          outcome:
            "Identified missing server-side validation for required allergy disclosures when submitted via keyboard enter shortcut.",
        },
      ],
      toolsUsed: [
        {
          category: "Automation & Frameworks",
          list: ["Selenium WebDriver", "Playwright", "JavaScript", "Page Object Model (POM)"],
        },
        {
          category: "Mobile Testing (LambdaTest)",
          list: ["LambdaTest Cloud Grid", "Android Mobile Testing", "iOS Mobile Testing", "Biometric / Permission Gates"],
        },
        {
          category: "API & Protocols",
          list: ["Postman", "WebRTC Media Streams", "REST APIs", "JWT Authentication"],
        },
        {
          category: "Compliance & Management",
          list: ["ClickUp", "EHR/EMR Standards", "Agile / Scrum", "Defect Triage"],
        },
      ],
      deliverables: [
        "EHR/EMR Compliance Quality Gate Matrix",
        "100+ Telehealth Test Cases (Clinician & Patient)",
        "Omniva Mobile App Testing & Device Matrix (Android & iOS via LambdaTest)",
        "Automated Playwright/Selenium Regression Suite",
        "Postman API Test Suite with automated assertion checks",
        "60+ Documented and Resolved Defects in ClickUp",
      ],
    },
    detail: {
      overview:
        "A telehealth platform operating in the EHR/EMR space, where functional correctness, mobile reliability, and compliance requirements carry real weight.",
      challenge:
        "Telehealth functionality had to be validated against EHR/EMR compliance requirements across web and mobile platforms, while repeated manual regression slowed down release cycles.",
      approach:
        "Authored and executed 100+ test cases, conducted mobile app testing on Android & iOS using LambdaTest, and developed automated regression suites using Selenium WebDriver and Playwright with JavaScript. API behaviour was validated with Postman.",
      testing: [
        "Telehealth functionality & WebRTC streams",
        "Mobile app testing (Android & iOS via LambdaTest)",
        "EHR/EMR compliance validation",
        "Automated regression suites",
        "API testing with Postman",
      ],
      tools: ["LambdaTest (Android & iOS)", "Selenium WebDriver", "Playwright", "JavaScript", "Postman", "ClickUp"],
      impact: [
        "100+ test cases authored and executed",
        "~50% reduction in manual regression effort",
        "60+ defects managed",
        "~30% faster defect resolution",
      ],
    },
  },
  {
    id: "case-03",
    index: "03",
    name: "Enterprise Data Analytics & Reporting Platform",
    category: "Data Infrastructure & Analytics",
    headline: ["Validating", "data at scale."],
    summary:
      "Led end-to-end QA for a country-specific investment data reporting platform.",
    metrics: [
      { value: "20+", label: "Data issues identified" },
      { value: "Multi-region", label: "Reporting" },
      { value: "Admin + Web", label: "Portal" },
    ],
    scope: [
      "Admin panel",
      "Sector data",
      "Multi-region reporting",
      "Integration workflows",
      "Functional behaviour",
      "Data integrity",
    ],
    impact:
      "Identified 20+ data integrity issues and ensured consistent reporting outputs.",
    visual: "analytics",
    role: "QA Engineer",
    company: "Knovator Technologies Pvt. Ltd.",
    period: "March 2024 — April 2026",
    location: "Surat, Gujarat",
    workBullets: [
      "QA Engineer for country-specific investment data reporting platform serving government and institutional stakeholders.",
      "Validated administrative control panel, sectoral data categorization, and multi-region aggregation calculations.",
      "Identified 20+ critical data integrity issues and calculation formula discrepancies prior to production release.",
      "Automated defect sync between ClickUp and Linear using Zapier workflows, reducing defect logging overhead by ~40%.",
      "Verified consistent reporting outputs, cross-browser charts, and high-volume CSV/PDF data exports.",
      "Designed regression matrix across multi-year sectoral data to safeguard formula accuracy against dashboard upgrades.",
    ],
    deepDive: {
      problemContext:
        "A country-specific investment data platform aggregating economic and financial indicators across multiple industrial sectors and geographic regions. Data accuracy was paramount for institutional stakeholders and ministerial dashboards, where small aggregation errors could misrepresent multi-million-dollar capital flows.",
      qaArchitecture: [
        {
          title: "Data Integrity Validation Matrix",
          badge: "Calculations",
          description:
            "Compared raw database inputs against calculation engines and dashboard charts across 14 industry sectors down to the decimal.",
        },
        {
          title: "Role-Based Access Control Gates",
          badge: "RBAC / Security",
          description:
            "Validated permission boundaries across Admin panel, Data Analyst uploaders, and Executive viewers to prevent unauthorized exports.",
        },
        {
          title: "Cross-Format Report Reconciliation",
          badge: "Export Checks",
          description:
            "Verified large CSV, Excel, and PDF exports for formatting consistency, formula accuracy, cell alignments, and timeout handling.",
        },
        {
          title: "Automated Defect Sync Pipeline",
          badge: "Zapier DevOps",
          description:
            "Architected Zapier webhook pipelines syncing bug reproduction steps, status, and attachments between ClickUp and Linear.",
        },
        {
          title: "Cross-Viewport Responsive Matrix",
          badge: "Responsive / UI",
          description:
            "Validated complex data matrices, sticky table headers, and financial charts across ultra-wide desktop, laptop, and tablet viewports.",
        },
        {
          title: "Macroeconomic Formula Regression",
          badge: "Regression / STLC",
          description:
            "Tested multi-region currency conversions and YoY weighting algorithms, eliminating calculation drifts prior to ministerial rollout.",
        },
      ],
      coreScenarios: [
        {
          title: "Multi-Region Sector Aggregation",
          type: "Data Integrity",
          description:
            "Tested weighted averages, foreign currency conversion adjustments, and year-over-year percentage calculations across 14 industry sectors.",
        },
        {
          title: "Admin Data Import & Validation Gates",
          type: "Boundary / Schema",
          description:
            "Uploaded malformed CSV spreadsheets, special-character company names, and out-of-range figures to verify defensive ingestion alerts.",
        },
        {
          title: "High-Volume PDF/CSV Report Generation",
          type: "Export Consistency",
          description:
            "Verified large data export timeouts, cell formatting, font glyph rendering, and totals reconciliation.",
        },
        {
          title: "Defect Workflow Sync Automation",
          type: "DevOps Integration",
          description:
            "Architected Zapier webhook pipelines syncing defect status, reproduction steps, and screenshots between ClickUp and Linear.",
        },
        {
          title: "Cross-Viewport Responsive Data Tables",
          type: "Responsive / UI",
          description:
            "Tested dense financial data matrices and sticky-header table rendering across tablet and mobile viewport breakpoints to eliminate horizontal overflow clipping.",
        },
        {
          title: "RBAC Security & Export Privilege Enforcement",
          type: "Security / RBAC",
          description:
            "Verified privilege boundaries preventing read-only viewers from invoking raw data export APIs or modifying regional sectoral benchmarks.",
        },
      ],
      defectsCaught: [
        {
          issue: "Currency Aggregation Double-Conversion Drift",
          severity: "Critical",
          outcome:
            "Caught critical flaw where multi-regional currency sums were reconverted twice during PDF export, displaying false portfolio totals; corrected formula before release.",
        },
        {
          issue: "Null Sector Division by Zero in Charts",
          severity: "High",
          outcome:
            "Discovered front-end charting component crashing with NaN when filtering sectors with zero registered investments during specific fiscal quarters.",
        },
        {
          issue: "Admin Draft Publishing Privilege Escalation",
          severity: "High",
          outcome:
            "Identified authorization loophole where data uploaders could publish unapproved macroeconomic reports without supervisor sign-off.",
        },
      ],
      toolsUsed: [
        {
          category: "Data & Validation",
          list: ["Data Integrity Validation", "Excel/CSV Reconciliation", "Postman", "Chrome DevTools"],
        },
        {
          category: "Workflow Automation",
          list: ["Zapier Automation", "ClickUp", "Linear", "Webhook Integrations"],
        },
        {
          category: "Testing Disciplines",
          list: ["Functional Testing", "Integration Testing", "RBAC Security", "Export Verification"],
        },
        {
          category: "Web & API Testing",
          list: ["REST APIs", "Network Throttling", "JSON Schema", "Cross-Browser DevTools"],
        },
      ],
      deliverables: [
        "Data Integrity & Formula Validation Checklists",
        "Admin & Web Portal End-to-End Test Plan",
        "Zapier Defect Sync Automation Pipeline (40% time saved)",
        "20+ Critical Data Discrepancy Incident Reports",
        "Executive Dashboard Release Quality Sign-off Document",
        "Cross-Viewport Responsive Testing Matrix",
      ],
    },
    detail: {
      overview:
        "A country-specific investment data reporting platform with an admin panel and a web portal, serving multi-region reporting.",
      challenge:
        "Reports are only as trustworthy as the data behind them — sector data and multi-region outputs had to stay consistent across admin panel, integrations and web portal.",
      approach:
        "Led end-to-end QA across the admin panel and web portal, validating sector data, integration workflows, functional behaviour and data integrity.",
      testing: [
        "Admin panel",
        "Sector data",
        "Multi-region reporting",
        "Integration workflows",
        "Functional behaviour & data integrity",
      ],
      tools: ["Functional testing", "Integration testing", "Data integrity validation"],
      impact: ["20+ data integrity issues identified", "Consistent reporting outputs ensured"],
    },
  },
]

export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  location: string
  current: boolean
  domain: string
  tags: string[]
  description: string
  highlights: string[]
  metrics: { value: string; label: string }[]
}

export const experiences: ExperienceItem[] = [
  {
    id: "bingo",
    company: "Bingo Manufacturing and Marketing Pvt. Ltd.",
    role: "Sr. QA Engineer",
    period: "April 2026 — Present",
    location: "Noida, UP",
    current: true,
    domain: "FinTech | Staking & Investment Platforms",
    tags: ["FinTech", "Staking & Investments", "Agile / Scrum", "Postman", "ClickUp", "OWASP"],
    description:
      "Leading end-to-end QA ownership for high-stakes FinTech platforms with staking, yield rewards, and balance consistency across web and admin portals.",
    highlights: [
      "Performed end-to-end QA for fintech platforms with staking and investment features, covering wallet and balance handling, stake/unstake flows, reward calculation, and transaction history.",
      "Prepared a reusable Test Bank and detailed Test Scenarios for every module, supporting consistent regression and faster release validation.",
      "Designed and executed functional, integration, boundary-value, and negative test cases, including staking tenure rules, reward accuracy, and balance consistency.",
      "Validated financial calculations and data integrity across the web app and admin panel, identifying defects before production release.",
      "Conducted API Testing with Postman and tracked defects in ClickUp in an Agile/Scrum environment.",
      "Currently exploring Security Testing (OWASP Top 10, authentication and authorization flaws) and applying it to fintech workflows.",
    ],
    metrics: [
      { value: "100%", label: "Calculation integrity" },
      { value: "0", label: "Production escapes" },
      { value: "Full", label: "Module test bank" },
    ],
  },
  {
    id: "knovator",
    company: "Knovator Technologies Pvt. Ltd.",
    role: "QA Engineer",
    period: "March 2024 — April 2026",
    location: "Surat, Gujarat",
    current: false,
    domain: "SaaS | Healthcare | Data Analytics | Mobile Testing",
    tags: ["Mobile (Android & iOS)", "LambdaTest", "Healthcare EHR", "Restaurant POS", "Playwright", "Selenium", "Postman", "Zapier"],
    description:
      "Owned end-to-end QA across 3 major product verticals. Tested mobile apps on Android & iOS using LambdaTest for Omniva and Restaurant systems, and built automation suites using Playwright and Selenium cutting manual regression effort by 50%.",
    highlights: [
      "Mobile App Testing (Android & iOS): Executed comprehensive functional, UI, and compatibility testing for mobile applications (Omniva Telehealth and Restaurant Food Ordering) across real Android and iOS devices using LambdaTest cloud grid.",
      "Restaurant & Food Ordering SaaS (Multi-Outlet): QA Engineer owning end-to-end QA across Pickup, Delivery, and Curbside workflows on web and mobile (Android/iOS via LambdaTest). Designed 150+ test cases (98% coverage) and resolved 30+ critical POS integration defects.",
      "Omniva Telehealth (EHR/EMR Compliance & Mobile): Authored and executed 100+ test cases covering EHR/EMR compliance, WebRTC consultations, and mobile app functionality across Android & iOS devices on LambdaTest.",
      "Enterprise Data Analytics: QA Engineer for investment data reporting platform. Validated admin panel, sectoral data accuracy, and multi-region reports, identifying 20+ data integrity issues.",
      "Built and maintained automated regression suites using Selenium WebDriver and Playwright (JS), reducing manual regression effort by 50%.",
      "Conducted API Testing with Postman; automated defect sync between ClickUp and Linear using Zapier, reducing defect logging time by ~40%.",
    ],
    metrics: [
      { value: "50%", label: "Less manual regression" },
      { value: "150+", label: "Test cases designed" },
      { value: "98%", label: "Test coverage achieved" },
    ],
  },
]

export const experience = experiences[0]

export const automation = {
  manual: ["Repeated execution", "Long cycles", "Human effort", "Release delays"],
  automated: ["Selenium", "Playwright", "Reusable suites", "Faster releases"],
  reduction: 50,
}

export const processSteps = [
  { n: "01", title: "Understand", text: "Understand requirements and workflows." },
  { n: "02", title: "Plan", text: "Design test scenarios and coverage." },
  { n: "03", title: "Test", text: "Functional, integration, regression and edge cases." },
  { n: "04", title: "Automate", text: "Automate repeatable and high-value workflows." },
  { n: "05", title: "Validate", text: "API, data integrity and cross-system behavior." },
  { n: "06", title: "Release", text: "Support confident releases through clear defect reporting and collaboration." },
]

export const learning = {
  text: "Currently expanding expertise in CI/CD pipeline integration and security testing.",
  items: [
    { name: "Jenkins", status: ["Pipeline", "ready"], area: "CI/CD", kind: "pipeline" },
    { name: "GitHub Actions", status: ["Workflow", "active"], area: "CI/CD", kind: "workflow" },
    { name: "OWASP ZAP", status: ["Security", "next"], area: "Security", kind: "security" },
    { name: "Security Testing", status: ["Exploring", "now"], area: "Practice", kind: "shield" },
  ] as { name: string; status: [string, string]; area: string; kind: "pipeline" | "workflow" | "security" | "shield" | "load" | "perf" }[],
}

export const education = {
  degree: {
    short: "BALLB",
    name: "Bachelor of Arts & Legislative Law",
    college: "Narayan Law College, Jhalwa",
    university: "Allahabad State University, Prayagraj",
    year: "2025",
    score: "71.57%",
  },
  school: [
    { grade: "12th Grade", school: "V Care International School", year: "2020" },
    { grade: "10th Grade", school: "V Care English School", year: "2018" },
  ],
}

export const beyond = {
  lines: ["Curious by nature.", "Analytical by habit.", "Quality-driven by profession."],
}

export const contact = {
  heading: ["Have something", "that needs testing?"],
  sub: "Let's talk about quality, automation and better software.",
}
