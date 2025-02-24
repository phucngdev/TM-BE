const userRepository = require("../repository/user.repository");
const jwtUtils = require("../utils/iwtUtils");
const CryptoJS = require("crypto-js");

module.exports.getMyInfo = async (accessToken) => {
  try {
    const { userId } = jwtUtils.verifyToken(accessToken);

    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      status: 200,
      user,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createPersonnel = async (body) => {
  try {
    const { encryptedData } = body;

    // Giải mã dữ liệu
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.VITE_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const newPersonnel = await userRepository.createUser(decryptedData);

    return {
      status: 201,
      message: "Personnel created successfully",
      newPersonnel,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllPersonnel = async (cookie) => {
  try {
    const { userId } = jwtUtils.verifyToken(cookie);
    const personnels = await userRepository.getAllPersonnel(userId);
    return {
      status: 200,
      personnels,
    };
  } catch (error) {
    throw new Error(error);
  }
};
