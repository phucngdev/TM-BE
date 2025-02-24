const projectService = require("../services/project.service");

module.exports.createProject = async (req, res) => {
  try {
    const result = await projectService.createProject(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const result = await projectService.getAllProjects();
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getOneProject = async (req, res) => {
  try {
    const result = await projectService.getOneProject(req.params.id);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
