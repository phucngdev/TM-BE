const userService = require("../services/user.service");
module.exports.getMyInfo = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const result = await userService.getMyInfo(accessToken);
    return res.status(result.status).json(result.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createPersonnel = async (req, res) => {
  try {
    const result = await userService.createPersonnel(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllPersonnel = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const result = await userService.getAllPersonnel(accessToken);
    return res.status(result.status).json(result.personnels);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
