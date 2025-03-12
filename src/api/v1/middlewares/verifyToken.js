const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

// kiểm tra token admin
module.exports.verifyTokenWithRoles = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Lấy token từ cookie
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(401).json({ message: "Token is required" });
      }

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_ACC_SECRET);
      if (!decoded) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Kiểm tra thời gian hết hạn
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > decoded.exp) {
        return res.status(401).json({ message: "Token expired" });
      }

      // Tìm user trong database
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kiểm tra quyền hạn
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      // Gán thông tin user vào request để sử dụng sau này
      //   req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};

// kiểm tra token
module.exports.verifyToken = async (req, res, next) => {
  try {
    // lấy token
    const token = req.cookies.accessToken;
    if (!token) {
      // không có token trả về status 400
      return res
        .status(401)
        .json({ status: 401, message: "Token is required" });
    }
    // giải mã token
    const decoded = jwt.verify(token, process.env.JWT_ACC_SECRET);
    if (!decoded) {
      // giải mã sai trả về token từ chối truy cập
      return res.status(500).json({ status: 500, message: "Access denied" });
    }
    // lấy time hiện tại
    const currentTime = Math.floor(Date.now() / 1000);
    // lấy time hết hạn token
    const expiresIn = decoded.exp;
    // so sánh
    const isExpired = currentTime > expiresIn;
    if (isExpired) {
      // isExpired = true hết hạn token trả về 401
      return res.status(401).json({ status: 401, message: "Token expired" });
    }
    // kiểm tra user
    const user = await User.findById(decoded.userId);

    if (!user) {
      // không tồn tại user trả về 404
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    if (user.status === 0) {
      // user đã bị khoá trả về 403
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("isLogin");
      return res
        .status(403)
        .json({ status: 403, message: "User is not active" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
