const { Router } = require("express");

const router = Router();

const {
  getDataController,
  syncPreviewController,
  syncUsersToContacts,
} = require("../controllers/syncController");

router.get("/", getDataController);
router.get("/preview", syncPreviewController);

router.post("/", syncUsersToContacts);

module.exports = router;
