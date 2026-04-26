const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const { sendAuthCookies } = require("../utils/auth-helpers");
const logger = require("../utils/logger");

// Helper to get client URL
const getClientUrl = (req) => {
  // Priority: 1. Environment variable, 2. Origin header, 3. Referer header, 4. Protocol + Host
  return process.env.CLIENT_URL || req.get("origin") || req.get("referer") || `${req.protocol}://${req.get("host")}`;
};

// Google OAuth
router.get(
  "/google",
  (req, res, next) => {
    logger.info("Initiating Google OAuth redirect...");
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, async (err, user, info) => {
      const clientUrl = getClientUrl(req);
      
      if (err) {
        logger.error("Google Auth Strategy Error:", err);
        return res.redirect(`${clientUrl}/login?error=server_error`);
      }

      if (!user) {
        const errorCode = info?.message || "google_failed";
        logger.warn(`Google Auth Failed: ${errorCode}`);
        const providerParam = errorCode === "email_exists" ? "&provider=google" : "";
        return res.redirect(`${clientUrl}/login?error=${errorCode}${providerParam}`);
      }

      try {
        logger.info(`Google Auth Successful for user: ${user.email}`);
        // Use shared helper to generate tokens and set cookies
        await sendAuthCookies(req, res, user);
        
        // Redirect to frontend callback page
        res.redirect(`${clientUrl}/oauth/callback`);
      } catch (error) {
        logger.error("Google OAuth token/cookie error:", error);
        res.redirect(`${clientUrl}/login?error=server_error`);
      }
    })(req, res, next);
  }
);

// GitHub OAuth
router.get(
  "/github",
  (req, res, next) => {
    logger.info("Initiating GitHub OAuth redirect...");
    next();
  },
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
  "/github/callback",
  (req, res, next) => {
    passport.authenticate("github", { session: false }, async (err, user, info) => {
      const clientUrl = getClientUrl(req);

      if (err) {
        logger.error("GitHub Auth Strategy Error:", err);
        return res.redirect(`${clientUrl}/login?error=server_error`);
      }

      if (!user) {
        const errorCode = info?.message || "github_failed";
        logger.warn(`GitHub Auth Failed: ${errorCode}`);
        const providerParam = errorCode === "email_exists" ? "&provider=github" : "";
        return res.redirect(`${clientUrl}/login?error=${errorCode}${providerParam}`);
      }

      try {
        logger.info(`GitHub Auth Successful for user: ${user.email}`);
        await sendAuthCookies(req, res, user);
        res.redirect(`${clientUrl}/oauth/callback`);
      } catch (error) {
        logger.error("GitHub OAuth token/cookie error:", error);
        res.redirect(`${clientUrl}/login?error=server_error`);
      }
    })(req, res, next);
  }
);

module.exports = router;
