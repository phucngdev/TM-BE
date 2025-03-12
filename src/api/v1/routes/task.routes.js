const TaskRoutes = require("express").Router();
const taskController = require("../controllers/task.controller");

TaskRoutes.get("/all-tasks/:projectId", taskController.getAllTask);
TaskRoutes.get("/all-my-tasks/:projectId", taskController.getAllMyTask);
TaskRoutes.get("/one-task/:id", taskController.getOneTask);
TaskRoutes.post("/new-task", taskController.createTask);
TaskRoutes.post("/swap-task", taskController.swapTaskStatus);

module.exports = { TaskRoutes };
