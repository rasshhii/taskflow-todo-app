import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './FocusMode.module.css'

const STORAGE_KEY = 'taskflow_tasks'

export default function FocusMode() {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState(null)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [focusMode, setFocusMode] = useState('work') // work or break
  const [error, setError] = useState(null)

  // ── Load task ────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []
      const foundTask = tasks.find(t => t.id === taskId)

      if (foundTask) {
        setTask(foundTask)
      } else {
        setError('Task not found')
      }
    } catch (_err) {
      setError('Error loading task')
    }
  }, [taskId])

  // ── Timer Loop ───────────────────────────────────────────────────────
  useEffect(() => {
    let interval

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      // Timer finished
      playNotification()
      handleTimerComplete()
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  // ── Handle timer completion ────────────────────────────────────────
  const handleTimerComplete = () => {
    if (focusMode === 'work') {
      setSessionsCompleted(s => s + 1)
      setFocusMode('break')
      setTimeLeft(5 * 60) // 5 min break
      setIsRunning(false)
    } else {
      setFocusMode('work')
      setTimeLeft(25 * 60) // Back to 25 min work
      setIsRunning(false)
    }
  }

  // ── Play notification sound ────────────────────────────────────────
  const playNotification = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gain.gain.setValueAtTime(0.3, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  // ── Format time display ────────────────────────────────────────────
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // ── Event Handlers ────────────────────────────────────────────────
  const handleToggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setFocusMode('work')
    setTimeLeft(25 * 60)
    setSessionsCompleted(0)
  }

  const handleSkipSession = () => {
    handleTimerComplete()
  }

  const handleMarkComplete = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []
      const updated = tasks.map(t =>
        t.id === taskId ? { ...t, completed: true, focusSessionsUsed: (t.focusSessionsUsed || 0) + sessionsCompleted } : t
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setIsRunning(false)
      navigate(`/tasks/${taskId}`)
    } catch (_err) {
      setError('Error updating task')
    }
  }

  const handleExit = () => {
    navigate(`/tasks/${taskId}`)
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard')} className={styles.backBtn}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  const progressPercent = ((focusMode === 'work' ? 25 * 60 : 5 * 60) - timeLeft) / (focusMode === 'work' ? 25 * 60 : 5 * 60) * 100

  return (
    <div className={styles.container}>
      {/* Background Blur */}
      <div className={styles.blurBg} aria-hidden="true" />

      {/* Focus Content */}
      <div className={styles.focusCard}>
        {/* Mode Indicator */}
        <div className={`${styles.modeIndicator} ${styles[focusMode]}`}>
          {focusMode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
        </div>

        {/* Task Title */}
        <h1 className={styles.taskTitle}>{task.title}</h1>

        {/* Circular Timer */}
        <div className={styles.timerCircle}>
          <svg className={styles.progressRing} width="300" height="300">
            <circle
              className={styles.progressCircleBg}
              cx="150"
              cy="150"
              r="140"
            />
            <circle
              className={`${styles.progressCircle} ${styles[focusMode]}`}
              cx="150"
              cy="150"
              r="140"
              style={{
                strokeDashoffset: 880 - (880 * progressPercent) / 100,
              }}
            />
          </svg>

          <div className={styles.timerDisplay}>
            <div className={styles.time}>{formatTime(timeLeft)}</div>
            <div className={styles.sessions}>Session {sessionsCompleted + 1}</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.playBtn}`}
            onClick={handleToggleTimer}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>

          <button className={`${styles.btn} ${styles.skipBtn}`} onClick={handleSkipSession}>
            ⏭ Skip
          </button>

          <button className={`${styles.btn} ${styles.resetBtn}`} onClick={handleReset}>
            🔄 Reset
          </button>
        </div>

        {/* Stats Row */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Sessions Completed</span>
            <span className={styles.statValue}>{sessionsCompleted}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Focus Time</span>
            <span className={styles.statValue}>{sessionsCompleted * 25} min</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={`${styles.actionBtn} ${styles.completeBtn}`} onClick={handleMarkComplete}>
            ✓ Mark Complete & Exit
          </button>
          <button className={`${styles.actionBtn} ${styles.exitBtn}`} onClick={handleExit}>
            Exit Focus Mode
          </button>
        </div>

        {/* Keyboard Hints */}
        <div className={styles.hints}>
          <p>💡 Tips: Space = Play/Pause | ESC = Exit</p>
        </div>
      </div>
    </div>
  )
}
