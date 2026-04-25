const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

authRouter.post("/register", authController.registerUserController);
authRouter.post("/verify-otp", authController.verifyOTPController);
authRouter.post("/resend-otp", authController.resendOTPController);
authRouter.post("/login", authController.loginUserController);
authRouter.post("/forgot-password", authController.forgotPasswordController);
authRouter.post("/reset-password", authController.resetPasswordController);
authRouter.post(
  "/change-password",
  authMiddleware.authMiddleware,
  authController.changePasswordController,
);
authRouter.post("/refresh-token", authController.refreshTokenController);
authRouter.post("/logout", authController.logoutUserController);
authRouter.get(
  "/get-me",
  authMiddleware.authMiddleware,
  authController.getMeController,
);

module.exports = authRouter;
