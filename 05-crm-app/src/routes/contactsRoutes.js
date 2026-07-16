const { Router } = require("express");
const router = Router();

const {
  getContactsController,
  getContactController,
  createContactController,
} = require("../controllers/contactsController");

router.get("/", getContactsController);
router.get("/:id", getContactController);

router.post("/", createContactController);

module.exports = router;
