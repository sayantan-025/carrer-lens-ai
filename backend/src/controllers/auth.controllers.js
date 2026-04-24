const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const emailService = require("../services/email.service");
const tokenService = require("../services/token.service");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax", // Changed from strict to allow OAuth redirects
  path: "/",
};

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 mins
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendAuthCookies = async (res, user) => {
  const accessToken = tokenService.generateAccessToken(user._id);
  const refreshToken = tokenService.generateRefreshToken(user._id);

  // Save hashed refresh token to user
  user.refreshToken = tokenService.hashToken(refreshToken);
  await user.save();

  res.cookie("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  res.cookie("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: "/api/auth/refresh-token", // Only send to refresh endpoint
  });

  return { accessToken };
};

// register controller
const registerUserController = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Username, email and password are required" });
  }

  try {
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      if (emailExists.isVerified) {
        return res.status(400).json({ message: "Email already registered" });
      }
      // If user exists but not verified, we'll reuse the account and send new OTP
      emailExists.password = password; // Pre-save hook will hash this
      emailExists.userName = userName;
      const otp = generateOTP();
      emailExists.otp = otp;
      emailExists.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await emailExists.save();
      await emailService.sendOTPEmail(email, otp);
      return res.status(200).json({ message: "Account pending verification. New OTP sent.", email });
    }

    const userNameExists = await userModel.findOne({ userName });
    if (userNameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await userModel.create({
      userName,
      email,
      password, // Pre-save hook will hash this
      otp,
      otpExpiry,
      isVerified: false,
    });

    await emailService.sendOTPEmail(email, otp);

    res.status(201).json({
      message: "Registration successful. Please verify your email with the OTP sent.",
      email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// verify otp controller
const verifyOTPController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    
    const { accessToken } = await sendAuthCookies(res, user);

    res.status(200).json({
      message: "Email verified successfully",
      user: { id: user._id, name: user.userName, email: user.email },
      accessToken
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed", error: error.message });
  }
};

// login controller
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid email or password." });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first", email: user.email });
    }

    if (user.authProvider !== "local" || !user.password) {
      return res.status(400).json({ 
        message: `This account uses ${user.authProvider} authentication. Please log in with ${user.authProvider}.` 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password." });

    const { accessToken } = await sendAuthCookies(res, user);

    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, name: user.userName, email: user.email },
      accessToken
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// refresh token controller
const refreshTokenController = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = tokenService.verifyRefreshToken(token);
    if (!decoded) return res.status(401).json({ message: "Invalid refresh token" });

    const user = await userModel.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== tokenService.hashToken(token)) {
      return res.status(401).json({ message: "Invalid or rotated refresh token" });
    }

    const { accessToken } = await sendAuthCookies(res, user);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Token refresh failed" });
  }
};

// logout controller
const logoutUserController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    }
    
    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", { ...COOKIE_OPTIONS, path: "/api/auth/refresh-token" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

const getMeController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({
      user: { 
        id: user._id, 
        name: user.userName, 
        email: user.email,
        avatar: user.avatar,
        authProvider: user.authProvider
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

const resendOTPController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || user.isVerified) return res.status(400).json({ message: "Invalid request" });
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await emailService.sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP resent" });
  } catch (error) {
    res.status(500).json({ message: "Error resending OTP" });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const otp = generateOTP();
    user.resetPasswordToken = otp;
    user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    await emailService.sendPasswordResetOTP(email, otp);
    res.status(200).json({ message: "Reset OTP sent" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

const resetPasswordController = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await userModel.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpiry: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

const changePasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await userModel.findById(req.user.id).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
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
