const {
  findUserByEmailTest,
  createUserTest,
} = require("../models/usersModelTest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupTest = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const existingUser = await findUserByEmailTest(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserTest(username, email, hashedPassword);

    const { password: _password, ...safeUser } = user;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    const token = jwt.sign({ user: safeUser }, secret, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      data: { user: safeUser, token },
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginTest = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmailTest(email);

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const { password: _password, ...safeUser } = existingUser;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    const token = jwt.sign({ user: safeUser }, secret, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      data: { user: safeUser, token },
      message: "Login Successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  signupTest,
  loginTest,
};
