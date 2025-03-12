const { Room } = require("../models/room.model");

module.exports.createRoom = async (roomData) => {
  try {
    let room = await Room.create(roomData);
    room = await Room.findById(room._id)
      .populate({
        path: "members",
        select: "name avatar",
      })
      .populate({
        path: "lastMessage",
        select: "sender content createdAt",
        populate: {
          path: "sender",
          select: "name avatar", // Lấy thông tin người gửi
        },
      });
    return room;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllRoomChat = async (userId) => {
  try {
    const rooms = await Room.find({ members: userId })
      .populate({
        path: "members",
        select: "name avatar", // Chỉ lấy tên và avatar của thành viên
      })
      .populate({
        path: "lastMessage",
        select: "sender content createdAt", // Lấy thông tin tin nhắn cuối
        populate: {
          path: "sender",
          select: "name avatar", // Lấy thông tin người gửi
        },
      })
      .sort({ updatedAt: -1 }); // Sắp xếp theo thời gian cập nhật mới nhất

    return rooms;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneRoomChat = async (roomId) => {
  try {
    const room = await Room.findById(roomId)
      .populate({
        path: "members",
        select: "name avatar", // Chỉ lấy tên và avatar của thành viên
      })
      .populate({
        path: "lastMessage",
        select: "sender content createdAt", // Lấy thông tin tin nhắn cuối
        populate: {
          path: "sender",
          select: "name avatar", // Lấy thông tin người gửi
        },
      })
      .sort({ updatedAt: -1 }); // Sắp xếp theo th��i gian cập nhật mới nhất

    return room;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getRoomByMembers = async (stMemberId, ndMemberId) => {
  try {
    const room = await Room.findOne({
      members: { $all: [stMemberId, ndMemberId] },
    }).populate({
      path: "members",
      select: "name avatar",
    });
    return room;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteRoom = async (roomId) => {
  try {
    await Room.findByIdAndDelete(roomId);
    return { message: "Tag deleted successfully" };
  } catch (error) {
    throw new Error(error);
  }
};
