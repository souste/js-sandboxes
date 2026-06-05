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
};
