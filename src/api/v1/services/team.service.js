const teamRepository = require("../repository/team.repository");

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

module.exports.getAllTeams = async () => {
  try {
    const teams = await teamRepository.getAllTeams();
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
