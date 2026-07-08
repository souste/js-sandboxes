const {
  getAllUsersModel,
  getPostsAndCommentCountByUserModel,
  getPostByIdModel,
  getCommentsByPostModel,
  createPostModel,
  createCommentByPostModel,
} = require("../models/socialModel");

const getAllUsersController = async (req, res) => {
  const result = await getAllUsersModel();

  res.status(200).json({
    success: true,
    data: result,
    message: "Users retrieved successfuly",
  });
};

const getPostsAndCommentCountByUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getPostsAndCommentCountByUserModel(userId);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    const filteredResult = {
      username: result[0].username,
      posts: result.map(({ username, ...post }) => post),
    };

    res.status(200).json({
      success: true,
      data: filteredResult,
      message: `Posts by user ${userId} successfully retrieved`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getCommentsByPostController = async (req, res) => {
  try {
    const postId = req.params.postId;

    const result = await getCommentsByPostModel(postId);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No post found with id ${postId}`,
      });
    }

    const filteredResult = {
      id: result[0].id,
      title: result[0].title,
      content: result[0].content,
      comments: result.map(({ id, title, content, ...comment }) => comment),
    };

    res.status(200).json({
      success: true,
      data: filteredResult,
      message: `Comments for post ${postId} retrieved successfully`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

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
  getAllUsersController,
  getPostsAndCommentCountByUserController,
  getCommentsByPostController,
  createPostController,
  createCommentByPostController,
};
