const TagRoutes = require("express").Router();
const tagController = require("../controllers/tag.controller");

TagRoutes.post("/new-tag", tagController.createTag);
TagRoutes.get("/all-tags/:id", tagController.getAllTags);

module.exports = { TagRoutes };
