const TaskRoutes = require("express").Router();
const taskController = require("../controllers/task.controller");

TaskRoutes.get("/all-tasks/:projectId", taskController.getAllTask);
TaskRoutes.post("/new-task", taskController.createTask);

module.exports = { TaskRoutes };
