const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "PM", "Lead", "Member"],
      default: "Member",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    avatar: {
      type: String,
      default: "default-avatar.png",
    },
    assigned_tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    created_projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    join_projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu vào database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Phương thức so sánh mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

let User = mongoose.model("User", userSchema);
module.exports = { User };
