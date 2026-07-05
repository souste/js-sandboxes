const { Router } = require("express");
const router = Router();

const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

const { signupTest, loginTest } = require("../controllers/authControllerTest");

router.post("/signuptest", signupTest);
router.post("/logintest", loginTest);

module.exports = router;
