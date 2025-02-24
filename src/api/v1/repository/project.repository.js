const { Project } = require("../models/project.model");

module.exports.createProject = async (projectData) => {
  try {
    let newProject = await Project.create(projectData);
    newProject = await Project.findById(newProject._id).populate(
      "leader PM members"
    );
    return newProject;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllProjects = async () => {
  try {
    let projects = await Project.find().populate("leader PM members");
    return projects;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneProject = async (projectId) => {
  try {
    let project = await Project.findById(projectId)
      .populate("leader PM members")
      .populate({
        path: "tasks",
        populate: { path: "assigned_to", select: "name email" }, // Populate thêm user nếu cần
      });

    if (!project) {
      throw new Error("Project not found");
    }

    // Nhóm tasks theo status
    const groupedTasks = project.tasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});

    return { ...project.toObject(), tasks: groupedTasks };
  } catch (error) {
    throw new Error(error);
  }
};
