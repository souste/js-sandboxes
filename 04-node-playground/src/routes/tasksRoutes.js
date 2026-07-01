const { Router } = require("express");
const router = Router();

const {
  getTasksController,
  getTaskController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksController");

router.get("/", getTasksController);
router.get("/:id", getTaskController);
router.post("/", createTaskController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

module.exports = router;
