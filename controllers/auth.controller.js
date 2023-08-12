const mongoose = require("mongoose");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ message: "User not found" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).send({
        message: "Incorrect password",
      });
    const accessTokenPayload = {
      id: user._id,
    };
    const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
    const secretKey = process.env.JWT_SECRET;
    const accessToken = jwt.sign(accessTokenPayload, secretKey, {
      expiresIn: accessTokenExpiresIn,
    });
    return res.status(200).send({ username: user.username, address: user.address, access_token: accessToken });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) return res.status(400).send({ message: "User exist with same username" });
    const index = await User.countDocuments({});
    console.log(index);
    const address = await Wallet.address(index);
    const newUser = await User.create({ username, password, address, index });

    return res.status(201).send({ message: "user registered" });
  } catch (err) {
    next(err);
  }
};
