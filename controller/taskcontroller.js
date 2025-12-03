import Task from "../models/taskmodel.js";

// Create a new Task
export const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = new Task({ title, description, status });
  const saved = await task.save();

  return res.status(201).json(saved);
};

// Get all Tasks with filtering, searching, pagination
export const getTasks = async (req, res) => {
  const { search, status, page = 1, limit = 20 } = req.query;

  const query = {};

  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: "i" };

  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Task.countDocuments(query);

  return res.json({ tasks, total });
};

// Get Task by ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
};

//update Task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  const updated = await task.save();

  return res.json(updated);
};

// Delete Task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ message: "Task deleted" });
};
