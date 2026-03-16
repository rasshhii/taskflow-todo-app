import { useEffect, useRef } from 'react'
import styles from './ConfirmDialog.module.css'

// Props: taskTitle + confirm/cancel callbacks
export default function ConfirmDialog({ taskTitle, onConfirm, onCancel }) {
  const cancelRef = useRef(null)

  // Focus cancel button on mount for accessibility
  useEffect(() => {
    cancelRef.current?.focus()
    // Trap escape key
    const handleKey = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onCancel])

  return (
    <div
      className={styles.backdrop}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className={styles.iconWrap} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <h2 id="dialog-title" className={styles.title}>Delete task?</h2>
        <p className={styles.body}>
          Are you sure you want to delete{' '}
          <strong className={styles.taskName}>"{taskTitle}"</strong>?
          <br />This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <button
            ref={cancelRef}
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Keep it
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
