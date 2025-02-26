const projectRepository = require("../repository/project.repository");
const jwtUtils = require("../utils/iwtUtils");

module.exports.createProject = async (body) => {
  try {
    const dataCore = {
      name: body.name,
      description: body.description,
      documents: body.documents,
      budget: +body.budget,
      client: body.client,
      start_date: new Date(body.start_date),
      due_date: new Date(body.due_date),
      created_by: body.created_by,
      PM: body.PM,
      leader: body.leader,
      members: body.members,
      admin: body.admin,
    };
    const requests = body.requests.map((req) => {
      return {
        request: req,
        created_at: new Date(),
        created_by: body.created_by,
      };
    });
    const projectData = {
      ...dataCore,
      requests: requests,
    };

    const newProject = await projectRepository.createProject(projectData);
    return {
      status: 201,
      message: "Project created successfully",
      newProject,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllProjects = async (token) => {
  try {
    const { userId } = jwtUtils.verifyToken(token);
    const projects = await projectRepository.getAllProjects(userId);
    return {
      status: 200,
      projects,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneProject = async (projectId) => {
  try {
    const project = await projectRepository.getOneProject(projectId);
    return {
      status: 200,
      project,
    };
  } catch (error) {
    throw new Error(error);
  }
};
