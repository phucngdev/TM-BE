const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    readed: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        read_at: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = { Message };
