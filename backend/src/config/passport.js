const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user.model");
const crypto = require("crypto");

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

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { id, emails, displayName, photos } = profile;
          
          if (!emails || emails.length === 0) {
            return done(new Error("No email associated with this Google account."), null);
          }
          
          const email = emails[0].value;
          const avatar = photos?.[0]?.value || null;

          // 1. Try to find by googleId or email
          let user = await User.findOne({
            $or: [{ googleId: id }, { email }],
          });

          if (user) {
            // Update existing user
            user.googleId = id;
            user.authProvider = "google";
            user.isVerified = true;
            user.avatar = avatar;
            // Only set userName if they don't have one (unlikely but safe)
            if (!user.userName) {
                user.userName = await generateUniqueUsername(displayName);
            }
            await user.save();
            return done(null, user);
          }

          // 2. Create new user with unique username
          const uniqueUserName = await generateUniqueUsername(displayName);

          user = await User.create({
            userName: uniqueUserName,
            name: displayName,
            email,
            googleId: id,
            authProvider: "google",
            avatar,
            isVerified: true,
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    ),
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { id, emails, displayName, username, photos } = profile;
          
          let email = emails?.[0]?.value || emails?.[0];
          if (!email && username) {
            email = `${username}@github.com`; 
          }

          if (!email) {
            return done(new Error("Could not retrieve email from GitHub account."), null);
          }

          const avatar = photos?.[0]?.value || profile._json?.avatar_url || null;

          let user = await User.findOne({
            $or: [{ githubId: id }, { email }],
          });

          if (user) {
            user.githubId = id;
            user.authProvider = "github";
            user.isVerified = true;
            user.avatar = avatar;
            if (!user.userName) {
                user.userName = await generateUniqueUsername(displayName || username);
            }
            await user.save();
            return done(null, user);
          }

          const uniqueUserName = await generateUniqueUsername(displayName || username);

          user = await User.create({
            userName: uniqueUserName,
            name: displayName || username,
            email,
            githubId: id,
            authProvider: "github",
            avatar,
            isVerified: true,
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );
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
