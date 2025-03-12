const redisClient = require("../../../config/redis");
const { Tag } = require("../models/tag.model");

module.exports.createTag = async (tagData) => {
  try {
    const tag = await Tag.create(tagData);
    await redisClient.del(`tags:${tagData.project}`);
    return tag;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllTags = async (projectId) => {
  try {
    // Kiểm tra cache trên Redis
    const cacheKey = `tags:${projectId}`;
    const cachedTags = await redisClient.get(cacheKey);
    if (cachedTags) {
      return {
        status: 200,
        tags: JSON.parse(cachedTags), // Parse lại thành object
      };
    }
    // Nếu không có trong cache, lấy từ DB
    const tags = await Tag.find({ project: projectId }).populate("created_by");
    // Lưu vào Redis với thời gian hết hạn (10 phút)
    await redisClient.setEx(cacheKey, 600, JSON.stringify(tags));
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
