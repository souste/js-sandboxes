const { Router } = require("express");
const router = Router();

const {
  createPostController,
  createCommentByPostController,
} = require("../controllers/socialController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/posts", createPostController);
router.post("/posts/:postId/comments", createCommentByPostController);

module.exports = router;
