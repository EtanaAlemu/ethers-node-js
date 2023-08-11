const mongoose = require("mongoose");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const jwt = require("jsonwebtoken");
exports.ethBalance = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(404).send({ message: "token not found" });
    const TokenArray = token.split(" ");
    const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const balance = await Wallet.ethBalance(user.address);

    return res.status(200).send({ balance: balance.toString() });
  } catch (err) {
    next(err);
  }
};

exports.tokenBalance = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(404).send({ message: "token not found" });
    const TokenArray = token.split(" ");
    const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(user.address);
    // const { balance } = await Wallet.tokenBalance(user.address);

    return res.status(200).send({ balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
    // return res.status(200).send({ balance: balance.toString() });
  } catch (err) {
    next(err);
  }
};

exports.sendEth = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(404).send({ message: "token not found" });
    const TokenArray = token.split(" ");
    const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const { address, amount } = req.body;
    const { txHash } = await Wallet.sendEth(user.index, address, amount);
    return res.status(200).send({ txHash });
  } catch (err) {
    next(err);
  }
};
exports.sendToken = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(404).send({ message: "token not found" });
    const TokenArray = token.split(" ");
    const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const { address, amount } = req.body;
    const { txHash } = await Wallet.sendToken(user.index, address, amount);
    return res.status(200).send({ txHash });
  } catch (err) {
    next(err);
  }
};
exports.estimateGasEth = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(404).send({ message: "token not found" });
    const TokenArray = token.split(" ");
    const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const { address, amount } = req.body;
    const { limit } = await Wallet.estimateGasEth(user.index, address, amount);
    return res.status(200).send({ limit: limit.toString() });
  } catch (err) {
    next(err);
  }
};
exports.estimateGasToken = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(404).send({ message: "token not found" });
    const TokenArray = token.split(" ");
    const decodedToken = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const { address, amount } = req.body;
    const { limit } = await Wallet.estimateGasToken(user.index, address, amount);
    return res.status(200).send({ limit: limit.toString() });
  } catch (err) {
    next(err);
  }
};
