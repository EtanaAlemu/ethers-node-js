const NotFoundError = require("../errors/NotFoundError");

const errorNotFound = (req, res, next) => next(new NotFoundError());

module.exports = errorNotFound;
