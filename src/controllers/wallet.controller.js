const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");
const Wallet = require("../utils/wallet");

exports.getEthBalance = async (req, res, next) => {
  const balance = await Wallet.ethBalance(req.user.address);
  return res.status(200).send({ address: req.user.address, balance: balance.toString() });
};

exports.getTokenBalance = async (req, res, next) => {
  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(req.user.address);
  return res.status(200).send({ address: req.user.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.getAddrEthBalance = async (req, res, next) => {
  const balance = await Wallet.ethBalance(req.params.address);
  return res.status(200).send({ address: req.params.address, balance: balance.toString() });
};

exports.getAddrTokenBalance = async (req, res, next) => {
  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(req.params.address);
  return res.status(200).send({ address: req.params.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.getUserEthBalance = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const balance = await Wallet.ethBalance(user.address);
  return res.status(200).send({ address: user.address, balance: balance.toString() });
};

exports.getUserTokenBalance = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(user.address);
  return res.status(200).send({ address: user.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.sendEthToAddr = async (req, res, next) => {
  const { toAddress, amount } = req.body;
  const { transactionHash } = await Wallet.sendEth(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendTokenToAddr = async (req, res, next) => {
  const { toAddress, amount } = req.body;
  const { transactionHash } = await Wallet.sendToken(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.sendEthToUserId = async (req, res, next) => {
  const { id, amount } = req.body;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const { transactionHash } = await Wallet.sendEth(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendTokenToUserId = async (req, res, next) => {
  const { id, amount } = req.body;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const { transactionHash } = await Wallet.sendToken(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.sendEthToUsername = async (req, res, next) => {
  const { username, amount } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const { transactionHash } = await Wallet.sendEth(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendTokenToUsername = async (req, res, next) => {
  const { username, amount } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const { transactionHash } = await Wallet.sendToken(req.user.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.sendEth_UserToUser = async (req, res, next) => {
  const { fromUsername, toUsername, amount } = req.body;
  const fromUser = await User.findOne({ username: fromUsername });
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findOne({ username: toUsername });
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const { transactionHash } = await Wallet.sendEth(fromUser.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendToken_UserToUser = async (req, res, next) => {
  const { fromUsername, toUsername, amount } = req.body;
  const fromUser = await User.findOne({ username: fromUsername });
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findOne({ username: toUsername });
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const { transactionHash } = await Wallet.sendToken(fromUser.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.sendEth_UserIdToUserId = async (req, res, next) => {
  const { fromUserId, toUserId, amount } = req.body;
  const fromUser = await User.findById(fromUserId);
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findById(toUserId);
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const { transactionHash } = await Wallet.sendEth(fromUser.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendToken_UserIdToUserId = async (req, res, next) => {
  const { fromUserId, toUserId, amount } = req.body;
  const fromUser = await User.findById(fromUserId);
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findById(toUserId);
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const { transactionHash } = await Wallet.sendToken(fromUser.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.sendEth_UserToAddr = async (req, res, next) => {
  const { fromUsername, toAddress, amount } = req.body;
  const fromUser = await User.findById(fromUsername);
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const { transactionHash } = await Wallet.sendEth(fromUser.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};
exports.sendToken_UserToAddr = async (req, res, next) => {
  const { fromUsername, toAddress, amount } = req.body;
  const fromUser = await User.findById(fromUsername);
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const { transactionHash } = await Wallet.sendToken(fromUser.index, toAddress, amount);
  return res.status(200).send({ transactionHash, message: "Transaction successful" });
};

exports.estimateGasPrice = async (req, res, next) => {
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await Wallet.estimateGasFee();
  return res.status(200).send({ gasPrice: `${gasPrice} Gwei`, maxFeePerGas: `${maxFeePerGas} Gwei`, maxPriorityFeePerGas: `${maxPriorityFeePerGas} Gwei` });
};
