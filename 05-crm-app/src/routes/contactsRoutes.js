const { Router } = require("express");
const router = Router();

const { getContactsController } = require("../controllers/contactsController");

router.get("/", getContactsController);

module.exports = router;
