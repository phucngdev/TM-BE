const taskService = require("../services/task.service");

module.exports.getAllTask = async (req, res) => {
  try {
    const tasks = await taskService.getAllTaskService(req.params.projectId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    return res.status(task.status).json(task);
  } catch (error) {
    console.log(
      "🚀 ~ module.exports.createTask= ~ error.message:",
      error.message
    );
    return res.status(500).json({ message: error.message });
  }
};
