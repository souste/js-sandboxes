const {
  //   getPostsByUser,
  //   getCommentsByPost,
  getPostByIdModel,
  createPostModel,
  createCommentByPostModel,
} = require("../models/socialModel");

const createPostController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content fields required",
      });
    }
    const result = await createPostModel(title, content, userId);

    res.status(201).json({
      success: true,
      data: result,
      message: "Post created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createCommentByPostController = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content field cannot be empty",
      });
    }

    const post = await getPostByIdModel(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with id ${postId} does not exist`,
      });
    }

    const result = await createCommentByPostModel(content, postId, userId);

    res.status(201).json({
      success: true,
      data: result,
      message: "Comment created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createPostController,
  createCommentByPostController,
};
