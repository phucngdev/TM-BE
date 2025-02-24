const tagService = require("../services/tag.service");

module.exports.createTag = async (req, res) => {
  try {
    const result = await tagService.createTag(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllTags = async (req, res) => {
  try {
    const result = await tagService.getAllTags(req.params.id);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
