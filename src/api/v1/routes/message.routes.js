const MessageRoutes = require("express").Router();
const messageController = require("../controllers/message.controller");

MessageRoutes.post("/send-message", messageController.sendMessage);
MessageRoutes.get("/get-message/:id", messageController.getMessagesByRoom);

module.exports = { MessageRoutes };
