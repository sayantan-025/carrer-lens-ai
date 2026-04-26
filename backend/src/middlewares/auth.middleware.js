const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const authMiddleware = async (req, res, next) => {
  // Check for accessToken first (new system), then fallback to token (legacy), then Authorization header
  const token = 
    req.cookies.accessToken || 
    req.cookies.token || 
    (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  // Check blacklist
  const isBlacklisted = await tokenBlacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }

  try {
    // Try verifying with Access Secret first, then fallback to JWT_SECRET
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (err) {
    // If it's the new system, we expect the frontend to call /refresh-token on 401
    return res.status(401).json({ message: "Invalid or expired session.", code: "TOKEN_EXPIRED" });
  }
};

module.exports = { authMiddleware };
