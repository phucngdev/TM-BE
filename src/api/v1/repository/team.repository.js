const { Team } = require("../models/team.model");

module.exports.createTeam = async (teamData) => {
  try {
    let newTeam = await Team.create(teamData);
    newTeam = await Team.findById(newTeam._id).populate("leader");
    return newTeam;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getTeamById = async (userId) => {
  try {
    return await Team.findById(userId).populate("members");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getTeamByMemberId = async (memberId) => {
  try {
    return await Team.findOne({ members: memberId }).populate("members");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTeams = async () => {
  try {
    return await Team.find().populate("members leader");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTeam = async (teamId) => {
  try {
    return await Team.findById(teamId)
      .populate("leader projects tasks createdBy") // Populate bình thường
      .populate({
        path: "members",
        select: "-password", // Loại bỏ password khi populate members
      });
  } catch (error) {
    console.log("🚀 ~ module.exports.getOneTeam= ~ error:", error);
    throw new Error(error);
  }
};
