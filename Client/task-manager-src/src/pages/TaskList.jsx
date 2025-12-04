import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TaskItem from '../components/TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);           
  const [loading, setLoading] = useState(false);    
  const [q, setQ] = useState('');                   
  const [status, setStatus] = useState('');         
  const [page, setPage] = useState(1);              
  const [totalPages, setTotalPages] = useState(1);  
  const PAGE_SIZE = 6;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = { q, status, _page: page, _limit: PAGE_SIZE };
      const res = await getTasks(params);

      const data = Array.isArray(res.data) ? res.data : (res.data?.tasks || []);
      setTasks(data);

      const total = parseInt(res.headers?.['x-total-count'] || data.length, 10);
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
    } catch (err) {
      console.error('Failed to load tasks', err);
      setTasks([]); 
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [q, status, page]);

  return (
    <div className="card">
      {/* Search & Filter */}
      <div className="search-bar">
        <input
          className="input"
          placeholder="Search title or description"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <select
          className="input"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">All statuses</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <button className="btn" onClick={fetchTasks}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Task List */}
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        {loading ? (
          <div className="small-muted">Loading...</div>
        ) : Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((t) => <TaskItem key={t._id || t.id} task={t} />)
        ) : (
          <div className="small-muted">No tasks found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn ghost"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Prev
        </button>
        <div className="small-muted">Page {page} / {totalPages}</div>
        <button
          className="btn ghost"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
