import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CommandPalette.module.css'

export default function CommandPalette() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)

  const commands = [
    { id: 'dashboard', label: 'Go to Dashboard', shortcut: 'g d', action: () => navigate('/dashboard') },
    { id: 'stats', label: 'View Statistics', shortcut: 'g s', action: () => navigate('/stats') },
    { id: 'settings', label: 'Open Settings', shortcut: 'g e', action: () => navigate('/settings') },
    { id: 'clear', label: 'Clear Search', shortcut: 'Esc', action: () => setSearch('') },
  ]

  // ── Filter commands based on search ──────────────────────────────────
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.id.includes(search.toLowerCase())
  )

  // ── Keyboard Shortcut Handler ────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open palette: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
        setSearch('')
        setSelectedIdx(0)
      }

      // Close palette: Esc
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSearch('')
        setSelectedIdx(0)
      }

      // Navigation in palette
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIdx(prev => (prev + 1) % filteredCommands.length)
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIdx(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
        }
        if (e.key === 'Enter' && filteredCommands.length > 0) {
          e.preventDefault()
          filteredCommands[selectedIdx]?.action()
          setIsOpen(false)
          setSearch('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIdx, filteredCommands, navigate])

  // ── Reset selected index when search changes ────────────────────────
  useEffect(() => {
    setSelectedIdx(0)
  }, [search])

  return (
    <>
      {/* Command Palette Button */}
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        title="Command Palette (Cmd+K)"
        aria-label="Open command palette"
      >
        <span className={styles.icon}>⌘</span>
        <span className={styles.label}>Command</span>
        <span className={styles.shortcut}>⌘K</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      {/* Palette */}
      {isOpen && (
        <div className={styles.palette}>
          <div className={styles.input_group}>
            <span className={styles.search_icon}>🔍</span>
            <input
              type="text"
              placeholder="Type a command..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
              autoFocus
            />
            <div className={styles.help_text}>
              <kbd>↑↓</kbd> Navigate • <kbd>Enter</kbd> Select • <kbd>Esc</kbd> Close
            </div>
          </div>

          <div className={styles.commands}>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => (
                <button
                  key={cmd.id}
                  className={`${styles.command} ${idx === selectedIdx ? styles.selected : ''}`}
                  onClick={() => {
                    cmd.action()
                    setIsOpen(false)
                    setSearch('')
                  }}
                  onMouseEnter={() => setSelectedIdx(idx)}
                >
                  <span className={styles.command_label}>{cmd.label}</span>
                  <span className={styles.command_shortcut}>{cmd.shortcut}</span>
                </button>
              ))
            ) : (
              <div className={styles.no_results}>No commands found</div>
            )}
          </div>

          <div className={styles.footer}>
            <p>💡 Tip: Type "/" for quick actions</p>
          </div>
        </div>
      )}
    </>
  )
}
