const tokenService = require("../services/token.service");

const COOKIE_OPTIONS = (req) => {
  const host = req.get("host") || "";
  // Check if it's localhost or an IP common for local dev
  const isLocalhost = 
    host.includes("localhost") || 
    host.includes("127.0.0.1") || 
    host.includes("[::1]") ||
    process.env.NODE_ENV !== "production"; // Fallback for dev environments
  
  return {
    httpOnly: true,
    secure: isLocalhost ? false : true,
    sameSite: isLocalhost ? "lax" : "none",
    path: "/",
  };
};

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 mins
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const sendAuthCookies = async (req, res, user) => {
  const accessToken = tokenService.generateAccessToken(user._id);
  const refreshToken = tokenService.generateRefreshToken(user._id);

  // Save hashed refresh token to user
  user.refreshToken = tokenService.hashToken(refreshToken);
  await user.save();

  const options = COOKIE_OPTIONS(req);

  res.cookie("accessToken", accessToken, {
    ...options,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  res.cookie("refreshToken", refreshToken, {
    ...options,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return { accessToken };
};

module.exports = {
  COOKIE_OPTIONS,
  sendAuthCookies,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
};
