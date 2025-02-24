const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Chỉ dùng cho group chat, tin nhắn 1v1 không cần
      trim: true,
    },
    type: {
      type: String,
      enum: ["private", "group"], // "private" cho 1v1, "group" cho nhóm
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
module.exports = { Room };
