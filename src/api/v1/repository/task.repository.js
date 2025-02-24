const { Task } = require("../models/task.model");

module.exports.createTask = async (taskData) => {
  try {
    let task = await Task.create(taskData);
    task = await Task.findById(task._id)
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags") // Lấy thông tin tag
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .populate("status_history", "-updatedAt")
      .exec();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTasks = async (projectId) => {
  try {
    const tasks = await Task.find({ project: projectId })
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags") // Lấy thông tin tag
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .sort({ createdAt: 1 })
      .exec(); // Sắp xếp task mới nhất lên đầu

    // Nhóm tasks theo status
    let groupedTasks = {
      todo: [],
      in_progress: [],
      review: [],
      done: [],
    };

    tasks.forEach((task) => {
      groupedTasks[task.status].push(task);
    });

    return groupedTasks;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTask = async (taskId) => {
  try {
    const task = await Task.findById(taskId)
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags") // Lấy thông tin tag
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .populate("status_history", "-updatedAt")
      .exec(); // Lấy thông tin status_history, loại b�� field updatedAt
    return task;
  } catch (error) {
    throw new Error(error);
  }
};
