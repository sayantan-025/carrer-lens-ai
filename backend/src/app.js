const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const interviewReport = require("./routes/interview.routes");
const cors = require("cors");
const path = require("path");

const projectRoot = path.resolve(__dirname, "../..");

app.use(
  cors({
    origin: "https://carrer-lens-ai.onrender.com",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewReport);

app.use(express.static(path.join(projectRoot, "frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.join(projectRoot, "frontend", "dist", "index.html"));
});

module.exports = app;
