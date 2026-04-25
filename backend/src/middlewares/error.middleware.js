const logger = require("../utils/logger");
const ApiError = require("../utils/api-error");

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If not already an instance of ApiError, wrap it
  if (!(error instanceof ApiError)) {
    const statusCode = error.status || error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, "general", false, err.stack);
  }

  // Log error using Winston
  logger.error(`${req.method} ${req.url} - ${error.status} - ${error.message}`);
  
  // Hide stack trace in production
  const response = {
    success: false,
    field: error.field || "general",
    message: error.message || "Something went wrong. Please try again.",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.status || 500).json(response);
};

module.exports = errorHandler;
