const messageService = require("../services/message.service");

module.exports.sendMessage = async (req, res) => {
  try {
    const result = await messageService.sendMessage(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getMessagesByRoom = async (req, res) => {
  try {
    const result = await messageService.getMessagesByRoom(
      req.params.id,
      req.query.limit,
      req.query.page
    );
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
