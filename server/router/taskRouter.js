const express = require("express");
const taskModel = require("../model/taskModel");
const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  const { title, description, dueDate, userEmail } = req.body;
  try {
    const newTask = new taskModel({ title, description, dueDate, userEmail });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get Tasks by User Email
router.get("/:userEmail", async (req, res) => {
  try {
    const tasks = await taskModel.find({ userEmail: req.params.userEmail });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;