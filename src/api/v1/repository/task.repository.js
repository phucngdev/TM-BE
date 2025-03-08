const { Task } = require("../models/task.model");
const { Op } = require("sequelize");

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
    const maxIndexTask = await Task.findOne({ status }).sort("-order");
    return maxIndexTask;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.swapTaskStatus = async (
  activeId,
  overIndex,
  activeStatus,
  overStatus
) => {
  try {
    const activeTask = await Task.findById(activeId);
    if (!activeTask) {
      throw new Error("Active task not found");
    }

    if (activeStatus === overStatus) {
      // Tăng order của tất cả các task có order >= overIndex trong cùng status
      await Task.updateMany(
        { status: activeStatus, order: { $gte: overIndex } },
        { $inc: { order: 1 } }
      );

      // Cập nhật order của task được kéo đến vị trí mới
      await Task.findByIdAndUpdate(activeId, { order: overIndex });
    } else {
      // Tăng order trong danh sách mới
      await Task.updateMany(
        { status: overStatus, order: { $gte: overIndex } },
        { $inc: { order: 1 } }
      );

      // Chuyển task sang danh sách mới
      await Task.findByIdAndUpdate(activeId, {
        status: overStatus,
        order: overIndex,
      });

      // Giảm order của danh sách cũ
      await Task.updateMany(
        { status: activeStatus, order: { $gt: activeTask.order } },
        { $inc: { order: -1 } }
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
