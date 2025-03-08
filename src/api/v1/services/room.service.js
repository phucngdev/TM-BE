const roomRepository = require("../repository/room.repository");
const jwtUtils = require("../utils/iwtUtils");

module.exports.createRoom = async (body) => {
  try {
    const roomData = {
      name: body?.name,
      type: body.type,
      members: body.members,
    };
    const newRoom = await roomRepository.createRoom(roomData);
    return {
      status: 201,
      message: "Tag created successfully",
      newRoom,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllRoomChat = async (token) => {
  try {
    const { userId } = jwtUtils.verifyToken(token);
    const rooms = await roomRepository.getAllRoomChat(userId);
    return {
      status: 200,
      rooms,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getRoomByMembers = async (token, memberId) => {
  try {
    const { userId } = jwtUtils.verifyToken(token);
    const room = await roomRepository.getRoomByMembers(userId, memberId);
    return {
      status: 200,
      room,
    };
  } catch (error) {
    throw new Error(error);
  }
};
