import { useState, useCallback, useEffect } from 'react'
import { useSubtasks } from '../../hooks/useSubtasks'
import styles from './SubtasksPanel.module.css'

export default function SubtasksPanel({ taskId }) {
  const { getSubtasks, addSubtask, toggleSubtask, deleteSubtask, editSubtask } = useSubtasks(taskId)
  const [subtasks, setSubtasks] = useState([])
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  // ── Load subtasks ────────────────────────────────────────────────────
  useEffect(() => {
    setSubtasks(getSubtasks())
  }, [taskId, getSubtasks])

  // ── Event Handlers ────────────────────────────────────────────────────
  const handleAddSubtask = useCallback((e) => {
    e.preventDefault()
    if (newSubtaskTitle.trim()) {
      addSubtask(newSubtaskTitle)
      setSubtasks(getSubtasks())
      setNewSubtaskTitle('')
      setIsAdding(false)
    }
  }, [newSubtaskTitle, addSubtask, getSubtasks])

  const handleToggle = useCallback((subtaskId) => {
    toggleSubtask(subtaskId)
    setSubtasks(getSubtasks())
  }, [toggleSubtask, getSubtasks])

  const handleDelete = useCallback((subtaskId) => {
    deleteSubtask(subtaskId)
    setSubtasks(getSubtasks())
  }, [deleteSubtask, getSubtasks])

  const handleEditStart = useCallback((subtask) => {
    setEditingId(subtask.id)
    setEditingTitle(subtask.title)
  }, [])

  const handleEditSave = useCallback((subtaskId) => {
    if (editingTitle.trim()) {
      editSubtask(subtaskId, editingTitle)
      setSubtasks(getSubtasks())
    }
    setEditingId(null)
    setEditingTitle('')
  }, [editingTitle, editSubtask, getSubtasks])

  const handleEditCancel = useCallback(() => {
    setEditingId(null)
    setEditingTitle('')
  }, [])

  const completedCount = subtasks.filter(s => s.completed).length
  const totalCount = subtasks.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>📋 Subtasks</h3>
        {totalCount > 0 && (
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className={styles.progressText}>{completedCount}/{totalCount}</span>
          </div>
        )}
      </div>

      {/* Subtasks List */}
      {subtasks.length > 0 && (
        <ul className={styles.list}>
          {subtasks.map((subtask) => (
            <li key={subtask.id} className={`${styles.item} ${subtask.completed ? styles.completed : ''}`}>
              {editingId === subtask.id ? (
                <div className={styles.editMode}>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className={styles.editInput}
                    autoFocus
                  />
                  <button
                    onClick={() => handleEditSave(subtask.id)}
                    className={`${styles.actionBtn} ${styles.saveBtn}`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className={`${styles.actionBtn} ${styles.cancelBtn}`}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className={`${styles.checkbox} ${subtask.completed ? styles.checked : ''}`}
                    onClick={() => handleToggle(subtask.id)}
                    aria-label={`Toggle: ${subtask.title}`}
                  >
                    {subtask.completed && '✓'}
                  </button>
                  <span className={`${styles.title} ${subtask.completed ? styles.strikethrough : ''}`}>
                    {subtask.title}
                  </span>
                  <div className={styles.itemActions}>
                    <button
                      onClick={() => handleEditStart(subtask)}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      disabled={subtask.completed}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(subtask.id)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add New Subtask Form */}
      {isAdding || subtasks.length === 0 ? (
        <form onSubmit={handleAddSubtask} className={styles.form}>
          <input
            type="text"
            placeholder="Add a subtask..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            className={styles.input}
            autoFocus
          />
          <div className={styles.formActions}>
            <button type="submit" className={`${styles.btn} ${styles.addBtn}`} disabled={!newSubtaskTitle.trim()}>
              Add
            </button>
            {subtasks.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false)
                  setNewSubtaskTitle('')
                }}
                className={`${styles.btn} ${styles.cancelBtn}`}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <button
          className={`${styles.btn} ${styles.addBtn}`}
          onClick={() => setIsAdding(true)}
        >
          + Add Subtask
        </button>
      )}

      {/* Empty State */}
      {subtasks.length === 0 && !isAdding && (
        <div className={styles.emptyState}>
          <p>No subtasks yet. Break this task down into smaller steps!</p>
        </div>
      )}
    </div>
  )
}
