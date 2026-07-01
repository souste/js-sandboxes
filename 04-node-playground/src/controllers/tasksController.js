const {
  getTasksModel,
  getTaskModel,
  createTaskModel,
  updateTaskModel,
  deleteTaskModel,
} = require("../models/tasksModel");

const getTasksController = async (req, res) => {
  try {
    const tasks = await getTasksModel();

    res.status(200).json({
      success: true,
      data: tasks,
      message: "Tasks retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await getTaskModel(id);

    res.status(200).json({
      success: true,
      data: task,
      message: "Task retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createTaskController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Tasks require a name and description",
      });
    }

    const created = await createTaskModel(name, description);

    res.status(201).json({
      success: true,
      data: created,
      message: "Task created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Tasks require a name and description",
      });
    }

    const updated = await updateTaskModel(name, description, id);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updated,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteTaskModel(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deleted,
      message: "Task deleted successfully",
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
  getTasksController,
  getTaskController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
