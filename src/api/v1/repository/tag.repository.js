const { Tag } = require("../models/tag.model");

module.exports.createTag = async (tagData) => {
  try {
    const tag = await Tag.create(tagData);
    return tag;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTags = async (projectId) => {
  try {
    const tags = await Tag.find({ project: projectId }).populate("created_by");
    return tags;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteTag = async (tagId) => {
  try {
    await Tag.findByIdAndDelete(tagId);
    return { message: "Tag deleted successfully" };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updateTag = async (tagId, tagData) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(tagId, tagData, {
      new: true,
    });
    return updatedTag;
  } catch (error) {
    throw new Error(error);
  }
};
