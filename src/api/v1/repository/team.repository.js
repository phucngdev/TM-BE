const redisClient = require("../../../config/redis");
const { Team } = require("../models/team.model");
const { User } = require("../models/user.model");

module.exports.createTeam = async (teamData) => {
  try {
    let newTeam = await Team.create(teamData);
    newTeam = await Team.findById(newTeam._id).populate("leader");
    // Xóa cache danh sách sau khi tạo mới
    await redisClient.del(`teams:admin:${teamData.admin}`);
    return newTeam;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getTeamById = async (userId) => {
  try {
    const cacheKey = `team:${userId}`;

    // Kiểm tra cache trên Redis
    const cachedTeam = await redisClient.get(cacheKey);
    if (cachedTeam) {
      return JSON.parse(cachedTeam);
    }
    // Nếu không có cache, lấy từ DB
    const team = await Team.findById(userId).populate("members");

    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(team));

    return team;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getTeamByMemberId = async (memberId) => {
  try {
    const cacheKey = `team:member:${memberId}`;

    // Kiểm tra cache trên Redis
    const cachedTeam = await redisClient.get(cacheKey);
    if (cachedTeam) {
      return JSON.parse(cachedTeam);
    }

    // Nếu không có cache, lấy từ DB
    const team = await Team.findOne({ members: memberId }).populate("members");

    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(team));

    return team;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTeams = async (userId) => {
  try {
    const cacheKey = `teams:admin:${userId}`;

    // Kiểm tra cache trên Redis
    const cachedTeams = await redisClient.get(cacheKey);
    if (cachedTeams) {
      return JSON.parse(cachedTeams);
    }

    // Nếu không có cache, lấy từ DB
    const adminId = await User.findById(userId);
    const teams = await Team.find({ admin: adminId }).populate(
      "members leader"
    );

    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(teams));

    return teams;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneTeam = async (teamId) => {
  try {
    const cacheKey = `team:${teamId}`;

    // Kiểm tra cache trên Redis
    const cachedTeam = await redisClient.get(cacheKey);
    if (cachedTeam) {
      return JSON.parse(cachedTeam);
    }

    // Nếu không có cache, lấy từ DB
    const team = await Team.findById(teamId)
      .populate("leader projects tasks createdBy")
      .populate({
        path: "members",
        select: "-password",
      });

    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(team));

    return team;
  } catch (error) {
    console.log("🚀 ~ module.exports.getOneTeam= ~ error:", error);
    throw new Error(error);
  }
};
