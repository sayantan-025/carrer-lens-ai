const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const oauthRouter = require("./routes/oauth.routes");
const interviewReport = require("./routes/interview.routes");
const cors = require("cors");
const path = require("path");
const passport = require("./config/passport");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/error.middleware");

const projectRoot = path.resolve(__dirname, "../..");

// Trust Render's proxy for correct IP detection in rate limiting
app.set("trust proxy", 1);

// Security: Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per window
  message: { message: "Too many attempts from this IP. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin requests or allowed origins
      if (!origin || allowedOrigins.includes(origin) || origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Apply rate limiting to sensitive routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/verify-otp", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/interview", interviewReport);

// Serve Static Files
app.use(express.static(path.join(projectRoot, "frontend", "dist")));

// Centralized error handling for API routes
app.use("/api", errorHandler);

// SPA Fallback: Send index.html for all non-API routes
app.get("*path", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API route ${req.originalUrl} not found`,
    });
  }
  res.sendFile(path.join(projectRoot, "frontend", "dist", "index.html"), (err) => {
    if (err) {
      res.status(500).send("Error loading frontend. Make sure 'npm run build' was executed in the frontend directory.");
    }
  });
});

module.exports = app;
