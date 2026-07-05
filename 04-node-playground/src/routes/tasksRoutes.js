const { Router } = require("express");
const router = Router();

const {
  getTasksController,
  getTaskController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksController");

// const { authMiddleware } = require("../middlewares/authMiddleware");
const { authMiddlewareTest } = require("../middlewares/authMiddlewareTest");

// router.use(authMiddleware);
router.use(authMiddlewareTest);

router.get("/", getTasksController);
router.get("/:id", getTaskController);
router.post("/", createTaskController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

module.exports = router;
