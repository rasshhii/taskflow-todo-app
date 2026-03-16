import styles from './StatsBar.module.css'

// Props: counts + callback
export default function StatsBar({ activeCount, completedCount, totalCount, onClearCompleted }) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className={styles.statsBar}>
      <div className={styles.stats}>
        <span className={styles.statItem}>
          <span className={styles.statNum}>{activeCount}</span>
          <span className={styles.statLabel}>{activeCount === 1 ? 'task' : 'tasks'} remaining</span>
        </span>

        {/* Conditional separator */}
        {completedCount > 0 && (
          <>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.statItem}>
              <span className={`${styles.statNum} ${styles.statCompleted}`}>{completedCount}</span>
              <span className={styles.statLabel}>done</span>
            </span>
          </>
        )}
      </div>

      <div className={styles.right}>
        {/* Progress bar — conditional rendering when there are tasks */}
        {totalCount > 0 && (
          <div className={styles.progressWrap} title={`${percent}% complete`}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${percent}%` }}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <span className={styles.progressLabel}>{percent}%</span>
          </div>
        )}

        {/* Conditional: only show if there are completed tasks */}
        {completedCount > 0 && (
          <button
            className={styles.clearBtn}
            onClick={onClearCompleted}
            aria-label="Clear all completed tasks"
          >
            Clear done
          </button>
        )}
      </div>
    </div>
  )
}
