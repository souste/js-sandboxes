const { Router } = require("express");
const router = Router();

const {
  createPostController,
  createCommentByPostController,
  getAllUsersController,
  getPostsAndCommentCountByUserController,
  getCommentsByPostController,
} = require("../controllers/socialController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/users", getAllUsersController);
router.get("/posts", getPostsAndCommentCountByUserController);
router.get("/posts/:postId/comments", getCommentsByPostController);
router.post("/posts", createPostController);
router.post("/posts/:postId/comments", createCommentByPostController);

module.exports = router;
