const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "review", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    due_date: {
      type: Date,
    },
    start_date: {
      type: Date,
    },
    completed_at: {
      type: Date,
    },
    assigned_to: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    viewed: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status_history: [
      {
        status: String,
        updated_at: Date,
      },
    ],
  },
  { timestamps: true }
);

let Task = mongoose.model("Task", taskSchema);
module.exports = { Task };
