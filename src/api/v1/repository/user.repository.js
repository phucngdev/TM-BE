const redisClient = require("../../../config/redis");
const { User } = require("../models/user.model");

module.exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.findUserByUsername = async (userName) => {
  try {
    return await User.findOne({ name: userName });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.findUserById = async (userId) => {
  try {
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAdminId = async (userId) => {
  try {
    const admin = await User.findById(userId).select("admin");
    return admin;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllPersonnel = async (currentUserId, adminId) => {
  try {
    // Tạo cache key dựa trên adminId
    const cacheKey = `personnel:${adminId}`;
    // Kiểm tra cache từ Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Nếu không có cache, truy vấn từ database
    const personnel = await User.find({
      _id: { $ne: currentUserId },
      admin: adminId,
    }).select("-password");

    // Lưu vào Redis với thời gian hết hạn 10 phút
    await redisClient.setEx(cacheKey, 600, JSON.stringify(personnel));

    return personnel;
  } catch (error) {
    throw new Error(error);
  }
};
