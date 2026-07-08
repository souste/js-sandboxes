const { Router } = require("express");
const router = Router();

const {
  createPostController,
  createCommentByPostController,
  getAllUsersController,
  getPostsAndCommentCountByUserController,
} = require("../controllers/socialController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/users", getAllUsersController);
router.get("/posts", getPostsAndCommentCountByUserController);
router.post("/posts", createPostController);
router.post("/posts/:postId/comments", createCommentByPostController);

module.exports = router;
