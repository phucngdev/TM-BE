const ProjectRoutes = require("express").Router();
const projectController = require("../controllers/project.controller");
const verifyToken = require("../middlewares/verifyToken");

ProjectRoutes.post(
  "/new-project",
  verifyToken.verifyTokenWithRoles(["Admin", "PM"]),
  projectController.createProject
);
ProjectRoutes.get(
  "/all-projects",
  verifyToken.verifyToken,
  projectController.getAllProjects
);
ProjectRoutes.get(
  "/one-project/:id",
  verifyToken.verifyToken,
  projectController.getOneProject
);

module.exports = { ProjectRoutes };
