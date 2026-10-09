"use client"

import {
  AppWindow,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bot,
  Braces,
  Check,
  CheckCircle2,
  CircleCheck,
  Copy,
  Flame,
  FlaskConical,
  GitBranch,
  Globe,
  Hand,
  Layers,
  ListChecks,
  Plug,
  Repeat,
  Rocket,
  Send,
  Server,
  Sparkles,
  SquareKanban,
  Target,
  Terminal,
  TriangleAlert,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useMemo, useState } from "react"

import { SectionHeader } from "@/components/ui/section-header"
import { skillGroups, type Skill, type SkillIcon } from "@/data/portfolio"
import { EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

const ICONS: Record<SkillIcon, LucideIcon> = {
  bot: Bot,
  theater: AppWindow,
  braces: Braces,
  globe: Globe,
  layers: Layers,
  send: Send,
  server: Server,
  arrowIn: ArrowDownToLine,
  arrowOut: ArrowUpFromLine,
  alert: TriangleAlert,
  hand: Hand,
  repeat: Repeat,
  check: CircleCheck,
  plug: Plug,
  flame: Flame,
  flask: FlaskConical,
  list: ListChecks,
  workflow: Workflow,
  kanban: SquareKanban,
  target: Target,
  git: GitBranch,
  rocket: Rocket,
  zap: Zap,
  sparkles: Sparkles,
}

type CodeSnippet = {
  filename: string
  language: string
  code: string
  status: string
  highlight: string
}

const SNIPPETS: Record<string, CodeSnippet> = {
  "Playwright": {
    filename: "tests/e2e/order-workflow.spec.ts",
    language: "typescript",
    status: "✓ PASS · 320ms · 0 Flaky Tests",
    highlight: "End-to-End Browser Automation with Page Object Model",
    code: `import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

test('verify multi-outlet order & pricing sync', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.navigate('/order/pickup');
  await checkout.selectItems(['ITEM_01', 'ITEM_02']);
  await checkout.applyPromoCode('DISCOUNT20');

  // Verify dynamic subtotal and tax assertions
  await expect(checkout.subtotal).toHaveText('$48.00');
  await checkout.submitOrder();
  await expect(page.locator('.order-status')).toHaveText('CONFIRMED');
});`,
  },

  "Selenium WebDriver": {
    filename: "src/test/java/com/qa/pages/LoginPage.java",
    language: "java",
    status: "✓ 14 Browsers Verified · Chrome/Firefox/Edge",
    highlight: "Cross-Browser Regression Suite with Explicit Waits",
    code: `@FindBy(id = "user-session-id") private WebElement userField;
@FindBy(id = "auth-submit-btn") private WebElement submitBtn;

public DashboardPage loginAsVerifiedUser(String email, String token) {
    wait.until(ExpectedConditions.visibilityOf(userField));
    userField.sendKeys(email);
    submitBtn.click();
    
    // Explicit assertion on dashboard URL routing
    wait.until(ExpectedConditions.urlContains("/dashboard"));
    return new DashboardPage(driver);
}`,
  },

  "AI-Augmented QA": {
    filename: "ai/prompt-eval/regression-targeting.py",
    language: "python",
    status: "✓ 24 Priority Suites Identified (-52% CI Runtime)",
    highlight: "Predictive Regression & LLM-Assisted Edge Case Generation",
    code: `# AI-Assisted Predictive Regression Targeting
def predict_affected_test_suites(git_diff_patch: str) -> list[str]:
    impact_graph = parse_ast_dependencies(git_diff_patch)
    priority_tests = model.predict_regression_scope(impact_graph)

    # Cuts execution time by 52% while
    # preserving 100% critical path coverage
    return prioritize_suites(priority_tests, max_runtime_sec=480)`,
  },

  "JavaScript / TypeScript": {
    filename: "utils/assertions/schema-validator.ts",
    language: "typescript",
    status: "✓ Type-Safe Test Assertions · Zero Type Escapes",
    highlight: "Reusable Custom Assertions & Automation Helper Utilities",
    code: `export function assertStrictContract<T>(
  payload: unknown,
  schema: Schema<T>
): asserts payload is T {
  const result = schema.safeParse(payload);
  if (!result.success) {
    throw new AssertionError(
      \`Contract mismatch: \${result.error.message}\`
    );
  }
}

export const expectWithinTolerance = (
  val: number,
  expected: number,
  delta = 0.01
) => {
  expect(Math.abs(val - expected)).toBeLessThanOrEqual(delta);
};`,
  },

  "Page Object Model (POM)": {
    filename: "pages/TelehealthRoomPage.ts",
    language: "typescript",
    status: "✓ Decoupled Page Layer · 100% Maintainable Selectors",
    highlight: "Modular Component-Driven UI Abstraction",
    code: `export class TelehealthRoomPage extends BasePage {
  readonly joinCallBtn = this.page.getByRole('button', {
    name: 'Join Session',
  });
  readonly micToggle = this.page.locator('[data-testid="audio-toggle"]');
  readonly remoteFeed = this.page.locator('#remote-video-feed');

  async verifyMediaHandshake() {
    await this.joinCallBtn.click();
    await expect(this.remoteFeed).toBeVisible({ timeout: 5000 });
  }
}`,
  },

  "Cross-Browser Testing": {
    filename: "playwright.config.ts",
    language: "typescript",
    status: "✓ Matrix Execution: Chromium, WebKit, Firefox & Mobile",
    highlight: "Parallel Multi-Viewport & Multi-Engine Compatibility Matrix",
    code: `export default defineConfig({
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
  ],
  workers: '75%',
  retries: process.env.CI ? 2 : 0,
});`,
  },

  "Postman": {
    filename: "postman/collections/restaurant-pos-api.json",
    language: "javascript",
    status: "✓ 18/18 Assertions Passed (42ms) · Status 200 OK",
    highlight: "API Collections, Newman Runner & Environment Assertions",
    code: `pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Order payload is valid", function () {
    const json = pm.response.json();
    pm.expect(json.status).to.eql("SUCCESS");
    pm.expect(json.orderId).to.match(/^[0-9a-fA-F-]{36}$/);
    pm.expect(json.fulfillmentTimeMs).to.be.below(450);
});`,
  },

  "RESTful API Testing": {
    filename: "tests/api/orders.endpoint.test.ts",
    language: "typescript",
    status: "✓ Contract Verified · Status 200 OK (38ms)",
    highlight: "Payload, Header, Status Code & Response Integrity",
    code: `const response = await request.post('/api/v2/orders/calculate', {
  headers: { Authorization: \`Bearer \${sessionToken}\` },
  data: {
    items: [{ sku: 'MEAL-01', qty: 2 }],
    outletId: 'OUTLET_SURAT_01',
  },
});

expect(response.status()).toBe(200);
const body = await response.json();
expect(body.taxAmount).toBeCloseTo(4.20, 2);
expect(body.currency).toBe('USD');`,
  },

  "JSON Schema Validation": {
    filename: "schemas/patient-ehr-record.schema.json",
    language: "json",
    status: "✓ Strict Schema Match · Zero Breaking Field Escapes",
    highlight: "Contract Definition & Strict Data-Type Guarantees",
    code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["patientId", "encounterDate", "providerId", "status"],
  "properties": {
    "patientId": { "type": "string", "pattern": "^MED-[0-9]{6}$" },
    "encounterDate": { "type": "string", "format": "date-time" },
    "status": { "enum": ["ACTIVE", "DISCHARGED", "SCHEDULED"] }
  }
}`,
  },

  "Auth & Token Verification": {
    filename: "tests/security/auth-interceptor.test.ts",
    language: "typescript",
    status: "✓ 401 Unauthorized Enforced · Zero Leakage",
    highlight: "Bearer Tokens, OAuth 2.0 & Protected Routes Validation",
    code: `// Verify Expired JWT Token Rejection
const expiredRes = await api.get('/api/v2/secure-financial-reports', {
  headers: { Authorization: \`Bearer \${expiredJwtToken}\` },
});

expect(expiredRes.status()).toBe(401);
expect(await expiredRes.json()).toEqual({
  error: 'UNAUTHORIZED',
  reason: 'TOKEN_EXPIRED',
});`,
  },

  "Test Case Design": {
    filename: "stlc/test-cases/TC-PAYMENT-042.md",
    language: "markdown",
    status: "✓ 100% Boundary Scenarios Tested & Documented",
    highlight: "Equivalence Partitioning & Boundary Value Analysis (BVA)",
    code: `### Test Case: TC-PAYMENT-042 (BVA Analysis)
- Target: Fintech wallet deposit gateway
- Pre-condition: Balance initialized at $0.00
- Boundary Values: [-0.01, 0.00, 0.01, 9999.99, 10000.00]
- Negative Test: Values <= 0.00 rejected with HTTP 422
- Threshold Gate: Value >= $10k triggers 2FA OTP prompt
- Result: PASS · Zero unhandled boundary conditions`,
  },

  "Regression Testing": {
    filename: "suites/regression-cycle-v2.6.log",
    language: "bash",
    status: "✓ 150/150 Regression Suite Cleared (0 Critical Bugs)",
    highlight: "Continuous Regression Shielding Core Business Workflows",
    code: `[REGRESSION TEST RUN #2026]
Executing 150 Test Cases across 4 Target Domains:
  ✓ Healthcare EHR Compliance:    45/45 Passed
  ✓ Restaurant Multi-Outlet Flow: 52/52 Passed
  ✓ Fintech Payment Gateways:     33/33 Passed
  ✓ Data Analytics Aggregation:   20/20 Passed

RESULT: 100% PASS RATE · READY FOR PRODUCTION`,
  },

  "Functional & UI Testing": {
    filename: "qa/matrix/acceptance-criteria-verification.md",
    language: "markdown",
    status: "✓ Acceptance Criteria Satisfied · Release Sign-off",
    highlight: "User Story Validation & Cross-Feature Verification",
    code: `PRD Spec #408: Timezone-Aware Order Scheduling
  Scenario: Pickup scheduled across EST/PST boundary
  Expected: Kitchen ticket prints in local outlet time
  Actual:   Match · Dispatched with 0ms clock drift
  Defects:  None · Edge case approved
  Sign-off: PASS · Mahi Srivastava (QA Engineer)`,
  },

  "Integration Testing": {
    filename: "tests/integration/pos-webhook.spec.ts",
    language: "typescript",
    status: "✓ Multi-System Data Handshake Verified",
    highlight: "Webhook Handshakes & Real-Time Sync Testing",
    code: `// Verify POS Webhook triggers Inventory Sync
await triggerPosWebhookEvent({
  event: 'ITEM_SOLD_OUT',
  itemId: 'ITEM_99',
});
await waitForQueueProcessing({ timeout: 2000 });

const item = await db.query(
  'SELECT stock_state FROM items WHERE id = ?',
  ['ITEM_99']
);
expect(item.stock_state).toBe('OUT_OF_STOCK');
expect(item.syncedAt).toBeDefined();`,
  },

  "RTM & Defect Lifecycle": {
    filename: "stlc/matrices/rtm-release-tracker.csv",
    language: "csv",
    status: "✓ 100% Traceability Covered · Zero Untested Requirements",
    highlight: "Requirement Traceability Matrix & Defect Severity Triage",
    code: `Req_ID,Feature_Desc,Test_Case_ID,Defect_ID,Severity,Status
REQ_102,POS Pricing Sync,TC_POS_01,BUG_789,CRITICAL,CLOSED
REQ_103,Telehealth Video,TC_EHR_09,BUG_812,MEDIUM,RESOLVED
REQ_104,Multi-Region Data,TC_DAT_04,BUG_850,HIGH,VERIFIED
REQ_105,Fintech Ledger,TC_FIN_12,NONE,-,PASSED`,
  },

  "Smoke & Sanity Testing": {
    filename: "ci/smoke-check-staging.sh",
    language: "bash",
    status: "✓ Deployment Build Certified Healthy in 42s",
    highlight: "Rapid Build Gate Checks Prior to Test Cycle Initiation",
    code: `#!/bin/bash
echo "==> Running Smoke Checks on Staging..."
curl -sf https://staging-api.example/health || exit 1
npx playwright test tests/smoke/critical-paths.spec.ts \\
  --reporter=list

echo "==> Health Check: OK. Safe for Pipeline."`,
  },

  "JIRA": {
    filename: "jira/agile-board/sprint-defect-metrics.json",
    language: "json",
    status: "✓ 0 Open Blockers · 100% Sprint Sign-off",
    highlight: "Sprint Defect Tracking, Bug Triage & Agile Ceremonies",
    code: `{
  "sprint": "Sprint 38 (Release 2.4)",
  "defectsLogged": 34,
  "defectsResolved": 34,
  "reopenRate": "0%",
  "rootCauses": { "Logic": 14, "Integration": 12, "UI": 8 },
  "qaSignOff": "APPROVED_FOR_RELEASE"
}`,
  },

  "Azure DevOps": {
    filename: "azure-devops/test-plans/suite-run.yaml",
    language: "yaml",
    status: "✓ Test Plan Synchronized · Pre-flight Approved",
    highlight: "Test Plans, Work Item Traceability & Backlog Alignment",
    code: `testPlan:
  id: 4892
  name: "Cross-Domain E2E Test Suite"
  automatedRuns: 120
  manualExploratorySessions: 14
  outcome: "Passed"
  environment: "Production Pre-flight"`,
  },

  "Git & GitHub": {
    filename: ".github/workflows/qa-regression.yml",
    language: "yaml",
    status: "✓ Branch Protected · Required Status Check Passed",
    highlight: "Version Control, PR Verification & Test Repositories",
    code: `name: Automated QA Gates
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright test --project=regression
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/`,
  },

  "CI/CD & Jenkins": {
    filename: "Jenkinsfile",
    language: "groovy",
    status: "✓ Pipeline Automated · Continuous QA Gate Enforced",
    highlight: "Automated Build Verification & Pipeline Regression",
    code: `pipeline {
    agent any
    stages {
        stage('Deploy Staging') { steps { sh 'deploy.sh staging' } }
        stage('Automated QA') {
            steps {
                sh 'npm run test:e2e'
                sh 'npm run test:api'
            }
        }
        stage('Prod Approval') { steps { input 'Ship to Prod?' } }
    }
}`,
  },
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>("automation")

  const currentGroup = useMemo(() => skillGroups.find((g) => g.id === activeTab) ?? skillGroups[0], [activeTab])

  const [selectedSkillName, setSelectedSkillName] = useState<string>(currentGroup.skills[0].name)
  const [copied, setCopied] = useState(false)

  // When changing category tab, switch active skill to first skill in that category
  const handleTabChange = (groupId: string) => {
    setActiveTab(groupId)
    const nextGroup = skillGroups.find((g) => g.id === groupId)
    if (nextGroup && nextGroup.skills.length > 0) {
      setSelectedSkillName(nextGroup.skills[0].name)
    }
  }

  const selectedSkill = useMemo(
    () => currentGroup.skills.find((s) => s.name === selectedSkillName) ?? currentGroup.skills[0],
    [currentGroup, selectedSkillName]
  )

  const activeSnippet = useMemo(() => {
    return (
      SNIPPETS[selectedSkill.name] ?? {
        filename: `${selectedSkill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.spec.ts`,
        language: "typescript",
        status: "✓ Verified & Production Ready",
        highlight: selectedSkill.detail,
        code: `// ${selectedSkill.name}\n// ${selectedSkill.detail}\n\nexport const testConfig = {\n  verified: true,\n  discipline: 'QA Engineering',\n  status: 'READY'\n};`,
      }
    )
  }, [selectedSkill])

  // Deliberate, character-by-character slow typing effect
  const [displayedCode, setDisplayedCode] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    setDisplayedCode("")
    setIsTyping(true)

    const fullCode = activeSnippet.code
    let currentIndex = 0

    // Deliberate, character-by-character slow typing effect (24ms per character)
    const timer = setInterval(() => {
      currentIndex += 1
      if (currentIndex >= fullCode.length) {
        setDisplayedCode(fullCode)
        setIsTyping(false)
        clearInterval(timer)
      } else {
        setDisplayedCode(fullCode.slice(0, currentIndex))
      }
    }, 24)

    return () => clearInterval(timer)
  }, [activeSnippet.code, selectedSkillName])

  const copyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative py-14 sm:py-18 lg:py-22">
      <div className="container-x">
        <SectionHeader
          label="Testing arsenal"
          titleId="expertise-title"
          title={["Tools that", "turn uncertainty", <span key="c" className="text-accent-gradient">into confidence.</span>]}
          aside={
            <p className="text-[16px] leading-relaxed">
              Automation, API validation, AI-assisted testing and disciplined STLC quality gates — the core toolkit behind zero-defect releases.
            </p>
          }
        />

        {/* 4 Focused Category Tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-line pb-5 sm:gap-3">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => handleTabChange(g.id)}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-xl px-4.5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-5 sm:py-3 sm:text-[12.5px]",
                activeTab === g.id
                  ? "bg-accent text-ink shadow-[0_8px_24px_-6px_rgba(255,107,53,0.65)]"
                  : "border border-line bg-card/60 text-fg-2 hover:border-accent/40 hover:bg-card hover:text-fg"
              )}
            >
              <span>{g.title}</span>
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px]",
                  activeTab === g.id ? "bg-ink/25 text-ink font-bold" : "bg-white/10 text-muted"
                )}
              >
                {g.skills.length}
              </span>
            </button>
          ))}
        </div>

        {/* Category Context Line */}
        <div className="mt-6 text-xs text-muted font-mono">
          <p>
            <span className="text-accent font-semibold">{currentGroup.title}</span> — {currentGroup.caption}
          </p>
        </div>

        {/* Interactive Dual-Pane: Tool Cards on the LEFT SIDE, Terminal on the RIGHT SIDE */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left Pane: Interactive Tool Selector Cards */}
          <div className="order-1 flex flex-col gap-2.5 lg:col-span-5">
            {currentGroup.skills.map((skill) => {
              const Icon = ICONS[skill.icon] || Bot
              const isSelected = skill.name === selectedSkill.name
              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setSelectedSkillName(skill.name)}
                  className={cn(
                    "group relative flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300",
                    isSelected
                      ? "border-accent/60 bg-card shadow-[0_8px_30px_-10px_rgba(255,107,53,0.35)] ring-1 ring-accent/30"
                      : "border-line bg-card/60 hover:border-accent/40 hover:bg-card"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "grid size-10 flex-none place-items-center rounded-xl border transition-colors",
                        isSelected
                          ? "border-accent/40 bg-accent/20 text-accent"
                          : "border-line bg-white/[0.04] text-fg-2 group-hover:text-accent group-hover:border-accent/30"
                      )}
                    >
                      <Icon className="size-4.5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-[15.5px] font-bold tracking-tight", isSelected ? "text-fg" : "text-fg-2 group-hover:text-fg")}>
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="rounded bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-accent uppercase">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] text-muted line-clamp-1">
                        {skill.detail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {skill.tag && (
                      <span className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase",
                        isSelected
                          ? "border-accent/40 bg-accent/15 text-accent"
                          : "border-line bg-white/[0.04] text-muted"
                      )}>
                        {skill.tag}
                      </span>
                    )}
                    <span
                      className={cn(
                        "font-mono text-xs transition-transform duration-300",
                        isSelected ? "translate-x-1 text-accent font-bold" : "text-muted/40 group-hover:translate-x-0.5 group-hover:text-fg"
                      )}
                    >
                      →
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Pane: Dark Code Inspector with Slow Dynamic Typing Animation */}
          <div className="order-2 lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative flex h-full min-h-[460px] max-h-[580px] flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a0d14] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              {/* Terminal Window Header Bar */}
              <div className="flex-none flex items-center justify-between border-b border-white/[0.08] bg-[#13171f] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  {/* macOS Style Traffic Dots */}
                  <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-[#ff5f56]/90" />
                    <span className="size-2.5 rounded-full bg-[#ffbd2e]/90" />
                    <span className="size-2.5 rounded-full bg-[#27c93f]/90" />
                  </div>
                  <span className="h-3 w-px bg-white/15 mx-1" />
                  {/* Active File Tab */}
                  <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-slate-200">
                    <Terminal className="size-3 text-accent" />
                    <span>{activeSnippet.filename}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-[10px] tracking-wider text-slate-400 uppercase sm:inline-block">
                    {activeSnippet.language}
                  </span>
                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label="Copy snippet code"
                    className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] text-slate-300 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Code Highlight Banner */}
              <div className="flex-none border-b border-white/[0.06] bg-[#0e131b] px-4 py-2 sm:px-5">
                <p className="font-mono text-[11px] text-[#ff9a70]">
                  <span className="text-slate-400 mr-1.5">// Scope:</span>
                  {activeSnippet.highlight}
                </p>
              </div>

              {/* Code Editor Body with Character-by-Character Slow Typing and Line Numbers */}
              {/* Scrollbar is sticky to the bottom bar of the component via container-level scroll */}
              <div className="relative flex-1 min-h-0 overflow-x-auto overflow-y-auto custom-scrollbar p-4 sm:p-5 font-mono text-[12px] sm:text-[12.5px] leading-relaxed text-slate-100 cursor-default flex flex-col justify-start bg-[#0a0d14]">
                <div className="flex min-w-full gap-4 pb-2">
                  {/* Line Numbers streaming dynamically with the code */}
                  <div className="select-none text-right font-mono text-slate-500 text-[11.5px] sm:text-[12px] pr-2.5 border-r border-white/10 min-w-[24px]">
                    {(displayedCode || " ").split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Code Content with Blinking Terminal Cursor - text-slate-100 ensures bright visibility in light and dark mode */}
                  <pre className="flex-1 overflow-visible font-mono text-[12px] sm:text-[12.5px] leading-relaxed text-slate-100 whitespace-pre">
                    <code>{displayedCode}</code>
                    {isTyping && (
                      <span className="inline-block h-3.5 w-1.5 ml-0.5 bg-accent animate-pulse align-middle" />
                    )}
                  </pre>
                </div>
              </div>

              {/* Terminal Bottom Status Bar (Live QA Execution State) - STICKY to bottom of the card */}
              <div className="sticky bottom-0 z-10 flex-none border-t border-white/[0.08] bg-[#13171f] px-4 py-2.5 sm:px-5 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-semibold">{activeSnippet.status}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
                  <span>QA Suite</span>
                  <span>·</span>
                  <span className="text-slate-200">Mahi Srivastava</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
