const RoomRoutes = require("express").Router();
const roomController = require("../controllers/room.controller");
const verifyToken = require("../middlewares/verifyToken");

RoomRoutes.post(
  "/new-room",
  verifyToken.verifyToken,
  roomController.createRoom
);
RoomRoutes.get(
  "/all-room",
  verifyToken.verifyToken,
  roomController.getAllRoomChat
);
RoomRoutes.get(
  "/one-room/:id",
  verifyToken.verifyToken,
  roomController.getOneRoomChat
);
RoomRoutes.get(
  "/check-room/:id",
  verifyToken.verifyToken,
  roomController.getRoomByMembers
);

module.exports = { RoomRoutes };
