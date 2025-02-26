const teamRepository = require("../repository/team.repository");
const jwtUtils = require("../utils/iwtUtils");

module.exports.createTeam = async (body) => {
  try {
    const newTeam = await teamRepository.createTeam(body);
    return {
      status: 201,
      message: "Team created successfully",
      newTeam,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTeams = async (token) => {
  try {
    const { userId } = jwtUtils.verifyToken(token);
    const teams = await teamRepository.getAllTeams(userId);
    return {
      status: 200,
      teams,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTeam = async (teamId) => {
  try {
    const team = await teamRepository.getOneTeam(teamId);
    return {
      status: 200,
      team,
    };
  } catch (error) {
    throw new Error(error);
  }
};
