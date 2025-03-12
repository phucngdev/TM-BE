const messageRepository = require("../repository/message.repository");

module.exports.sendMessage = async (body) => {
  try {
    const newMessage = await messageRepository.sendMessage(
      body.senderId,
      body.roomId,
      body.content
    );
    return {
      status: 201,
      message: "Message sent successfully",
      newMessage,
    };
  } catch (error) {
    throw new Error(`Error sending message: ${error.message}`);
  }
};

module.exports.getMessagesByRoom = async (roomId, limit, page) => {
  try {
    const messages = await messageRepository.getMessagesByRoom(
      roomId,
      limit,
      page
    );
    return {
      status: 200,
      roomId,
      hasMore: messages.hasMore,
      messages: messages.messages,
    };
  } catch (error) {
    throw new Error(`Error retrieving messages by room: ${error.message}`);
  }
};

module.exports.deleteMessage = async (messageId) => {
  try {
    const deleted = await messageRepository.deleteMessage(messageId);
    if (deleted) {
      return {
        status: 200,
        message: "Message deleted successfully",
      };
    } else {
      throw new Error("Message not found");
    }
  } catch (error) {
    throw new Error(`Error deleting message: ${error.message}`);
  }
};
