/**
 * Error handling utilities and middleware
 */

/**
 * Application error class for consistent error handling
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`, err);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
  } else if (err.name === "MongoError" && err.code === 11000) {
    statusCode = 409;
    message = "Duplicate entry";
  }

  res.status(statusCode).json({
    error: message,
    status: statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * 404 handler middleware
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
};

/**
 * Async error wrapper for route handlers
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  AppError,
  errorHandler,
  notFoundHandler,
  asyncHandler,
};
