const authService = require("../services/auth.service");

module.exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (result.status === 200) {
      res
        .cookie("accessToken", result.accessToken, {
          httpOnly: true, // client ko lây ra đc bằng js
          expires: new Date(Date.now() + 15 * 60 * 1000), // 6 tiếng
          secure: true, // true nêu https
          sameSite: "none", // cho phép gửi cookie tới web khác
        })
        .cookie("isLogin", true, {
          httpOnly: false,
          expires: new Date(Date.now() + 15 * 60 * 1000), // 6 tiếng
          secure: true, // true nêu https
          sameSite: "none", // cho phép gửi cookie tới web khác
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          secure: true,
          sameSite: "none",
        });
    }
    return res
      .status(result.status)
      .json({ status: result.status, message: result.message });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    if (result.status === 201) {
      res
        .cookie("accessToken", result.accessToken, {
          httpOnly: true, // client ko lây ra đc bằng js
          expires: new Date(Date.now() + 15 * 60 * 1000),
          secure: true, // true nêu https
          sameSite: "none", // cho phép gửi cookie tới web khác
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          secure: true,
          sameSite: "none",
        });
    }
    return res
      .status(result.status)
      .json({ status: result.status, message: result.message });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const result = await authService.refreshToken(req.cookie.refreshToken);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
