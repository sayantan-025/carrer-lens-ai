const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user.model");
const crypto = require("crypto");
const logger = require("../utils/logger");
const axios = require("axios");
const env = require("./env");

const generateUniqueUsername = async (baseName) => {
  let userName = baseName.replace(/\s+/g, '').toLowerCase();
  let exists = await User.findOne({ userName });
  
  if (!exists) return userName;

  // If exists, append random suffix
  while (exists) {
    const suffix = crypto.randomBytes(2).toString('hex');
    userName = `${baseName.replace(/\s+/g, '').toLowerCase()}${suffix}`;
    exists = await User.findOne({ userName });
  }
  
  return userName;
};

// Google Strategy
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  // Use explicit callback URL if provided, otherwise construct it
  let googleCallback = env.GOOGLE_CALLBACK_URL;
  
  if (!googleCallback) {
    if (env.NODE_ENV === "production" && env.CLIENT_URL) {
      // In production, force absolute URL using CLIENT_URL
      const baseUrl = env.CLIENT_URL.endsWith("/") ? env.CLIENT_URL.slice(0, -1) : env.CLIENT_URL;
      googleCallback = `${baseUrl}/api/oauth/google/callback`;
    } else {
      googleCallback = "/api/oauth/google/callback";
    }
  }

  logger.info(`Configuring Google OAuth with callback: ${googleCallback}`);
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: googleCallback,
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { id, emails, displayName, photos } = profile;
          
          if (!emails || emails.length === 0) {
            return done(null, false, { message: "google_failed" });
          }
          
          const email = emails[0].value;
          const avatar = photos?.[0]?.value || null;

          // 1. Try to find by googleId or email
          let user = await User.findOne({
            $or: [{ googleId: id }, { email }],
          });

          if (user) {
            if (user.isSuspended) {
              return done(null, false, { message: "account_suspended" });
            }

            // Check if user was registered with local but email matches
            if (user.authProvider === "local" && user.email === email) {
                return done(null, false, { message: "email_exists" });
            }

            // Update existing user
            user.googleId = id;
            user.authProvider = "google";
            user.isVerified = true;
            if (avatar) user.avatar = avatar;
            if (!user.userName) {
                user.userName = await generateUniqueUsername(displayName || email.split("@")[0]);
            }
            await user.save();
            return done(null, user);
          }

          // 2. Create new user with unique username
          const uniqueUserName = await generateUniqueUsername(displayName || email.split("@")[0]);

          user = await User.create({
            userName: uniqueUserName,
            name: displayName || uniqueUserName,
            email,
            googleId: id,
            authProvider: "google",
            avatar,
            isVerified: true,
          });

          done(null, user);
        } catch (err) {
          logger.error("Google Strategy Error:", err);
          done(err, null);
        }
      }
    ),
  );
} else {
  logger.warn("Google OAuth credentials missing. Google login will be disabled.");
}

// GitHub Strategy
if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  let githubCallback = env.GITHUB_CALLBACK_URL;

  if (!githubCallback) {
    if (env.NODE_ENV === "production" && env.CLIENT_URL) {
      const baseUrl = env.CLIENT_URL.endsWith("/") ? env.CLIENT_URL.slice(0, -1) : env.CLIENT_URL;
      githubCallback = `${baseUrl}/api/oauth/github/callback`;
    } else {
      githubCallback = "/api/oauth/github/callback";
    }
  }

  logger.info(`Configuring GitHub OAuth with callback: ${githubCallback}`);

  passport.use(
    new GitHubStrategy(
      {
        clientID: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        callbackURL: githubCallback,
        proxy: true,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { id, emails, displayName, username, photos } = profile;
          
          let email = emails?.[0]?.value || emails?.[0];
          
          // If email is missing, fetch from GitHub API directly
          if (!email) {
            try {
              const res = await axios.get("https://api.github.com/user/emails", {
                headers: { Authorization: `token ${accessToken}` },
              });
              // Get the primary, verified email
              const primaryEmail = res.data.find(e => e.primary && e.verified) || res.data[0];
              email = primaryEmail?.email;
            } catch (err) {
              logger.error("Failed to fetch GitHub emails manually:", err);
            }
          }

          if (!email) {
            return done(null, false, { message: "github_no_email" });
          }

          const avatar = photos?.[0]?.value || profile._json?.avatar_url || null;

          let user = await User.findOne({
            $or: [{ githubId: id }, { email }],
          });

          if (user) {
            if (user.isSuspended) {
              return done(null, false, { message: "account_suspended" });
            }

            if (user.authProvider === "local" && user.email === email) {
                return done(null, false, { message: "email_exists" });
            }

            user.githubId = id;
            user.authProvider = "github";
            user.isVerified = true;
            if (avatar) user.avatar = avatar;
            if (!user.userName) {
                user.userName = await generateUniqueUsername(displayName || username || email.split("@")[0]);
            }
            await user.save();
            return done(null, user);
          }

          const uniqueUserName = await generateUniqueUsername(displayName || username || email.split("@")[0]);

          user = await User.create({
            userName: uniqueUserName,
            name: displayName || username || uniqueUserName,
            email,
            githubId: id,
            authProvider: "github",
            avatar,
            isVerified: true,
          });

          done(null, user);
        } catch (err) {
          logger.error("GitHub Strategy Error:", err);
          done(err, null);
        }
      },
    ),
  );
} else {
  logger.warn("GitHub OAuth credentials missing. GitHub login will be disabled.");
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
