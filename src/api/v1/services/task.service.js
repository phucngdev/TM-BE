const taskRepository = require("../repository/task.repository");

module.exports.getAllTaskService = async (projectId) => {
  try {
    const tasks = await taskRepository.getAllTasks(projectId);
    return {
      tasks,
      status: 200,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createTask = async (body) => {
  try {
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
    };
    console.log("🚀 ~ module.exports.createTask= ~ taskData:", taskData);
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
