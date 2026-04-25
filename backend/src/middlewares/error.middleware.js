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
    error = new ApiError(statusCode, message, false, err.stack);
  }

  // Log error using Winston
  logger.error(`${req.method} ${req.url} - ${error.status} - ${error.message}`);
  if (!error.isOperational) {
    logger.debug(error.stack);
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error.message = `Resource not found with id of ${err.value}`;
    error.status = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error.message = "Duplicate field value entered";
    error.status = 400;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors).map((val) => val.message).join(", ");
    error.status = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error.message = "Invalid token";
    error.status = 401;
  }
  
  if (err.name === "TokenExpiredError") {
    error.message = "Token expired";
    error.status = 401;
  }

  const response = {
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.status || 500).json(response);
};

module.exports = errorHandler;
