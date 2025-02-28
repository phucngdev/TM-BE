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

module.exports.swapTaskStatus = async (activeId, overId) => {
  try {
    const taskActive = await Task.findById(activeId);
    const taskOver = await Task.findById(overId);

    if (!taskActive || !taskOver) {
      throw new Error("Một trong hai task không tồn tại.");
    }

    const tempStatusIndex = taskActive.status_index;
    taskActive.status_index = taskOver.status_index;
    taskOver.status_index = tempStatusIndex;

    await taskActive.save();
    await taskOver.save();

    return {
      activeId,
      overId,
      activeIndex: taskActive.status_index,
      overIndex: taskOver.status_index,
      status: taskActive.status,
    };
  } catch (error) {
    throw new Error(error);
  }
};
