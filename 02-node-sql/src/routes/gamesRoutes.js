const { Router } = require("express");
const router = Router();

const {
  getGamesController,
  createGamesController,
  updateGamesController,
  deleteGamesController,
  getGamesByDevelopersController,
  getDevelopersGamesAndHeroesController,
} = require("../controllers/gamesController");

router.get("/", getGamesController);
router.get("/developers", getGamesByDevelopersController);
router.get("/heroes", getDevelopersGamesAndHeroesController);
router.post("/", createGamesController);
router.patch("/:id", updateGamesController);
router.patch("/:id", updateGamesController);
router.delete("/:id", deleteGamesController);

module.exports = router;
