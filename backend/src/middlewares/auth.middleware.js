const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isTokenIsBlaclisted = await tokenBlacklistModel.findOne({
    token,
  });

  if (isTokenIsBlaclisted) {
    return res.status(401).json({
      message: "Token is Invalid",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = { authMiddleware };
