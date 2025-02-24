const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models/token.model");
require("dotenv").config();

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACC_SECRET, { expiresIn: "15m" });
};

module.exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REF_SECRET, { expiresIn: "7d" });
};

module.exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACC_SECRET);
};

module.exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REF_SECRET);
};

module.exports.generateTokens = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACC_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REF_SECRET, {
    expiresIn: "7d",
  });

  // Lưu refresh token vào database
  await RefreshToken.create({
    userId: payload.userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
  });

  return { accessToken, refreshToken };
};
