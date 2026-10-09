import type { ReactNode } from "react"

/** Shared chrome for the abstract project mockups. */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[14px] border border-glass-line bg-ink-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-line bg-white/[0.02] px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </span>
        <span className="flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-muted">{url}</span>
      </div>
      <div className="relative flex-1 p-3 sm:p-4">{children}</div>
    </div>
  )
}

export const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <span className={`block h-1.5 rounded-full bg-white/10 ${className}`} style={{ width: w }} />
)
