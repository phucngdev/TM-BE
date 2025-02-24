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
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      throw new Error("Missing required fields");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
