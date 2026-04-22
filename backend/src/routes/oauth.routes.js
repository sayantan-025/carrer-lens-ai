const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const { generateAccessToken, rotateRefreshToken } = require("../services/token.service");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax", // Standard for OAuth callbacks
  path: "/",
};

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 mins
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { 
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`, 
    session: false 
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=no_user`);
      }

      // Generate tokens
      const accessToken = generateAccessToken(req.user._id);
      const refreshToken = await rotateRefreshToken(req.user);

      // Set cookies
      res.cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      res.cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: REFRESH_TOKEN_MAX_AGE,
        path: "/api/auth/refresh-token",
      });

      // Redirect to frontend callback page
      res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/oauth/callback?token=${accessToken}`);
    } catch (error) {
      console.error("Google OAuth error:", error);
      res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=server_error`);
    }
  }
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { 
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`, 
    session: false 
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=no_user`);
      }

      const accessToken = generateAccessToken(req.user._id);
      const refreshToken = await rotateRefreshToken(req.user);

      res.cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      res.cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: REFRESH_TOKEN_MAX_AGE,
        path: "/api/auth/refresh-token",
      });

      res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/oauth/callback?token=${accessToken}`);
    } catch (error) {
      console.error("GitHub OAuth error:", error);
      res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=server_error`);
    }
  }
);

module.exports = router;
