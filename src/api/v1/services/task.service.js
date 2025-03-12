const taskRepository = require("../repository/task.repository");
const jwtUtils = require("../utils/iwtUtils");

module.exports.getAllTaskService = async (projectId) => {
  try {
    const tasks = await taskRepository.getAllTasks(projectId);

    // Khởi tạo nhóm
    const groupedTasks = {
      todo: [],
      in_progress: [],
      review: [],
      done: [],
    };

    let doneCount = 0;
    const totalTasks = tasks.length;

    tasks.forEach((task) => {
      groupedTasks[task.status].push(task);
      if (task.status === "done") doneCount++;
    });

    Object.keys(groupedTasks).forEach((status) => {
      groupedTasks[status].sort((a, b) => a.order - b.order);
    });

    // Tránh lỗi chia cho 0
    const donePercent =
      totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

    return {
      tasks: groupedTasks,
      totalTasks: totalTasks,
      donePercent: donePercent,
      status: 200,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllMyTaskService = async (projectId, token) => {
  try {
    const { userId } = jwtUtils.verifyToken(token);
    const tasks = await taskRepository.getAllTasks(projectId, userId);

    // Khởi tạo nhóm
    const groupedTasks = {
      todo: [],
      in_progress: [],
      review: [],
      done: [],
    };

    tasks.forEach((task) => {
      groupedTasks[task.status].push(task);
    });

    Object.keys(groupedTasks).forEach((status) => {
      groupedTasks[status].sort((a, b) => a.order - b.order);
    });

    return {
      myTask: groupedTasks,
      status: 200,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTaskService = async (taskId) => {
  try {
    const task = await taskRepository.getOneTask(taskId);
    return {
      task,
      status: 200,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createTask = async (body) => {
  try {
    const maxIndexTask = await taskRepository.getMaxIndexByStatus(
      body.status || "todo"
    );
    const taskData = {
      title: body.title,
      description: body.description,
      due_date: new Date(body.due_date),
      start_date: new Date(body.start_date),
      assigned_to: body.assigned_to,
      project: body.project,
      tags: body.tags,
      status: body.status || "todo",
      created_by: body.created_by,
      task_case: body.task_case,
      order: maxIndexTask ? maxIndexTask.order + 1 : 0,
    };
    const newTask = await taskRepository.createTask(taskData);
    return {
      status: 201,
      message: "Task created successfully",
      newTask,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.swapTaskStatus = async (body) => {
  try {
    const { activeId, overIndex, activeStatus, overStatus } = body;
    const result = await taskRepository.swapTaskStatus(
      activeId,
      overIndex,
      activeStatus,
      overStatus
    );
    return {
      status: 200,
      result,
    };
  } catch (error) {
    throw new Error(error);
  }
};
