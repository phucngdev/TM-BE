const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    documents: [
      {
        title: {
          type: String,
          trim: true,
        },
        docs: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
    start_date: {
      type: Date,
    },
    due_date: {
      type: Date,
    },
    budget: {
      type: Number,
    },
    client: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "completed", "on_hold", "archived"],
      default: "active",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    PM: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    requests: [
      {
        request: {
          type: String,
          trim: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
        created_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    notes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        note: {
          type: String,
          trim: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    questions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        question: {
          type: String,
          trim: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status_history: [
      {
        status: String,
        updated_at: Date,
      },
    ],
  },
  { timestamps: true }
);

let Project = mongoose.model("Project", projectSchema);
module.exports = { Project };
