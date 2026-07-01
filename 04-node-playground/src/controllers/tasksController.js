const { getTasksModel, createTaskModel } = require("../models/tasksModel");

const getTasksController = async (req, res) => {
  try {
    const games = await getTasksModel();

    res.status(200).json({
      success: true,
      data: games,
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
      success: fales,
      message: "Server Error",
    });
  }
};

module.exports = {
  getTasksController,
  createTaskController,
};
