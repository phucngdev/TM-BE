const TagRoutes = require("express").Router();
const tagController = require("../controllers/tag.controller");
const verifyToken = require("../middlewares/verifyToken");

TagRoutes.post(
  "/new-tag",
  verifyToken.verifyTokenWithRoles(["Admin", "PM"]),
  tagController.createTag
);
TagRoutes.get(
  "/all-tags/:id",
  verifyToken.verifyToken,
  tagController.getAllTags
);

module.exports = { TagRoutes };
