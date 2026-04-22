const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Username already exists"],
    sparse: true, // Allow null for social logins initially
  },

  name: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    // Password not required for social login users
    required: function() {
      return !this.googleId && !this.githubId;
    },
    minlength: [8, "Password must be at least 8 characters long"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  avatar: {
    type: String,
  },

  authProvider: {
    type: String,
    enum: ["local", "google", "github"],
    default: "local",
  },

  googleId: {
    type: String,
  },

  githubId: {
    type: String,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpiry: {
    type: Date,
  },

  refreshToken: {
    type: String,
    select: false, // Don't return refresh token by default
  },
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
