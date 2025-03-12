const UserRoutes = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

UserRoutes.get("/my-info", userController.getMyInfo);
UserRoutes.get(
  "/personnels",
  verifyToken.verifyTokenWithRoles(["Admin", "PM", "Lead"]),
  userController.getAllPersonnel
);
UserRoutes.get(
  "/personnels-chart",
  verifyToken.verifyTokenWithRoles(["Admin", "PM", "Lead"]),
  userController.getAllPersonelChart
);
UserRoutes.post(
  "/new-personnel",
  verifyToken.verifyTokenWithRoles(["Admin", "PM", "Lead"]),
  userController.createPersonnel
);

module.exports = { UserRoutes };
