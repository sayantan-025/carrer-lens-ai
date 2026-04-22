const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const oauthRouter = require("./routes/oauth.routes");
const interviewReport = require("./routes/interview.routes");
const cors = require("cors");
const path = require("path");
const passport = require("./config/passport");

const projectRoot = path.resolve(__dirname, "../..");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/interview", interviewReport);

app.use(express.static(path.join(projectRoot, "frontend/dist")));

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
});

app.use((req, res) => {
  res.sendFile(path.join(projectRoot, "frontend", "dist", "index.html"));
});

module.exports = app;
