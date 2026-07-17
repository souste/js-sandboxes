const { Router } = require("express");

const router = Router();

const {
  getDataController,
  syncPreviewController,
} = require("../controllers/syncController");

router.get("/", getDataController);
router.get("/contacts", syncPreviewController);

module.exports = router;
