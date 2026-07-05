const jwt = require("jsonwebtoken");

const authMiddlewareTest = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({
        success: false,
        message: "No token provided or invalid format",
      });

    const token = header.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    try {
      const decoded = jwt.verify(token, secret);

      req.user = {
        id: decoded.user.id,
        username: decoded.user.username,
        email: decoded.user.email,
      };
      return next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { authMiddlewareTest };
