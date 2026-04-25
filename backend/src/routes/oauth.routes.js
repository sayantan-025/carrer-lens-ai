const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const { generateAccessToken, rotateRefreshToken } = require("../services/token.service");

const COOKIE_OPTIONS = (req) => {
  const host = req.get("host") || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("[::1]");
  
  return {
    httpOnly: true,
    secure: isLocalhost ? false : true,
    sameSite: isLocalhost ? "lax" : "none",
    path: "/",
  };
};

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 mins
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

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
    passport.authenticate("google", { session: false }, (err, user, info) => {
      const clientUrl = getClientUrl(req);
      
      if (err) {
        return res.redirect(`${clientUrl}/login?error=server_error`);
      }

      if (!user) {
        // Map passport error messages to URL params
        const errorCode = info?.message || "google_failed";
        const providerParam = errorCode === "email_exists" ? "&provider=google" : "";
        return res.redirect(`${clientUrl}/login?error=${errorCode}${providerParam}`);
      }

      req.logIn(user, { session: false }, async (loginErr) => {
        if (loginErr) return res.redirect(`${clientUrl}/login?error=server_error`);
        
        try {
          // Generate tokens
          const accessToken = generateAccessToken(user._id);
          const refreshToken = await rotateRefreshToken(user);

          const options = COOKIE_OPTIONS(req);

          // Set cookies
          res.cookie("accessToken", accessToken, {
            ...options,
            maxAge: ACCESS_TOKEN_MAX_AGE,
          });

          res.cookie("refreshToken", refreshToken, {
            ...options,
            maxAge: REFRESH_TOKEN_MAX_AGE,
            path: "/",
          });

          // Redirect to frontend callback page
          res.redirect(`${clientUrl}/oauth/callback`);
        } catch (error) {
          console.error("Google OAuth error:", error);
          res.redirect(`${clientUrl}/login?error=server_error`);
        }
      });
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
    passport.authenticate("github", { session: false }, (err, user, info) => {
      const clientUrl = getClientUrl(req);

      if (err) {
        return res.redirect(`${clientUrl}/login?error=server_error`);
      }

      if (!user) {
        const errorCode = info?.message || "github_failed";
        const providerParam = errorCode === "email_exists" ? "&provider=github" : "";
        return res.redirect(`${clientUrl}/login?error=${errorCode}${providerParam}`);
      }

      req.logIn(user, { session: false }, async (loginErr) => {
        if (loginErr) return res.redirect(`${clientUrl}/login?error=server_error`);

        try {
          const accessToken = generateAccessToken(user._id);
          const refreshToken = await rotateRefreshToken(user);

          const options = COOKIE_OPTIONS(req);

          res.cookie("accessToken", accessToken, {
            ...options,
            maxAge: ACCESS_TOKEN_MAX_AGE,
          });

          res.cookie("refreshToken", refreshToken, {
            ...options,
            maxAge: REFRESH_TOKEN_MAX_AGE,
            path: "/",
          });

          res.redirect(`${clientUrl}/oauth/callback`);
        } catch (error) {
          console.error("GitHub OAuth error:", error);
          res.redirect(`${clientUrl}/login?error=server_error`);
        }
      });
    })(req, res, next);
  }
);

module.exports = router;
