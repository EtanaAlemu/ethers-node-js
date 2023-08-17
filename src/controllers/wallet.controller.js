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

    return res.status(200).send({ address: user.address, balance: balance.toString() });
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

    return res.status(200).send({ address: user.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
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
    const { toAddress, amount } = req.body;
    const { transactionHash } = await Wallet.sendEth(user.index, toAddress, amount);
    return res.status(200).send({ transactionHash, message: "Transaction successful" });
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
    const { toAddress, amount } = req.body;
    const { transactionHash } = await Wallet.sendToken(user.index, toAddress, amount);
    return res.status(200).send({ transactionHash, message: "Transaction successful" });
  } catch (err) {
    next(err);
  }
};

exports.estimateGasPrice = async (req, res, next) => {
  try {
    const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await Wallet.estimateGasFee();
    return res.status(200).send({ gasPrice: `${gasPrice} Gwei`, maxFeePerGas: `${maxFeePerGas} Gwei`, maxPriorityFeePerGas: `${maxPriorityFeePerGas} Gwei` });
  } catch (err) {
    next(err);
  }
};
