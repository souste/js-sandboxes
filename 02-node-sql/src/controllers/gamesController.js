const {
  getGamesModel,
  createGamesModel,
  updateGamesModel,
  deleteGamesModel,
  getGamesByDevelopersModel,
  getDevelopersGamesAndHeroesModel,
  getDevelopersWithNoGamesModel,
  getTotalCharacterCensusModel,
  getTotalGameScoreModel,
  getGamesByPlatformModel,
  getGamesWithoutScoresModel,
  getTopFiveGamesModel,
  getLowestFiveGamesModel,
  getPlatformRosterModel,
  getHighScoreFilterModel,
  getScoreDensityModel,
  getMissingScoresModel,
  getPlatformWithMostGamesModel,
  getPlatformCatalogueModel,
  getHighestScoreByPlatformModel,
} = require("../models/gamesModel");

const getGamesController = async (req, res) => {
  try {
    const games = await getGamesModel();

    res.status(200).json({
      success: true,
      data: games,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createGamesController = async (req, res) => {
  try {
    const { title, developer_id } = req.body;

    if (!title || !developer_id) {
      return res.status(400).json({
        success: false,
        message: "Games require a title and developer id",
      });
    }
    const created = await createGamesModel(title, developer_id);

    res.status(201).json({
      success: true,
      data: created,
      message: "Game created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateGamesController = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, developer_id } = req.body;

    if (!title || !developer_id) {
      return res.status(400).json({
        success: false,
        message: "Games require a title and developer id",
      });
    }
    const updated = await updateGamesModel(title, developer_id, id);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: "Game successfully updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteGamesController = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteGamesModel(id);
    console.log("deleted", deleted);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Game deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getGamesByDevelopersController = async (req, res) => {
  try {
    const result = await getGamesByDevelopersModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Games and Developers retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getDevelopersGamesAndHeroesController = async (req, res) => {
  try {
    const result = await getDevelopersGamesAndHeroesModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Heroes, Games and Developers retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getDevelopersWithNoGamesController = async (req, res) => {
  try {
    const result = await getDevelopersWithNoGamesModel();

    if (!result) {
      throw new Error("Invalid response from the database");
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "There are no developers without games",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Developers with no games retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getTotalCharacterCensusController = async (req, res) => {
  try {
    const result = await getTotalCharacterCensusModel();

    if (!result) {
      throw new Error("Invalid response from the database");
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Character census retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getTotalGameScoreController = async (red, res) => {
  try {
    const result = await getTotalGameScoreModel();

    if (!result) {
      throw new Error("Invalid response from the database");
    }
    res.status(200).json({
      success: true,
      data: result,
      message: "Games and total scores retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getGamesByPlatformController = async (req, res) => {
  try {
    const { platform } = req.body;
    const result = await getGamesByPlatformModel(platform);

    res.status(200).json({
      success: true,
      data: result,
      message: `${platform} games retrieved successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getGamesWithoutScoresController = async (req, res) => {
  try {
    const result = await getGamesWithoutScoresModel();
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No game found without scores",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Games without scores retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getTopFiveGamesController = async (req, res) => {
  try {
    const result = await getTopFiveGamesModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Top 5 scoring games retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getLowestFiveGamesController = async (req, res) => {
  try {
    const result = await getLowestFiveGamesModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Lowest 5 games retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getPlatformRosterController = async (req, res) => {
  try {
    const result = await getPlatformRosterModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Game roster retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getHighScoreFilterController = async (req, res) => {
  try {
    const result = await getHighScoreFilterModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "High scoring games retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getScoreDensityController = async (req, res) => {
  try {
    const result = await getScoreDensityModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Score density counter successfully retrieved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMissingScoresController = async (req, res) => {
  try {
    const result = await getMissingScoresModel();

    if (result.rows === 0) {
      return res.status(404).json({
        success: false,
        message: "No game found with missing scores",
      });
    }
    res.status(200).json({
      success: true,
      data: result,
      message: "Games without scores retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getPlatformWithMostGamesController = async (req, res) => {
  try {
    const result = await getPlatformWithMostGamesModel();

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "No platform data found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Platform count retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getPlatformCatalogueController = async (req, res) => {
  try {
    const result = await getPlatformCatalogueModel();

    if (result.rows === 0) {
      return res.status(404).json({
        success: false,
        message: "Couldn't retrieve platform catalogue",
      });
    }

    res.status(200).json({
      success: true,
      date: result,
      message: "Platform catalogue retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getHighestScoreByPlatformController = async (req, res) => {
  try {
    const result = await getHighestScoreByPlatformModel();

    res.status(200).json({
      success: true,
      data: result,
      message: "Highest scores by platform retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getGamesController,
  createGamesController,
  updateGamesController,
  deleteGamesController,
  getGamesByDevelopersController,
  getDevelopersGamesAndHeroesController,
  getDevelopersWithNoGamesController,
  getTotalCharacterCensusController,
  getTotalGameScoreController,
  getGamesByPlatformController,
  getGamesWithoutScoresController,
  getTopFiveGamesController,
  getLowestFiveGamesController,
  getPlatformRosterController,
  getHighScoreFilterController,
  getScoreDensityController,
  getMissingScoresController,
  getPlatformWithMostGamesController,
  getPlatformCatalogueController,
  getHighestScoreByPlatformController,
};
