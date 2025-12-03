const Task = require('../models/Task');

//Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description = '', status = 'pending' } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({ title: title.trim(), description: description.trim(), status });
    await task.save();

    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};


  //Get all tasks with optional query
const getTasks = async (req, res, next) => {
  try {
    const { q, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }
    if (status) filter.status = status;

    const parsedLimit = Math.max(1, Math.min(100, Number(limit) || 10));
    const parsedPage = Math.max(1, Number(page) || 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parsedLimit),
      Task.countDocuments(filter)
    ]);

    return res.json({
      tasks,
      meta: {
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit) || 1,
        limit: parsedLimit
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get task by ID
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (err) {
    next(err);
  }
};

//Update a task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};

    const allowed = ['title', 'description', 'status'];
    const payload = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) payload[key] = updates[key];
    }

    if (payload.title && !payload.title.trim()) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const task = await Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete a task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
