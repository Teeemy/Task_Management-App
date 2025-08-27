const Task = require("../models/task.model");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, deadline,...others } = req.body;
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      deadline,
      ...others
    });
    res.status(201).json({ task, message: "Task Created Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tasks by a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res
      .status(200)
      .json({
        tasks,
        count: tasks.length,
        message: "Tasks fetched Successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Task by UserID
const getTaskById = async (req, res) => {
  const taskid = req.query.id;
  try {
    const task = await Task.findOne({ id: taskid, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task, message: "Tasks fetched Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const taskId = req.query.id; // get task id from query
  if (!taskId) return res.status(400).json({ message: "Task ID is required" });

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or you are not authorized" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const taskId = req.params.id; // get task id from route param
  if (!taskId) return res.status(400).json({ message: "Task ID is required" });

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or you are not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
