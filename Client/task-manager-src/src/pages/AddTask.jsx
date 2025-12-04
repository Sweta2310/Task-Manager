// src/pages/AddTask.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To do');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (title.length > 100) e.title = 'Title max 100 chars';
    if (description.length > 1000) e.description = 'Description is too long';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
  ev.preventDefault();       // Prevent the default form submit
  if (!validate()) return;   // Run your validation

  setLoading(true);

  try {
    // ✅ Send the task to the backend here
    await createTask({
      title: title.trim(),        // remove extra spaces
      description: description.trim(),
      status                       // must match your Mongoose enum: "To do", "In progress", "Done"
    });

    navigate('/');  // go back to task list after creation
  } catch (err) {
    console.error('Backend error:', err.response?.data);
    alert('Failed to create task: ' + (err.response?.data?.message || 'Unknown error'));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="card">
      <h2>Add Task</h2>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>

          </select>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn" type="submit">
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="btn ghost" onClick={() => window.history.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
