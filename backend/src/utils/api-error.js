/**
 * Custom Error class for API specific errors
 * Provides status codes, error messages, and stack traces
 */
class ApiError extends Error {
  constructor(status, message, field = "general", isOperational = true, stack = "") {
    super(message);
    this.status = status;
    this.field = field;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
