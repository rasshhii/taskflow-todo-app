import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AddTaskForm from '../components/AddTaskForm/AddTaskForm'
import FilterBar from '../components/FilterBar/FilterBar'
import TaskList from '../components/TaskList/TaskList'
import StatsBar from '../components/StatsBar/StatsBar'
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog'
import EmptyState from '../components/EmptyState/EmptyState'
import styles from '../App.module.css'

const STORAGE_KEY = 'taskflow_tasks'

const generateId = () =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

export default function Dashboard() {
  const navigate = useNavigate()

  // ── State ──────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    taskId: null,
    taskTitle: '',
  })

  // ── Effects ─────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // ── Task Handlers ────────────────────────────────────────────────────
  const handleAddTask = useCallback((title, priority) => {
    const newTask = {
      id: generateId(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }, [])

  const handleToggle = useCallback((id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }, [])

  const handleEdit = useCallback((id, newTitle) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, title: newTitle.trim() } : t)
    )
  }, [])

  const handleDeleteRequest = useCallback((id, title) => {
    setConfirmDialog({ open: true, taskId: id, taskTitle: title })
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    setTasks(prev => prev.filter(t => t.id !== confirmDialog.taskId))
    setConfirmDialog({ open: false, taskId: null, taskTitle: '' })
  }, [confirmDialog.taskId])

  const handleDeleteCancel = useCallback(() => {
    setConfirmDialog({ open: false, taskId: null, taskTitle: '' })
  }, [])

  const handleClearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed))
  }, [])

  // ── Event Handler: Navigate to Task Details ──────────────────────────
  const handleViewTaskDetails = useCallback((taskId) => {
    navigate(`/tasks/${taskId}`)
  }, [navigate])

  // ── Derived State ───────────────────────────────────────────────────
  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <main className={styles.main}>
      <AddTaskForm onAddTask={handleAddTask} />

      <StatsBar
        activeCount={activeCount}
        completedCount={completedCount}
        totalCount={tasks.length}
        onClearCompleted={handleClearCompleted}
      />

      <FilterBar filter={filter} onFilterChange={setFilter} />

      {/* Conditional rendering: loading / empty / list */}
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          <span className={styles.loadingText}>Loading your tasks…</span>
        </div>
      ) : filteredTasks.length === 0 ? (
        <EmptyState filter={filter} hasTasks={tasks.length > 0} />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDeleteRequest={handleDeleteRequest}
          onViewDetails={handleViewTaskDetails}
        />
      )}

      {/* Confirmation dialog — conditional rendering */}
      {confirmDialog.open && (
        <ConfirmDialog
          taskTitle={confirmDialog.taskTitle}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </main>
  )
}
