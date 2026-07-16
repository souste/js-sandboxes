const { Router } = require("express");
const router = Router();

const {
  getContactsController,
  getContactController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require("../controllers/contactsController");

router.get("/", getContactsController);
router.get("/:id", getContactController);

router.post("/", createContactController);

router.patch("/:id", updateContactController);

router.delete("/:id", deleteContactController);

module.exports = router;
