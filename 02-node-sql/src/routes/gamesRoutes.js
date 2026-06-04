const { Router } = require("express");
const router = Router();

const {
  getGamesController,
  createGamesController,
  updateGamesController,
  deleteGamesController,
} = require("../controllers/gamesController");

router.get("/", getGamesController);
router.post("/", createGamesController);
router.patch("/:id", updateGamesController);
router.patch("/:id", updateGamesController);
router.delete("/:id", deleteGamesController);

module.exports = router;
