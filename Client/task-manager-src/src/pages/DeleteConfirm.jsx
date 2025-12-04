import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTask, deleteTask } from '../api'

console.log('DeleteConfirm loaded')

export default function DeleteConfirm() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTask(id)
        setTask(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTask()
  }, [id])

  const onDelete = async () => {
    if (!confirm('Delete this task?')) return
    setLoading(true)
    try {
      await deleteTask(id)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  if (!task) return <div className="card"><div className="small-muted">Loading...</div></div>

  return (
    <div className="card">
      <h2>Delete Task</h2>
      <p className="small-muted">Are you sure you want to delete:</p>

      <div style={{ marginBottom: 12 }}>
        <strong>{task.title}</strong>
        <div className="small-muted">{task.description}</div>
      </div>

      <div className="row">
        <button className="btn" onClick={onDelete}>{loading ? 'Deleting...' : 'Delete'}</button>
        <button className="btn ghost" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  )
}
