const { Message } = require("../models/message.model");

module.exports.sendMessage = async (senderId, roomId, content) => {
  try {
    let message = new Message({
      content,
      sender: senderId,
      room: roomId,
      readed: [{ user: senderId, read_at: new Date() }], // Người gửi mặc định đã đọc
    });

    await message.save();

    message = await Message.findById(message._id).populate(
      "sender",
      "name email"
    );

    return message;
  } catch (error) {
    throw new Error("Lỗi khi gửi tin nhắn: " + error.message);
  }
};

module.exports.getMessagesByRoom = async (roomId, limit = 20, page = 1) => {
  try {
    const messages = await Message.find({ room: roomId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 }) // Lấy mới nhất trước
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    // Kiểm tra xem còn tin nhắn nào nữa không
    const totalMessages = await Message.countDocuments({ room: roomId });
    const hasMore = page * limit < totalMessages;

    return {
      messages,
      hasMore,
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy tin nhắn: " + error.message);
  }
};

module.exports.getLastMessageByRoom = async (roomId) => {
  try {
    const lastMessage = await Message.findOne({ room: roomId })
      .populate("sender", "name email")
      .sort({ createdAt: -1 })
      .exec();
    return lastMessage;
  } catch (error) {
    throw new Error("Lỗi khi lấy tin nhắn cuối cùng: " + error.message);
  }
};

module.exports.markMessageAsRead = async (messageId, userId) => {
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      throw new Error("Không tìm thấy tin nhắn");
    }

    const isAlreadyRead = message.readed.some(
      (read) => read.user.toString() === userId
    );

    if (!isAlreadyRead) {
      message.readed.push({ user: userId, read_at: new Date() });
      await message.save();
    }

    return message;
  } catch (error) {
    throw new Error("Lỗi khi đánh dấu tin nhắn đã đọc: " + error.message);
  }
};

module.exports.deleteMessage = async (messageId) => {
  try {
    const result = await Message.findByIdAndDelete(messageId);
    return !!result;
  } catch (error) {
    throw new Error("Lỗi khi xóa tin nhắn: " + error.message);
  }
};

module.exports.updateMessage = async (messageId, content) => {
  try {
    const message = await Message.findByIdAndUpdate(messageId, {
      content: content,
      status: "edit",
    });
    return message;
  } catch (error) {
    throw new Error("L��i khi cập nhật tin nhắn: " + error.message);
  }
};
