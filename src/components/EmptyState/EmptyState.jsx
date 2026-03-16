import styles from './EmptyState.module.css'

const STATES = {
  all: {
    emoji: '✨',
    title: 'You\'re all clear!',
    subtitle: 'Add your first task above to get started.',
  },
  active: {
    emoji: '🎉',
    title: 'Nothing active right now',
    subtitle: 'All tasks are completed — great work!',
  },
  completed: {
    emoji: '📋',
    title: 'No completed tasks yet',
    subtitle: 'Complete some tasks and they\'ll appear here.',
  },
}

// Conditional rendering based on filter + hasTasks props
export default function EmptyState({ filter, hasTasks }) {
  // If there are tasks but filtered out, use filter-specific message
  const stateKey = hasTasks ? filter : 'all'
  const state = STATES[stateKey] || STATES.all

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.orb} aria-hidden="true" />
      <span className={styles.emoji} aria-hidden="true">{state.emoji}</span>
      <h3 className={styles.title}>{state.title}</h3>
      <p className={styles.subtitle}>{state.subtitle}</p>

      {/* Conditional: show decorative dots only on "all clear" */}
      {!hasTasks && (
        <div className={styles.dots} aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <span key={i} className={styles.dot} style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
      )}
    </div>
  )
}
