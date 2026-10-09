/** Fixed technical backdrop: grid, warm glows, noise. Pure CSS, no JS. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="bg-grid absolute inset-0 animate-[page-in_1.6s_0.15s_both]" />
      <div className="absolute -top-[20vh] right-[-10vw] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,53,0.16),transparent)] blur-2xl" />
      <div className="absolute top-[40vh] left-[-20vw] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,154,112,0.05),transparent)] blur-3xl" />
      <div className="bg-noise absolute inset-0" />
    </div>
  )
}
