const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (options) => {
  const isEmailConfigured = 
    process.env.EMAIL_HOST && 
    process.env.EMAIL_PORT && 
    process.env.EMAIL_USER && 
    process.env.EMAIL_PASS;

  if (!isEmailConfigured) {
    console.warn("⚠️ EMAIL CONFIGURATION MISSING. Printing email content to console instead:");
    console.log("------------------------------------------");
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content: ${options.html.replace(/<[^>]*>?/gm, "").trim().substring(0, 100)}...`);
    // Extract OTP if possible for easier dev testing
    const otpMatch = options.html.match(/\s([0-9]{6})\s/);
    if (otpMatch) {
      console.log(`DEV OTP: ${otpMatch[1]}`);
    }
    console.log("------------------------------------------");
    return; // Skip actual sending
  }

  const mailOptions = {
    from: `"Career Lens AI" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error; // Rethrow so the controller can handle it (or return 500 effectively)
  }
};

const sendOTPEmail = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #4CAF50; text-align: center;">Welcome to Career Lens AI!</h2>
      <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your account:</p>
      <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; color: #333; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #777; text-align: center;">&copy; 2026 Career Lens AI. All rights reserved.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: "Verify your Career Lens AI account",
    html,
  });
};

const sendPasswordResetOTP = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #f44336; text-align: center;">Password Reset Request</h2>
      <p>We received a request to reset your password. Use the following OTP to proceed:</p>
      <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; color: #333; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This OTP is valid for 15 minutes. If you did not request a password reset, please secure your account.</p>
      <hr style="border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #777; text-align: center;">&copy; 2026 Career Lens AI. All rights reserved.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: "Password Reset OTP - Career Lens AI",
    html,
  });
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetOTP,
};
