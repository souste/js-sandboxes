const { Router } = require("express");

const router = Router();

const {
  getDataController,
  syncPreviewController,
  syncContactsController,
} = require("../controllers/syncController");

router.get("/", getDataController);
router.get("/preview", syncPreviewController);

router.post("/", syncContactsController);

module.exports = router;
