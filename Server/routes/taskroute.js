import express from 'express';
import {
createTask,
getTasks,
getTaskById,
updateTask,
deleteTask
} from '../controller/taskcontroller.js';

import { validateTask } from "../middleware/validatetask.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;