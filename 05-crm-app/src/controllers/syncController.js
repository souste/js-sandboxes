const { getData } = require("../services/randomUserAPi");

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

module.exports = { getDataController };
