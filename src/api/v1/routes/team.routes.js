const TeamRoutes = require("express").Router();
const teamController = require("../controllers/team.controller");
const verifyToken = require("../middlewares/verifyToken");

TeamRoutes.post(
  "/new-team",
  verifyToken.verifyTokenWithRoles(["Admin", "PM"]),
  teamController.createTeam
);
TeamRoutes.get(
  "/all-teams",
  verifyToken.verifyToken,
  teamController.getAllTeams
);
TeamRoutes.get(
  "/one-team/:id",
  verifyToken.verifyToken,
  teamController.getOneTeam
);

module.exports = { TeamRoutes };
