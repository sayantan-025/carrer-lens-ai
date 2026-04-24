const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Terminal ID unavailable."],
    sparse: true,
  },

  name: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, "Network ID already registered."],
    required: [true, "Network ID required."],
    match: [/^\S+@\S+\.\S+$/, "Invalid transmission format."],
  },

  password: {
    type: String,
    required: function() {
      return !this.googleId && !this.githubId;
    },
    minlength: [8, "Security code length insufficient."],
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
    select: false,
  },
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
