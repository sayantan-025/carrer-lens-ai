const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const emailService = require("../services/email.service");
const tokenService = require("../services/token.service");
const logger = require("../utils/logger");
const ApiError = require("../utils/api-error");

const { COOKIE_OPTIONS, sendAuthCookies } = require("../utils/auth-helpers");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// register controller
const registerUserController = async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName) return next(new ApiError(400, "Username is required", "userName"));
  if (!email) return next(new ApiError(400, "Email is required", "email"));
  
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) return next(new ApiError(400, "Enter a valid email address", "email"));
  
  if (!password) return next(new ApiError(400, "Password is required", "password"));
  if (password.length < 8) return next(new ApiError(400, "Password must be at least 8 characters", "password"));

  try {
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      if (emailExists.isVerified) {
        return next(new ApiError(409, "Email already registered", "email"));
      }
      
      emailExists.password = password; 
      emailExists.userName = userName;
      const otp = generateOTP();
      emailExists.otp = otp;
      emailExists.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await emailExists.save();
      await emailService.sendOTPEmail(email, otp);
      return res.status(200).json({ success: true, message: "Account pending verification. New OTP sent.", email });
    }

    const userNameExists = await userModel.findOne({ userName });
    if (userNameExists) {
      return next(new ApiError(409, "Username already taken", "userName"));
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await userModel.create({
      userName,
      email,
      password,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await emailService.sendOTPEmail(email, otp);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email with the OTP sent.",
      email,
    });
  } catch (error) {
    next(error);
  }
};

// verify otp controller
const verifyOTPController = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!otp) return next(new ApiError(400, "OTP is required", "otp"));

  try {
    const user = await userModel.findOne({ email });
    if (!user) return next(new ApiError(404, "User not found", "general"));

    if (user.isVerified) return next(new ApiError(400, "User already verified", "general"));
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return next(new ApiError(400, "Invalid or expired OTP", "otp"));
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    
    const { accessToken } = await sendAuthCookies(req, res, user);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { id: user._id, name: user.userName, email: user.email },
      accessToken
    });
  } catch (error) {
    next(error);
  }
};

// login controller
const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return next(new ApiError(400, "Email is required", "email"));
  
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) return next(new ApiError(400, "Enter a valid email address", "email"));

  if (!password) return next(new ApiError(400, "Password is required", "password"));

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return next(new ApiError(404, "No account found with this email", "email"));

    if (user.authProvider !== "local") {
      const providerName = user.authProvider.charAt(0).toUpperCase() + user.authProvider.slice(1);
      return next(new ApiError(409, `This email is linked to a ${providerName} account. Use that to sign in.`, "email"));
    }

    if (user.isSuspended) return next(new ApiError(403, "Your account has been suspended. Contact support.", "general"));

    if (!user.isVerified) {
      return res.status(403).json({ 
        success: false, 
        field: "general", 
        message: "Please verify your email before logging in", 
        email: user.email 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError(401, "Incorrect password", "password"));

    const { accessToken } = await sendAuthCookies(req, res, user);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { id: user._id, name: user.userName, email: user.email },
      accessToken
    });
  } catch (error) {
    next(error);
  }
};

// refresh token controller
const refreshTokenController = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  
  if (!token) {
    logger.warn(`Refresh attempt failed: No refreshToken cookie found. Cookies received: ${JSON.stringify(req.cookies)}`);
    return next(new ApiError(401, "Refresh token missing", "general"));
  }

  try {
    const decoded = tokenService.verifyRefreshToken(token);
    if (!decoded) {
      logger.warn("Refresh attempt failed: Token verification failed (possibly expired or invalid secret)");
      return next(new ApiError(401, "Invalid refresh token", "general"));
    }

    const user = await userModel.findById(decoded.id).select("+refreshToken");
    if (!user) {
      logger.warn(`Refresh attempt failed: User ${decoded.id} not found in database`);
      return next(new ApiError(401, "User not found", "general"));
    }

    const hashedToken = tokenService.hashToken(token);
    if (user.refreshToken !== hashedToken) {
      logger.warn(`Refresh attempt failed: Token mismatch for user ${user._id}. Expected ${user.refreshToken}, got ${hashedToken}`);
      return next(new ApiError(401, "Invalid or rotated refresh token", "general"));
    }

    const { accessToken } = await sendAuthCookies(req, res, user);

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    logger.error("Refresh token controller error:", error);
    next(error);
  }
};

// logout controller
const logoutUserController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    }
    
    const options = COOKIE_OPTIONS(req);
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const getMeController = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return next(new ApiError(404, "User not found", "general"));
    
    res.status(200).json({
      success: true,
      user: { 
        id: user._id, 
        name: user.userName, 
        email: user.email,
        avatar: user.avatar,
        authProvider: user.authProvider
      },
    });
  } catch (error) {
    next(error);
  }
};

const resendOTPController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ApiError(400, "Email is required", "general"));

  try {
    const user = await userModel.findOne({ email });
    if (!user || user.isVerified) return next(new ApiError(400, "Invalid request", "general"));
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await emailService.sendOTPEmail(email, otp);
    res.status(200).json({ success: true, message: "OTP resent" });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ApiError(400, "Email is required", "email"));

  try {
    const user = await userModel.findOne({ email });
    if (!user) return next(new ApiError(404, "No account found with this email", "email"));
    
    const otp = generateOTP();
    user.resetPasswordToken = otp;
    user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    await emailService.sendPasswordResetOTP(email, otp);
    res.status(200).json({ success: true, message: "Reset OTP sent" });
  } catch (error) {
    next(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  
  if (!otp) return next(new ApiError(400, "OTP is required", "otp"));
  if (!newPassword) return next(new ApiError(400, "New password is required", "newPassword"));
  if (newPassword.length < 8) return next(new ApiError(400, "Password must be at least 8 characters", "newPassword"));

  try {
    const user = await userModel.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpiry: { $gt: new Date() },
    });
    if (!user) return next(new ApiError(400, "Invalid or expired OTP", "otp"));
    
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

const changePasswordController = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) return next(new ApiError(400, "Current password is required", "oldPassword"));
  if (!newPassword) return next(new ApiError(400, "New password is required", "newPassword"));
  if (newPassword.length < 8) return next(new ApiError(400, "New password must be at least 8 characters", "newPassword"));

  try {
    const user = await userModel.findById(req.user.id).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return next(new ApiError(401, "Incorrect current password", "oldPassword"));
    
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  verifyOTPController,
  resendOTPController,
  loginUserController,
  refreshTokenController,
  logoutUserController,
  getMeController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
};
