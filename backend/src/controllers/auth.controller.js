const User = require("../models/user.model");
const { sendOTPEmail, sendPasswordResetOTP } = require("../services/email.service");
const { 
  generateAccessToken, 
  rotateRefreshToken,
  verifyRefreshToken 
} = require("../services/token.service");
const crypto = require("crypto");

/**
 * Helper to set refresh token cookie
 */
const setRefreshTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  res.cookie("refreshToken", token, cookieOptions);
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  user = new User({ name, email, password, authProvider: "local" });
  const otp = user.generateOTP();
  await user.save();

  try {
    await sendOTPEmail(email, otp);
    res.status(201).json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("Registration Email Error:", err);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(500).json({ 
      success: false, 
      message: "Email could not be sent"
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email }).select("+otp +otpExpiry");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  if (user.otp !== hashedOTP || user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  
  const accessToken = generateAccessToken(user._id);
  const refreshToken = await rotateRefreshToken(user);

  setRefreshTokenCookie(res, refreshToken);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Account verified successfully",
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, authProvider: user.authProvider, createdAt: user.createdAt },
  });
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ success: false, message: "Account already verified" });
  }

  const otp = user.generateOTP();
  await user.save();

  try {
    await sendOTPEmail(email, otp);
    res.status(200).json({ success: true, message: "New OTP sent to email" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Email could not be sent" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || user.authProvider !== "local") {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ success: false, message: "Account not verified", unverified: true });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = await rotateRefreshToken(user);

  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    success: true,
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, authProvider: user.authProvider, createdAt: user.createdAt },
  });
};

// @desc    Refresh Token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "No refresh token" });
  }

  const decoded = verifyRefreshToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  if (user.refreshToken !== hashedToken) {
    return res.status(401).json({ success: false, message: "Token reuse detected" });
  }

  const accessToken = generateAccessToken(user._id);
  const newRefreshToken = await rotateRefreshToken(user);

  setRefreshTokenCookie(res, newRefreshToken);

  res.status(200).json({ success: true, accessToken });
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
exports.logout = async (req, res) => {
  try {
    let userId = req.user?.id;

    if (!userId && req.cookies.refreshToken) {
      const decoded = verifyRefreshToken(req.cookies.refreshToken);
      if (decoded) userId = decoded.id;
    }

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.refreshToken = undefined;
        await user.save();
      }
    }
  } catch (err) {
    console.error("Logout DB cleanup error:", err);
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.authProvider !== "local") {
    return res.status(200).json({ success: true, message: "If account exists, OTP sent" });
  }

  const otp = user.generateOTP();
  await user.save();

  try {
    await sendPasswordResetOTP(email, otp);
    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Email could not be sent" });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email }).select("+otp +otpExpiry");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
  if (user.otp !== hashedOTP || user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  user.password = newPassword;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({ success: true, message: "Password reset successful" });
};

// @desc    Change Password
// @route   POST /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (user.authProvider !== "local") {
    return res.status(400).json({ success: false, message: "Password change not available for Google/GitHub accounts" });
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Current password is incorrect" });
  }

  user.password = newPassword;
  user.refreshToken = null; // Force re-login on other devices
  await user.save();

  res.status(200).json({ success: true, message: "Password changed successfully" });
};

// @desc    Delete Account
// @route   DELETE /api/auth/delete-account
// @access  Private
exports.deleteAccount = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  if (user.authProvider === "local") {
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required to delete account" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }
  }

  await User.findByIdAndDelete(req.user.id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({ success: true, message: "Account deleted successfully" });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ 
    success: true, 
    user: { 
      name: user.name, 
      email: user.email, 
      avatar: user.avatar, 
      authProvider: user.authProvider, 
      createdAt: user.createdAt 
    } 
  });
};
