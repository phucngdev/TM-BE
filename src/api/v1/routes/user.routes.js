const UserRoutes = require("express").Router();
const userController = require("../controllers/user.controller");

UserRoutes.get("/my-info", userController.getMyInfo);
UserRoutes.get("/personnels", userController.getAllPersonnel);
UserRoutes.get("/personnels-chart", userController.getAllPersonelChart);
UserRoutes.post("/new-personnel", userController.createPersonnel);

module.exports = { UserRoutes };
