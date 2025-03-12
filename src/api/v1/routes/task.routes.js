const TaskRoutes = require("express").Router();
const taskController = require("../controllers/task.controller");
const verifyToken = require("../middlewares/verifyToken");

TaskRoutes.get(
  "/all-tasks/:projectId",
  verifyToken.verifyToken,
  taskController.getAllTask
);
TaskRoutes.get(
  "/all-my-tasks/:projectId",
  verifyToken.verifyToken,
  taskController.getAllMyTask
);
TaskRoutes.get(
  "/one-task/:id",
  verifyToken.verifyToken,
  taskController.getOneTask
);
TaskRoutes.post(
  "/new-task",
  verifyToken.verifyTokenWithRoles(["Admin", "PM", "Lead"]),
  taskController.createTask
);
TaskRoutes.post(
  "/swap-task",
  verifyToken.verifyTokenWithRoles(["Admin", "PM", "Lead"]),
  taskController.swapTaskStatus
);

module.exports = { TaskRoutes };
