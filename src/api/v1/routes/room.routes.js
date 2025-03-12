const RoomRoutes = require("express").Router();
const roomController = require("../controllers/room.controller");

RoomRoutes.post("/new-room", roomController.createRoom);
RoomRoutes.get("/all-room", roomController.getAllRoomChat);
RoomRoutes.get("/one-room/:id", roomController.getOneRoomChat);
RoomRoutes.get("/check-room/:id", roomController.getRoomByMembers);

module.exports = { RoomRoutes };
