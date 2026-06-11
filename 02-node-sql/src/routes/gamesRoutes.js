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
  getMissingScoresController,
  getPlatformWithMostGamesController,
  getPlatformCatalogueController,
  getHighestScoreByPlatformController,
  getFullGameDetailsController,
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
router.get("/scoreless", getMissingScoresController);
router.get("/platformcount", getPlatformWithMostGamesController);
router.get("/platformcatalogue", getPlatformCatalogueController);
router.get("/highestscores", getHighestScoreByPlatformController);
router.get("/alldetails", getFullGameDetailsController);

router.post("/", createGamesController);
router.post("/platform", getGamesByPlatformController);

router.patch("/:id", updateGamesController);
router.patch("/:id", updateGamesController);
router.delete("/:id", deleteGamesController);

module.exports = router;
