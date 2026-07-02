const { findUserByEmail, createUser } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, passwordHash);

    const { password: _password, ...safeUser } = user;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      secret,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
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

module.exports = {
  signup,
};
