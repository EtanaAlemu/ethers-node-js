class NotFoundError extends Error {
  constructor(errMessage) {
    super();
    this.status = 404;
    this.message = errMessage ? errMessage : "Not found.";
  }
}

module.exports = NotFoundError;
