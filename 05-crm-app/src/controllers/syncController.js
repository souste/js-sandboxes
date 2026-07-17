const { getData } = require("../services/randomUserApi");
const { syncUsers } = require("../services/syncServices");

const getDataController = async (req, res) => {
  try {
    const result = await getData();

    res.status(200).json({
      success: true,
      data: result,
      message: "Api data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const syncPreviewController = async (req, res) => {
  const num = 10;
  try {
    const result = await syncUsers(num);

    res.status(200).json({
      success: true,
      data: result,
      message: "Api data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const syncContactsController = async (req, res) => {
  try {
    const result = await syncUsers(10);

    res.status(100).json({
      success: true,
      data: result,
      message: "Users synced successfully",
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
  getDataController,
  syncPreviewController,
  syncContactsController,
};
