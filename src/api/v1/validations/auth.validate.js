const CryptoJS = require("crypto-js");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Missing email or password");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { encryptedData } = req.body;

    // Giải mã dữ liệu
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.VITE_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const { name, email, password, phone } = decryptedData;
    console.log("🚀 ~ module.exports.register= ~ req.body:", req.body);
    if (!name || !email || !password || !phone) {
      throw new Error("Missing required fields");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
