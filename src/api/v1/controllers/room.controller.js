const roomService = require("../services/room.service");

module.exports.createRoom = async (req, res) => {
  try {
    const result = await roomService.createRoom(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllRoomChat = async (req, res) => {
  try {
    const result = await roomService.getAllRoomChat(req.cookies.accessToken);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getRoomByMembers = async (req, res) => {
  try {
    const result = await roomService.getRoomByMembers(
      req.cookies.accessToken,
      req.params.id
    );
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
