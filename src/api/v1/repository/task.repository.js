const redisClient = require("../../../config/redis");
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

    // Xóa cache danh sách task của project sau khi tạo mới
    await redisClient.del(`tasks:${task.project._id}`);
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTasks = async (projectId, userId = null) => {
  try {
    const cacheKey = userId
      ? `tasks:${projectId}:user:${userId}`
      : `tasks:${projectId}`;

    // Kiểm tra cache trên Redis
    const cachedTasks = await redisClient.get(cacheKey);
    if (cachedTasks) {
      return JSON.parse(cachedTasks);
    }

    let filter = { project: projectId };

    if (userId) {
      filter.$or = [{ assigned_to: userId }];
    }
    const tasks = await Task.find(filter)
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags", "name") // Lấy thông tin tag
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .sort({ createdAt: 1 });

    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(tasks));

    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTask = async (taskId) => {
  try {
    const cacheKey = `task:${taskId}`;

    // Kiểm tra cache trên Redis
    const cachedTask = await redisClient.get(cacheKey);
    if (cachedTask) {
      return JSON.parse(cachedTask);
    }
    const task = await Task.findById(taskId)
      .populate("assigned_to", "name email") // Lấy thông tin user được assign
      .populate("project", "name") // Lấy tên project
      .populate("tags", "name") // Lấy thông tin tag
      .populate("created_by", "name email")
      .populate("comments.user", "name email") // Lấy thông tin user trong comments
      .populate("status_history");

    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(task));
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
