const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const { sendAuthCookies } = require("../utils/auth-helpers");

// Helper to get client URL
const getClientUrl = (req) => {
  return process.env.CLIENT_URL || `${req.protocol}://${req.get("host")}`;
};

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, async (err, user, info) => {
      const clientUrl = getClientUrl(req);
      
      if (err) {
        console.error("Google Auth Error:", err);
        return res.redirect(`${clientUrl}/login?error=server_error`);
      }

      if (!user) {
        const errorCode = info?.message || "google_failed";
        const providerParam = errorCode === "email_exists" ? "&provider=google" : "";
        return res.redirect(`${clientUrl}/login?error=${errorCode}${providerParam}`);
      }

      try {
        // Use shared helper to generate tokens and set cookies
        await sendAuthCookies(req, res, user);
        
        // Redirect to frontend callback page
        res.redirect(`${clientUrl}/oauth/callback`);
      } catch (error) {
        console.error("Google OAuth token error:", error);
        res.redirect(`${clientUrl}/login?error=server_error`);
      }
    })(req, res, next);
  }
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
  "/github/callback",
  (req, res, next) => {
    passport.authenticate("github", { session: false }, async (err, user, info) => {
      const clientUrl = getClientUrl(req);

      if (err) {
        console.error("GitHub Auth Error:", err);
        return res.redirect(`${clientUrl}/login?error=server_error`);
      }

      if (!user) {
        const errorCode = info?.message || "github_failed";
        const providerParam = errorCode === "email_exists" ? "&provider=github" : "";
        return res.redirect(`${clientUrl}/login?error=${errorCode}${providerParam}`);
      }

      try {
        await sendAuthCookies(req, res, user);
        res.redirect(`${clientUrl}/oauth/callback`);
      } catch (error) {
        console.error("GitHub OAuth token error:", error);
        res.redirect(`${clientUrl}/login?error=server_error`);
      }
    })(req, res, next);
  }
);

module.exports = router;
