// task.route.js
const express = require("express");
const router = express.Router();
const  authenticate  = require("../middlewares/auth.middleware");
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/task.controller");

// Protect all task routes
router.post("/", authenticate, createTask);
router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTaskById);
router.put("/", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
