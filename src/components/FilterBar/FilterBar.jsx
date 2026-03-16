import styles from './FilterBar.module.css'

const FILTERS = [
  { key: 'all',       label: 'All Tasks' },
  { key: 'active',    label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

// Props: current filter + setter callback
export default function FilterBar({ filter, onFilterChange }) {
  return (
    <nav className={styles.filterBar} aria-label="Filter tasks">
      {/* List rendering with .map() */}
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
          onClick={() => onFilterChange(key)}
          aria-current={filter === key ? 'true' : undefined}
        >
          {label}
          {/* Conditional active indicator */}
          {filter === key && <span className={styles.activeIndicator} aria-hidden="true" />}
        </button>
      ))}
    </nav>
  )
}
