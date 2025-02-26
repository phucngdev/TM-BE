const { User } = require("../models/user.model");

module.exports.register = async (userData) => {
  try {
    // Tạo người dùng mới với giá trị admin tạm thời (ví dụ: null)
    const newUser = new User({ ...userData, admin: null });
    // Lưu người dùng vào database (bỏ qua validation)
    await newUser.save({ validateBeforeSave: false });
    // Cập nhật trường admin bằng _id của newUser
    newUser.admin = newUser._id;
    // Lưu lại thay đổi (lần này sẽ validate)
    await newUser.save();
    return newUser;
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
