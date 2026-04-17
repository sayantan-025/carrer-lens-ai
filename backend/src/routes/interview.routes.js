const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const interviewController = require("../controllers/interview.controller");
const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  authMiddleware.authMiddleware,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

interviewRouter.get(
  "/report/:interviewId",
  authMiddleware.authMiddleware,
  interviewController.getInterviewReportByIdController,
);

interviewRouter.get(
  "/",
  authMiddleware.authMiddleware,
  interviewController.getAllInterviewReportsController,
);

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authMiddleware, interviewController.generateResumePdfController)

module.exports = interviewRouter;
