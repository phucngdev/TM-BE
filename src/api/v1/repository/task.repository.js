const { Task } = require("../models/task.model");

module.exports.createTask = async (taskData) => {
  try {
    let task = await Task.create(taskData);
    task = await Task.findById(task._id)
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags") // Lấy thông tin tag
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .populate("status_history", "-updatedAt");
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTasks = async (projectId) => {
  try {
    const tasks = await Task.find({ project: projectId })
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags", "name") // Lấy thông tin tag
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .sort({ createdAt: 1 });

    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTask = async (taskId) => {
  try {
    const task = await Task.findById(taskId)
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags", "name") // Lấy thông tin tag
      .populate("created_by", "name email")
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .populate("status_history");
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getMaxIndexByStatus = async (status) => {
  try {
    const maxIndexTask = await Task.findOne({ status }).sort("-status_index");
    return maxIndexTask;
  } catch (error) {
    throw new Error(error);
  }
};
