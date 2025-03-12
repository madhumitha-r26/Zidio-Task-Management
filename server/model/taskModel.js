const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userEmail: { type: String, required: true }, // Reference to user's email
});

const taskModel = mongoose.model("tasks", taskSchema);
module.exports = taskModel;
