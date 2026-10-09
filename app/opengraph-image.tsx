import { ImageResponse } from "next/og"

export const alt = "Mahi Srivastava — QA Engineer. Make software worth trusting."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 90% at 90% 0%, rgba(255,107,53,0.35), #080B12 60%)",
          color: "#F5F7FA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 4, color: "#A0A8B7" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#35D07F" }} />
          QA ENGINEER · MANUAL + AUTOMATION
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>MAKE SOFTWARE</span>
          <span>WORTH</span>
          <span style={{ display: "flex" }}>
            TRUSTING<span style={{ color: "#FF6B35" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#A0A8B7" }}>
          <span style={{ color: "#F5F7FA", fontWeight: 700 }}>Mahi Srivastava</span>
          <span>Selenium · Playwright · API Testing</span>
        </div>
      </div>
    ),
    size
  )
}
