import { Link } from 'react-router-dom'

export default function TaskItem({ task }) {
  return (
    <div className="task-item">
      <div>
        <div style={{ fontWeight: 600 }}>{task.title}</div>
        <div className="small-muted">{task.description || 'No description'}</div>
      </div>
      <div className="row">
        <div className="badge small-muted">{task.status || 'todo'}</div>
        <Link to={`/edit/${task._id}`} className="btn ghost">Edit</Link>
        <Link to={`/delete/${task._id}`} className="btn">Delete</Link>
      </div>
    </div>
  )
}
