const express = require('express');
const router = express.Router();
const taskcontroller = require('../controller/taskcontroller');

// Routes
router.post('/tasks', taskcontroller.createTask);
router.get('/tasks', taskcontroller.getTasks);
router.get('/tasks/:id', taskcontroller.getTaskById);
router.put('/tasks/:id', taskcontroller.updateTask);
router.delete('/tasks/:id', taskcontroller.deleteTask);

module.exports = router;
