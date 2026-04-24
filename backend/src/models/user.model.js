const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Username is already taken."],
    sparse: true,
  },

  name: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, "Email is already registered."],
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },

  password: {
    type: String,
    required: function() {
      return !this.googleId && !this.githubId;
    },
    minlength: [8, "Password must be at least 8 characters."],
    select: false,
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

// Pre-save hook for password hashing
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  
  try {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS) || 10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
