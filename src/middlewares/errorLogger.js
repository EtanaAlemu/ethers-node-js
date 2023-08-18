const errorLogger = (err, req, res, next) => {
  // logs error to console and then passes to next middleware
  console.error(err.stack);
  next(err);
};

module.exports = errorLogger;
