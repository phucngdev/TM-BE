const teamService = require("../services/team.service");

module.exports.createTeam = async (req, res) => {
  try {
    const result = await teamService.createTeam(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllTeams = async (req, res) => {
  try {
    const result = await teamService.getAllTeams();
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getOneTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await teamService.getOneTeam(id);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
