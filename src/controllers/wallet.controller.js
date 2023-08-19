const User = require("../models/user");
const Wallet = require("../utils/wallet");
const jwt = require("jsonwebtoken");
exports.ethBalance = async (req, res, next) => {
  const balance = await Wallet.ethBalance(req.user.address);

  return res.status(200).send({ address: req.user.address, balance: balance.toString() });
};

exports.tokenBalance = async (req, res, next) => {
  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(req.user.address);

  return res.status(200).send({ address: req.user.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.sendEth = async (req, res, next) => {
  const { toAddress, amount } = req.body;
  const { transactionHash } = await Wallet.sendEth(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendToken = async (req, res, next) => {
  const { toAddress, amount } = req.body;
  const { transactionHash } = await Wallet.sendToken(re.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.estimateGasPrice = async (req, res, next) => {
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await Wallet.estimateGasFee();
  return res.status(200).send({ gasPrice: `${gasPrice} Gwei`, maxFeePerGas: `${maxFeePerGas} Gwei`, maxPriorityFeePerGas: `${maxPriorityFeePerGas} Gwei` });
};
