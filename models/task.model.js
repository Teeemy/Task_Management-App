const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: { type: String, required: true},
    deadline: { type: Date },
    completed: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      enum: ["Work", "Personal", "Study", "Shopping", "Other"],
      default: "Work",
    },

  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
