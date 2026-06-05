const { Router } = require("express");
const router = Router();

const {
  getGamesController,
  createGamesController,
  updateGamesController,
  deleteGamesController,
  getGamesByDevelopersController,
  getDevelopersGamesAndHeroesController,
  getDevelopersWithNoGamesController,
  getTotalCharacterCensusController,
} = require("../controllers/gamesController");

router.get("/", getGamesController);
router.get("/developers", getGamesByDevelopersController);
router.get("/heroes", getDevelopersGamesAndHeroesController);
router.get("/nogames", getDevelopersWithNoGamesController);
router.get("/charactercensus", getTotalCharacterCensusController);
router.post("/", createGamesController);
router.patch("/:id", updateGamesController);
router.patch("/:id", updateGamesController);
router.delete("/:id", deleteGamesController);

module.exports = router;
