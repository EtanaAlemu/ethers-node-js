class NotFoundError extends Error {
  constructor() {
    super();
    this.status = 404;
    this.message = "Not found.";
  }
}

module.exports = NotFoundError;
