const ProjectRoutes = require("express").Router();
const projectController = require("../controllers/project.controller");

ProjectRoutes.post("/new-project", projectController.createProject);
ProjectRoutes.get("/all-projects", projectController.getAllProjects);
ProjectRoutes.get("/one-project/:id", projectController.getOneProject);

module.exports = { ProjectRoutes };
