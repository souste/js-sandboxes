const { Router } = require("express");
const router = Router();

const {
  getTasksController,
  createTaskController,
} = require("../controllers/tasksController");

router.get("/", getTasksController);
router.post("/", createTaskController);

module.exports = router;
