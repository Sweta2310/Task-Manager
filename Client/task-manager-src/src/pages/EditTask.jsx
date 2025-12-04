import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTask, updateTask } from '../api'

export default function EditTask() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const res = await getTask(id)
        if (mounted) setTask(res.data)
      } catch (err) {
        console.error(err)
        alert('Failed to load task')
      } finally {
        setLoading(false)
      }
    })()
    return () => (mounted = false)
  }, [id])

  const validate = () => {
    const e = {}
    if (!task.title || !task.title.trim()) e.title = 'Title is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSave = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await updateTask(id, task)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  if (!task)
    return (
      <div className="card">
        <div className="small-muted">Loading...</div>
      </div>
    )

  return (
    <div className="card">
      <h2>Edit Task</h2>

      <form onSubmit={onSave}>
        {/* Title */}
        <div className="form-row">
          <label>Title</label>
          <input
            className="input"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        {/* Description */}
        <div className="form-row">
          <label>Description</label>
          <textarea
            className="input"
            rows={4}
            value={task.description || ''}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />
        </div>

        {/* Status */}
        <div className="form-row">
          <label>Status</label>
          <select
            className="input"
            value={task.status || 'todo'}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button className="btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
