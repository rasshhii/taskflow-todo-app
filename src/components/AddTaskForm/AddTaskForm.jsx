import { useState } from 'react'
import styles from './AddTaskForm.module.css'

const PRIORITIES = ['Low', 'Medium', 'High']

// Receives onAddTask callback as prop
export default function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a task title.')
      return
    }
    if (title.trim().length < 2) {
      setError('Task must be at least 2 characters.')
      return
    }

    setIsSubmitting(true)
    // Micro-delay for snappy feel
    await new Promise(r => setTimeout(r, 120))
    onAddTask(title, priority)
    setTitle('')
    setError('')
    setIsSubmitting(false)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (error) setError('')
  }

  return (
    <div className={styles.card}>
      <p className={styles.cardLabel}>New Task</p>

      {/* Note: no <form> with method; using onSubmit handler instead */}
      <div className={styles.formInner}>
        <div className={styles.inputRow}>
          <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
            <span className={styles.inputIcon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <input
              className={styles.input}
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              maxLength={120}
              aria-label="Task title"
              aria-describedby={error ? 'task-error' : undefined}
            />
            {/* Conditional: show char count only when typing */}
            {title.length > 80 && (
              <span className={styles.charCount}>{title.length}/120</span>
            )}
          </div>

          <button
            className={`${styles.addBtn} ${isSubmitting ? styles.addBtnLoading : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-label="Add task"
          >
            {isSubmitting ? (
              <span className={styles.btnSpinner} />
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Priority selector */}
        <div className={styles.priorityRow} role="group" aria-label="Task priority">
          <span className={styles.priorityLabel}>Priority:</span>
          {PRIORITIES.map(p => (
            <button
              key={p}
              type="button"
              className={`${styles.priorityBtn} ${styles[`priority${p}`]} ${priority === p ? styles.prioritySelected : ''}`}
              onClick={() => setPriority(p)}
              aria-pressed={priority === p}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Conditional error message */}
        {error && (
          <p id="task-error" className={styles.error} role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
