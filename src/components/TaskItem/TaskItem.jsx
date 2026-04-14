import { useState, useRef, useEffect } from 'react'
import styles from './TaskItem.module.css'

const PRIORITY_META = {
  Low:    { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  dot: '#10b981' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', dot: '#f59e0b' },
  High:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  dot: '#ef4444' },
}

// Props: task object + callbacks
export default function TaskItem({ task, index, onToggle, onEdit, onDeleteRequest, onViewDetails }) {
  // ── Conditional state: edit mode vs view mode ──
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const editInputRef = useRef(null)

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [isEditing])

  const handleEditStart = () => {
    setEditValue(task.title)
    setIsEditing(true)
  }

  const handleEditSave = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditValue(task.title)
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') handleEditCancel()
  }

  const priority = PRIORITY_META[task.priority] || PRIORITY_META.Medium

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(task.createdAt))

  return (
    <li
      className={`${styles.item} ${task.completed ? styles.itemCompleted : ''}`}
      style={{ animationDelay: `${Math.min(index * 40, 300)}ms` }}
      role="listitem"
    >
      {/* Priority accent bar */}
      <span
        className={styles.priorityBar}
        style={{ background: priority.color }}
        aria-hidden="true"
      />

      {/* ── Checkbox ── */}
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checkboxDone : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {/* Conditional: checkmark only when done */}
        {task.completed && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* ── Content: conditional edit vs view mode ── */}
      <div className={styles.content}>
        {isEditing ? (
          /* EDIT MODE */
          <div className={styles.editMode}>
            <input
              ref={editInputRef}
              className={styles.editInput}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={handleEditSave}
              maxLength={120}
              aria-label="Edit task title"
            />
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleEditSave} aria-label="Save changes">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save
              </button>
              <button className={styles.cancelBtn} onClick={handleEditCancel} aria-label="Cancel edit">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <div className={styles.viewMode}>
            <p className={`${styles.title} ${task.completed ? styles.titleStruck : ''}`}>
              {task.title}
            </p>
            <div className={styles.meta}>
              <span
                className={styles.priorityTag}
                style={{ color: priority.color, background: priority.bg }}
              >
                <span className={styles.priorityDot} style={{ background: priority.dot }} />
                {task.priority}
              </span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Action Buttons (view mode only) ── */}
      {!isEditing && (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.detailsBtn}`}
            onClick={() => onViewDetails?.(task.id)}
            aria-label={`View details: ${task.title}`}
            title="View details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={handleEditStart}
            disabled={task.completed}
            aria-label={`Edit task: ${task.title}`}
            title="Edit task"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => onDeleteRequest(task.id, task.title)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      )}
    </li>
  )
}
