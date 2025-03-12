const { Project } = require("../models/project.model");
const { User } = require("../models/user.model");

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

module.exports.getAllProjects = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    let projects;
    if (user.role === "Admin") {
      // Nếu là admin, lấy tất cả project có admin là userId
      projects = await Project.find({ admin: userId }).populate(
        "leader PM members"
      );
    } else {
      // Nếu không phải admin, lấy các project có userId trong members
      projects = await Project.find({ members: userId }).populate(
        "leader PM members"
      );
    }

    return projects;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách project: " + error.message);
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
