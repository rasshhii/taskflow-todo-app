import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SubtasksPanel from '../components/SubtasksPanel/SubtasksPanel'
import styles from './TaskDetails.module.css'

const STORAGE_KEY = 'taskflow_tasks'

export default function TaskDetails() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [error, setError] = useState(null)

  // ── Load task from storage ───────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []
      const foundTask = tasks.find(t => t.id === taskId)
      
      if (foundTask) {
        setTask(foundTask)
        setEditTitle(foundTask.title)
      } else {
        setError('Task not found')
      }
    } catch (_err) {
      setError('Error loading task')
    }
  }, [taskId])

  // ── Event Handlers ────────────────────────────────────────────────────
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      setError('Task title cannot be empty')
      return
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []
      const updated = tasks.map(t =>
        t.id === taskId ? { ...t, title: editTitle.trim() } : t
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setTask(prev => ({ ...prev, title: editTitle.trim() }))
      setIsEditing(false)
      setError(null)
    } catch (_err) {
      setError('Error updating task')
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setIsEditing(false)
    setError(null)
  }

  const handleToggleComplete = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []
      const updated = tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setTask(prev => ({ ...prev, completed: !prev.completed }))
    } catch (_err) {
      setError('Error updating task status')
    }
  }

  const handleDelete = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tasks = stored ? JSON.parse(stored) : []
      const updated = tasks.filter(t => t.id !== taskId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      navigate('/dashboard', { replace: true })
    } catch (_err) {
      setError('Error deleting task')
    }
  }

  const handleFocus = () => {
    navigate(`/focus/${taskId}`)
  }

  const handleBackClick = () => {
    navigate('/dashboard')
  }

  // ── Render ─────────────────────────────────────────────────────────
  if (error) {
    return (
      <main className={styles.container}>
        <div className={styles.errorBox}>
          <p>{error}</p>
          <button onClick={handleBackClick} className={styles.backBtn}>
            ← Back to Dashboard
          </button>
        </div>
      </main>
    )
  }

  if (!task) {
    return (
      <main className={styles.container}>
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
        </div>
      </main>
    )
  }

  const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <main className={styles.container}>
      <button onClick={handleBackClick} className={styles.backBtn}>
        ← Back to Dashboard
      </button>

      <div className={styles.taskCard}>
        <div className={styles.taskHeader}>
          <div className={styles.titleSection}>
            {!isEditing ? (
              <h1 className={`${styles.title} ${task.completed ? styles.completed : ''}`}>
                {task.title}
              </h1>
            ) : (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={styles.editInput}
                autoFocus
              />
            )}
          </div>

          <div className={styles.statusBadge} data-status={task.completed ? 'completed' : 'active'}>
            {task.completed ? '✓ Completed' : '◯ Active'}
          </div>
        </div>

        <div className={styles.taskMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Priority:</span>
            <span className={`${styles.priority} ${styles[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Created:</span>
            <span>{createdDate}</span>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          {!isEditing ? (
            <>
              <button
                onClick={handleFocus}
                className={`${styles.btn} ${styles.focusBtn}`}
              >
                🎯 Start Focus Mode
              </button>
              <button
                onClick={handleEdit}
                className={`${styles.btn} ${styles.editBtn}`}
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleToggleComplete}
                className={`${styles.btn} ${styles.toggleBtn}`}
              >
                {task.completed ? '↩️ Mark Active' : '✓ Mark Complete'}
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.btn} ${styles.deleteBtn}`}
              >
                🗑️ Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSaveEdit}
                className={`${styles.btn} ${styles.saveBtn}`}
              >
                💾 Save
              </button>
              <button
                onClick={handleCancel}
                className={`${styles.btn} ${styles.cancelBtn}`}
              >
                ✕ Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Subtasks Panel */}
      {!task.completed && <SubtasksPanel taskId={taskId} />}
    </main>
  )
}
