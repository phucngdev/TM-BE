const { User } = require("../models/user.model");

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

module.exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllPersonnel = async (currentUserId) => {
  try {
    return await User.find({ _id: { $ne: currentUserId } }).select("-password");
  } catch (error) {
    throw new Error(error);
  }
};
