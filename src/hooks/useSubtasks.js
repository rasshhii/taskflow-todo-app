// Custom hook for managing sub-tasks
export const useSubtasks = (taskId) => {
  const SUBTASKS_KEY = `taskflow_subtasks_${taskId}`

  const getSubtasks = () => {
    try {
      const stored = localStorage.getItem(SUBTASKS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  const saveSubtasks = (subtasks) => {
    try {
      localStorage.setItem(SUBTASKS_KEY, JSON.stringify(subtasks))
    } catch (_err) {
      // Handle error silently
    }
  }

  const addSubtask = (title, dueDate = null) => {
    const subtasks = getSubtasks()
    const newSubtask = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim(),
      completed: false,
      dueDate,
      createdAt: new Date().toISOString(),
    }
    subtasks.push(newSubtask)
    saveSubtasks(subtasks)
    return newSubtask
  }

  const toggleSubtask = (subtaskId) => {
    const subtasks = getSubtasks()
    const updated = subtasks.map(s =>
      s.id === subtaskId ? { ...s, completed: !s.completed } : s
    )
    saveSubtasks(updated)
  }

  const deleteSubtask = (subtaskId) => {
    const subtasks = getSubtasks()
    const updated = subtasks.filter(s => s.id !== subtaskId)
    saveSubtasks(updated)
  }

  const editSubtask = (subtaskId, newTitle) => {
    const subtasks = getSubtasks()
    const updated = subtasks.map(s =>
      s.id === subtaskId ? { ...s, title: newTitle.trim() } : s
    )
    saveSubtasks(updated)
  }

  return { getSubtasks, addSubtask, toggleSubtask, deleteSubtask, editSubtask }
}
