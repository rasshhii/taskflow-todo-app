import { useState, useEffect } from 'react'
import styles from './Settings.module.css'

const THEME_KEY = 'taskflow_theme'

export default function Settings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'dark'
  })

  const [saveMessage, setSaveMessage] = useState('')

  // ── Apply theme to document ─────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // ── Event Handler: Toggle Theme ──────────────────────────────────────
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
    setSaveMessage('Theme preference saved!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  // ── Event Handler: Reset All Data ────────────────────────────────────
  const handleResetData = () => {
    if (window.confirm('⚠️ This will delete all tasks. This action cannot be undone. Continue?')) {
      localStorage.removeItem('taskflow_tasks')
      setSaveMessage('All tasks have been cleared!')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  // ── Event Handler: Export Data ───────────────────────────────────────
  const handleExportData = () => {
    try {
      const tasks = localStorage.getItem('taskflow_tasks') || '[]'
      const dataStr = JSON.stringify(JSON.parse(tasks), null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tasks_backup_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setSaveMessage('Tasks exported successfully!')
      setTimeout(() => setSaveMessage(''), 2000)
    } catch (err) {
      setSaveMessage('Error exporting tasks')
      setTimeout(() => setSaveMessage(''), 2000)
    }
  }

  // ── Event Handler: Import Data ───────────────────────────────────────
  const handleImportData = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result
        const tasks = JSON.parse(content)
        
        if (!Array.isArray(tasks)) {
          setSaveMessage('Invalid file format')
          return
        }

        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks))
        setSaveMessage('Tasks imported successfully!')
        setTimeout(() => setSaveMessage(''), 2000)
      } catch (_err) {
        setSaveMessage('Error importing file')
        setTimeout(() => setSaveMessage(''), 2000)
      }
    }
    reader.readAsText(file)
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>⚙️ Settings</h1>

      {saveMessage && (
        <div className={`${styles.message} ${styles.success}`}>
          {saveMessage}
        </div>
      )}

      <div className={styles.settingCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>🌙 Appearance</h2>
          <p className={styles.cardDescription}>Choose your preferred theme</p>
        </div>

        <div className={styles.themeOptions}>
          <label className={`${styles.themeOption} ${theme === 'dark' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={(e) => handleThemeChange(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.themeLabel}>
              <span className={styles.themeIcon}>🌙</span>
              Dark Mode
            </span>
          </label>

          <label className={`${styles.themeOption} ${theme === 'light' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={(e) => handleThemeChange(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.themeLabel}>
              <span className={styles.themeIcon}>☀️</span>
              Light Mode
            </span>
          </label>
        </div>
      </div>

      <div className={styles.settingCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>💾 Data Management</h2>
          <p className={styles.cardDescription}>Export or import your tasks</p>
        </div>

        <div className={styles.actions}>
          <button onClick={handleExportData} className={`${styles.btn} ${styles.exportBtn}`}>
            📥 Export Tasks as JSON
          </button>

          <label className={`${styles.btn} ${styles.importBtn}`}>
            📤 Import Tasks from JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className={styles.hiddenInput}
            />
          </label>
        </div>
      </div>

      <div className={styles.settingCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>🗑️ Danger Zone</h2>
          <p className={styles.cardDescription}>Irreversible actions</p>
        </div>

        <button onClick={handleResetData} className={`${styles.btn} ${styles.dangerBtn}`}>
          ⚠️ Delete All Tasks
        </button>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.infoTitle}>ℹ️ About TaskFlow</h3>
        <ul className={styles.infoList}>
          <li><strong>Version:</strong> 1.0.0</li>
          <li><strong>Storage:</strong> Browser Local Storage</li>
          <li><strong>Theme:</strong> Dark/Light Mode Support</li>
          <li><strong>Data Sync:</strong> Auto-saved to your device</li>
        </ul>
      </div>
    </main>
  )
}
