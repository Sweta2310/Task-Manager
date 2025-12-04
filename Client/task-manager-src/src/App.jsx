import { Routes, Route, Link } from 'react-router-dom'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'
import DeleteConfirm from './pages/DeleteConfirm'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
        <nav className="row">
          <Link to="/" className="btn">Tasks</Link>
          <Link to="/add" className="btn ghost">Add Task</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/delete/:id" element={<DeleteConfirm />} />
        </Routes>
      </main>
    </div>
  )
}
