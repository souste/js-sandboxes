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
  getTotalGameScoreController,
  getGamesByPlatformController,
  getGamesWithoutScoresController,
  getTopFiveGamesController,
  getLowestFiveGamesController,
  getPlatformRosterController,
  getHighScoreFilterController,
  getScoreDensityController,
} = require("../controllers/gamesController");

router.get("/", getGamesController);
router.get("/developers", getGamesByDevelopersController);
router.get("/heroes", getDevelopersGamesAndHeroesController);
router.get("/nogames", getDevelopersWithNoGamesController);
router.get("/charactercensus", getTotalCharacterCensusController);
router.get("/totalscores", getTotalGameScoreController);
router.get("/noscores", getGamesWithoutScoresController);
router.get("/top5", getTopFiveGamesController);
router.get("/lowest5", getLowestFiveGamesController);
router.get("/roster", getPlatformRosterController);
router.get("/scorefilter", getHighScoreFilterController);
router.get("/scoredensity", getScoreDensityController);

router.post("/", createGamesController);
router.post("/platform", getGamesByPlatformController);

router.patch("/:id", updateGamesController);
router.patch("/:id", updateGamesController);
router.delete("/:id", deleteGamesController);

module.exports = router;
