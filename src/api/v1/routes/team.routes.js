const TeamRoutes = require("express").Router();
const teamController = require("../controllers/team.controller");

TeamRoutes.post("/new-team", teamController.createTeam);
TeamRoutes.get("/all-teams", teamController.getAllTeams);
TeamRoutes.get("/one-team/:id", teamController.getOneTeam);

module.exports = { TeamRoutes };
