import { useState, useEffect } from 'react'
import HabitTracking from '../components/HabitTracking/HabitTracking'
import styles from './Stats.module.css'

const STORAGE_KEY = 'taskflow_tasks'

export default function Stats() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    activeTasks: 0,
    completionRate: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    averageCompletionTime: 0,
  })

  // ── Calculate statistics ─────────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []

      const totalTasks = tasks.length
      const completedTasks = tasks.filter(t => t.completed).length
      const activeTasks = tasks.filter(t => !t.completed).length

      const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

      const highPriority = tasks.filter(t => t.priority === 'high').length
      const mediumPriority = tasks.filter(t => t.priority === 'medium').length
      const lowPriority = tasks.filter(t => t.priority === 'low').length

      // Calculate average time to completion (in days)
      const completedWithDates = tasks.filter(t => t.completed && t.createdAt)
      const totalDays = completedWithDates.reduce((sum, task) => {
        const created = new Date(task.createdAt)
        const now = new Date()
        const days = Math.floor((now - created) / (1000 * 60 * 60 * 24))
        return sum + days
      }, 0)
      const averageCompletionTime = completedWithDates.length > 0
        ? Math.round(totalDays / completedWithDates.length)
        : 0

      setStats({
        totalTasks,
        completedTasks,
        activeTasks,
        completionRate,
        highPriority,
        mediumPriority,
        lowPriority,
        averageCompletionTime,
      })
    } catch (_err) {
      // Handle error silently
    }
  }, [])

  // ── Event Handlers for interactions ──────────────────────────────────
  const handleRefreshStats = () => {
    // Trigger stats recalculation
    window.location.reload()
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📊 Statistics & Analytics</h1>
        <button onClick={handleRefreshStats} className={styles.refreshBtn}>
          🔄 Refresh
        </button>
      </div>

      {/* Habit Tracking Section */}
      <div className={styles.section}>
        <HabitTracking />
      </div>

      {/* Main Stats Grid */}
      <div className={styles.statsGrid}>
        {/* Total Tasks */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Total Tasks</h3>
            <p className={styles.statValue}>{stats.totalTasks}</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✓</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Completed</h3>
            <p className={styles.statValue}>{stats.completedTasks}</p>
          </div>
        </div>

        {/* Active Tasks */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>◯</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Active</h3>
            <p className={styles.statValue}>{stats.activeTasks}</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📈</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Completion Rate</h3>
            <p className={styles.statValue}>{stats.completionRate}%</p>
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Priority Breakdown</h2>
        <div className={styles.priorityGrid}>
          <div className={`${styles.priorityCard} ${styles.high}`}>
            <span className={styles.priorityIcon}>🔴</span>
            <span className={styles.priorityCount}>{stats.highPriority}</span>
            <span className={styles.priorityLabel}>High Priority</span>
          </div>

          <div className={`${styles.priorityCard} ${styles.medium}`}>
            <span className={styles.priorityIcon}>🟡</span>
            <span className={styles.priorityCount}>{stats.mediumPriority}</span>
            <span className={styles.priorityLabel}>Medium Priority</span>
          </div>

          <div className={`${styles.priorityCard} ${styles.low}`}>
            <span className={styles.priorityIcon}>🟢</span>
            <span className={styles.priorityCount}>{stats.lowPriority}</span>
            <span className={styles.priorityLabel}>Low Priority</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Performance Metrics</h2>
        <div className={styles.metricsCard}>
          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>⏱️</span>
            <div>
              <span className={styles.metricLabel}>Avg. Time to Complete</span>
              <p className={styles.metricValue}>{stats.averageCompletionTime} days</p>
            </div>
          </div>

          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>🎯</span>
            <div>
              <span className={styles.metricLabel}>Completion Rate</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
              <p className={styles.metricValue}>{stats.completionRate}%</p>
            </div>
          </div>

          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>📅</span>
            <div>
              <span className={styles.metricLabel}>Tasks This Session</span>
              <p className={styles.metricValue}>{stats.totalTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      {stats.totalTasks > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>💡 Insights</h2>
          <div className={styles.insightsList}>
            {stats.completionRate === 100 && stats.totalTasks > 0 && (
              <div className={styles.insight}>
                🎉 Amazing! You've completed all your tasks!
              </div>
            )}
            {stats.activeTasks === 0 && stats.totalTasks > 0 && (
              <div className={styles.insight}>
                ✨ All caught up! No active tasks remaining.
              </div>
            )}
            {stats.highPriority > 0 && (
              <div className={styles.insight}>
                🔴 You have {stats.highPriority} high-priority task{stats.highPriority > 1 ? 's' : ''}. Stay focused!
              </div>
            )}
            {stats.activeTasks > 5 && (
              <div className={styles.insight}>
                💪 You're working on {stats.activeTasks} tasks. Prioritize to stay organized!
              </div>
            )}
          </div>
        </div>
      )}

      {stats.totalTasks === 0 && (
        <div className={styles.emptyState}>
          <p>No tasks yet. Start adding tasks to see your statistics!</p>
        </div>
      )}
    </main>
  )
}
