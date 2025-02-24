const tagRepository = require("../repository/tag.repository");

module.exports.createTag = async (body) => {
  try {
    const tagData = {
      name: body.name,
      project: body.project,
      created_by: body.created_by,
    };
    const newTag = await tagRepository.createTag(tagData);
    return {
      status: 201,
      message: "Tag created successfully",
      newTag,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTags = async (projectId) => {
  try {
    const tags = await tagRepository.getAllTags(projectId);
    return {
      status: 200,
      tags,
    };
  } catch (error) {
    throw new Error(error);
  }
};
