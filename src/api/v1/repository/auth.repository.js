const { User } = require("../models/user.model");

module.exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.findRefreshToken = async (ref) => {
  try {
    // return await User.findOne({ refreshToken: ref });
  } catch (error) {
    throw new Error(error);
  }
};
