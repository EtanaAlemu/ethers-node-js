const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new NotFoundError("User not found");
  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw Error("Incorrect password");
  const accessTokenPayload = {
    id: user._id,
  };
  const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
  const secretKey = process.env.JWT_SECRET;
  const accessToken = jwt.sign(accessTokenPayload, secretKey, {
    expiresIn: accessTokenExpiresIn,
  });
  return res.status(200).send({ username: user.username, role: user.role, address: user.address, access_token: accessToken });
};

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) throw Error("User exist with same username");
  const index = await User.countDocuments({});
  const address = await Wallet.address(index);
  const user = await User.create({ username, password, address, index });

  return res.status(201).send({ message: "User registered successfully", user });
};
