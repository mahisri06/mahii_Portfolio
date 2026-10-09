"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "dark" | "light"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("mahi-theme") as Theme) || null
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("dark")
    }
  }, [])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    if (t === "light") {
      root.classList.add("light")
      root.classList.remove("dark")
      root.setAttribute("data-theme", "light")
    } else {
      root.classList.add("dark")
      root.classList.remove("light")
      root.setAttribute("data-theme", "dark")
    }
  }

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem("mahi-theme", t)
    applyTheme(t)
  }

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return context
}
