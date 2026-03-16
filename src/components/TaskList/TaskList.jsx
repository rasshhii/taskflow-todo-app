import TaskItem from '../TaskItem/TaskItem'
import styles from './TaskList.module.css'

// Props: tasks array + action callbacks passed down
export default function TaskList({ tasks, onToggle, onEdit, onDeleteRequest }) {
  return (
    <ul className={styles.list} role="list" aria-label="Task list">
      {/* List rendering with .map() and unique keys */}
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </ul>
  )
}
