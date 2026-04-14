import { useLocation, Link } from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation() {
  const location = useLocation()

  // ── Navigation items with routes ─────────────────────────────────────
  const navItems = [
    { label: '📋 Dashboard', path: '/dashboard', icon: '📋' },
    { label: '📊 Stats', path: '/stats', icon: '📊' },
    { label: '⚙️ Settings', path: '/settings', icon: '⚙️' },
  ]

  // ── Check if a route is active ───────────────────────────────────────
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
            title={item.label}
            onClick={(e) => {
              // Event tracking for navigation
              console.log(`Navigating to ${item.path}`)
            }}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label.split(' ').pop()}</span>
          </Link>
        ))}
      </div>

      {/* Navigation breadcrumb indicator */}
      <div className={styles.breadcrumb}>
        {location.pathname === '/dashboard' && <span>Dashboard</span>}
        {location.pathname.startsWith('/tasks/') && <span>Task Details</span>}
        {location.pathname.startsWith('/focus/') && <span>Focus Mode</span>}
        {location.pathname === '/stats' && <span>Statistics</span>}
        {location.pathname === '/settings' && <span>Settings</span>}
      </div>
    </nav>
  )
}
