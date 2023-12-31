const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
exports.adminAuth = async (req, res, next) => {
  const token = getTokenFromHeaders(req);
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new NotFoundError("User not found");
  if (user.role != "admin") throw Error("Not authorized");
  next();
};
exports.userAuth = async (req, res, next) => {
  const token = getTokenFromHeaders(req);
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new NotFoundError("User not found");
  req.user = user;
  next();
};
const getTokenFromHeaders = (req) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ");
    if (token[0] === "Bearer" && token[1] != "null" && token[1] != "") {
      return token[1];
    }
  }
  throw Error("token not available");
};
