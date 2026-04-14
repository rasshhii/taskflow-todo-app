import { useState, useEffect } from 'react'
import styles from './HabitTracking.module.css'

const STORAGE_KEY = 'taskflow_tasks'
const HABITS_KEY = 'taskflow_habits'

export default function HabitTracking() {
  const [stats, setStats] = useState({
    streak: 0,
    bestStreak: 0,
    completedToday: 0,
    totalCompleted: 0,
    thisWeekCompleted: 0,
    lastUpdated: null,
  })

  const [heatmapData, setHeatmapData] = useState([])

  // ── Calculate statistics ─────────────────────────────────────────────
  useEffect(() => {
    calculateStats()
  }, [])

  const calculateStats = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []

      const today = new Date().toDateString()
      const completedToday = tasks.filter(t =>
        t.completed && new Date(t.createdAt).toDateString() === today
      ).length

      const totalCompleted = tasks.filter(t => t.completed).length

      // This week (last 7 days)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const thisWeekCompleted = tasks.filter(t => {
        const taskDate = new Date(t.createdAt)
        return t.completed && taskDate > weekAgo
      }).length

      // Calculate streak
      const habitData = JSON.parse(localStorage.getItem(HABITS_KEY) || '{"lastActive":"2000-01-01","streak":0,"bestStreak":0}')

      let newStreak = habitData.streak || 0
      let bestStreak = habitData.bestStreak || 0

      if (completedToday > 0) {
        const lastActive = new Date(habitData.lastActive || '2000-01-01')
        const daysAgo = Math.floor((new Date() - lastActive) / (1000 * 60 * 60 * 24))

        if (daysAgo === 1) {
          newStreak = (habitData.streak || 0) + 1
        } else if (daysAgo > 1) {
          newStreak = 1
        }
      }

      bestStreak = Math.max(bestStreak, newStreak)

      // Save updated habits
      localStorage.setItem(HABITS_KEY, JSON.stringify({
        lastActive: today,
        streak: completedToday > 0 ? newStreak : habitData.streak,
        bestStreak,
      }))

      setStats({
        streak: completedToday > 0 ? newStreak : habitData.streak,
        bestStreak,
        completedToday,
        totalCompleted,
        thisWeekCompleted,
        lastUpdated: new Date().toLocaleTimeString(),
      })

      generateHeatmap(tasks)
    } catch (_err) {
      // Handle silently
    }
  }

  const generateHeatmap = (tasks) => {
    const heatmap = []
    const today = new Date()

    // Generate last 12 weeks
    for (let i = 83; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()

      const dayCompleted = tasks.filter(t => {
        const taskDate = new Date(t.createdAt)
        return t.completed && taskDate.toDateString() === dateStr
      }).length

      heatmap.push({
        date: dateStr,
        count: dayCompleted,
        intensity: Math.min(dayCompleted / 3, 1),
      })
    }

    setHeatmapData(heatmap)
  }

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {/* Streak Card */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>🔥</div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Current Streak</p>
            <p className={styles.cardValue}>{stats.streak} days</p>
          </div>
        </div>

        {/* Best Streak Card */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>🏆</div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Best Streak</p>
            <p className={styles.cardValue}>{stats.bestStreak} days</p>
          </div>
        </div>

        {/* Today Card */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>✓</div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Completed Today</p>
            <p className={styles.cardValue}>{stats.completedToday}</p>
          </div>
        </div>

        {/* This Week Card */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📅</div>
          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>This Week</p>
            <p className={styles.cardValue}>{stats.thisWeekCompleted}</p>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className={styles.heatmapSection}>
        <h3 className={styles.heatmapTitle}>📊 Your Activity Heatmap</h3>
        <div className={styles.heatmap}>
          {heatmapData.map((day, idx) => (
            <div
              key={idx}
              className={styles.heatmapCell}
              style={{
                backgroundColor: `rgba(99, 102, 241, ${Math.max(0.1, day.intensity)})`,
              }}
              title={`${day.date}: ${day.count} tasks`}
            />
          ))}
        </div>
        <div className={styles.heatmapLegend}>
          <span>Less</span>
          <div className={styles.legendBar} />
          <span>More</span>
        </div>
      </div>

      {/* Achievements */}
      <div className={styles.achievements}>
        <h3 className={styles.achievementsTitle}>🏅 Achievements</h3>
        <div className={styles.achievementsList}>
          {stats.streak >= 7 && (
            <div className={styles.achievement}>
              <span className={styles.achievementBadge}>🔥</span>
              <div>
                <p className={styles.achievementName}>Week Warrior</p>
                <p className={styles.achievementDesc}>7-day streak!</p>
              </div>
            </div>
          )}
          {stats.streak >= 30 && (
            <div className={styles.achievement}>
              <span className={styles.achievementBadge}>💪</span>
              <div>
                <p className={styles.achievementName}>Month Master</p>
                <p className={styles.achievementDesc}>30-day streak!</p>
              </div>
            </div>
          )}
          {stats.totalCompleted >= 50 && (
            <div className={styles.achievement}>
              <span className={styles.achievementBadge}>⭐</span>
              <div>
                <p className={styles.achievementName}>Prolific</p>
                <p className={styles.achievementDesc}>50 tasks completed!</p>
              </div>
            </div>
          )}
          {stats.thisWeekCompleted >= 10 && (
            <div className={styles.achievement}>
              <span className={styles.achievementBadge}>🚀</span>
              <div>
                <p className={styles.achievementName}>Speed Demon</p>
                <p className={styles.achievementDesc}>10 tasks this week!</p>
              </div>
            </div>
          )}
          {stats.streak === 0 && stats.totalCompleted === 0 && (
            <div className={styles.achievementEmpty}>
              <p>Complete tasks to unlock achievements!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
