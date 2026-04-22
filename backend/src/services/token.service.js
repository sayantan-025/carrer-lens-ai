const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (userId) => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  return jwt.sign(
    { id: userId },
    secret,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m" }
  );
};

const generateRefreshToken = (userId) => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  return jwt.sign(
    { id: userId },
    secret,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d" }
  );
};

const verifyAccessToken = (token) => {
  try {
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const rotateRefreshToken = async (user) => {
  const newToken = generateRefreshToken(user._id);
  user.refreshToken = hashToken(newToken);
  await user.save();
  return newToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  rotateRefreshToken,
};
