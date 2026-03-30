import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext()

const THEME_KEY = 'ecom_theme_v1'

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const raw = localStorage.getItem(THEME_KEY)
      // Normalize legacy values (e.g. 'darkAdventure') to 'dark'
      if (raw === 'darkAdventure') return 'dark'
      return raw || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try { localStorage.setItem(THEME_KEY, currentTheme) } catch { }
    // apply or remove 'dark' class on <html> element
    const root = document.documentElement
    if (currentTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    // add a transient class to enable smooth theme transition
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 350)
  }, [currentTheme])

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
