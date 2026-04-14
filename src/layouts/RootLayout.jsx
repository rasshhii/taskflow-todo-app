import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'
import CommandPalette from '../components/CommandPalette/CommandPalette'
import styles from './RootLayout.module.css'

const THEME_KEY = 'taskflow_theme'

export default function RootLayout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'dark'
  })

  // ── Apply theme to document ─────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // ── Event Handler: Toggle Theme ──────────────────────────────────────
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
  }

  return (
    <div className={styles.app}>
      {/* Mesh gradient background */}
      <div className={styles.meshBg} aria-hidden="true">
        <div className={styles.meshOrb1} />
        <div className={styles.meshOrb2} />
        <div className={styles.meshOrb3} />
      </div>

      <div className={styles.container}>
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Navigation />

        {/* Main content from route */}
        <Outlet />
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  )
}
