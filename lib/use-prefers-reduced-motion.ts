import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

/**
 * Hydration-safe reduced-motion flag: false on the server and during
 * hydration, then the real preference. Use when the value changes markup.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
}
