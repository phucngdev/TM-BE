const authRepository = require("../repository/auth.repository");
const jwtUtils = require("../utils/iwtUtils");
const CryptoJS = require("crypto-js");

module.exports.login = async (body) => {
  try {
    const { encryptedData } = body;

    // Giải mã dữ liệu
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.VITE_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Kiểm tra email và mật khẩu
    const user = await authRepository.findUserByEmail(decryptedData.email);
    if (!user) {
      throw new Error("Invalid email");
    }
    const isPasswordValid = await user.comparePassword(decryptedData.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Tạo JWT
    const { accessToken, refreshToken } = await jwtUtils.generateTokens({
      userId: user._id,
    });

    return {
      status: 200,
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports.register = async (body) => {
  try {
    const { name, email, password, phone, role } = body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Tạo người dùng mới
    const newUser = await authRepository.createUser({
      name,
      email,
      password,
      phone,
      role,
    });

    // Tạo JWT
    const { accessToken, refreshToken } = jwtUtils.generateTokens({
      userId: user._id,
    });

    return {
      status: 201,
      message: "User registered successfully",
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports.refreshToken = async (refreshToken) => {
  try {
    const { userId } = jwtUtils.verifyRefreshToken(refreshToken);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
