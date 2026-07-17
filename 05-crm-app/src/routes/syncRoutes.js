const { Router } = require("express");

const router = Router();

const { getDataController } = require("../controllers/syncController");

router.get("/", getDataController);

module.exports = router;
