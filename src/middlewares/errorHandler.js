const errorHandler = (err, req, res, next) => {
  // if no status or message in error use default 500 code and message
  const statusCode = err.status ?? 500;
  const message = err.message || "Something went wrong.";

  // returns error status code and message
  return res.status(statusCode).json({
    error: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;
