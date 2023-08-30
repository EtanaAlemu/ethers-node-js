const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const Transaction = require("../models/transaction");

exports.getEthBalance = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'getEthBalance'
  #swagger.summary = 'Get logged-in user Ether balance'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'Ether balance successfully obtained.',
      schema: { $ref: '#/definitions/etherBalance' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */

  const balance = await Wallet.ethBalance(req.user.address);
  return res.status(200).send({ address: req.user.address, balance: balance.toString() });
};

exports.getTokenBalance = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'getTokenBalance'
  #swagger.summary = 'get logged-in user Token balance'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'Token balance successfully obtained.',
      schema: { $ref: '#/definitions/tokenBalance' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */

  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(req.user.address);
  return res.status(200).send({ address: req.user.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.getAddrEthBalance = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'getAddrEthBalance'
  #swagger.summary = 'get specific address Ether balance'
  #swagger.parameters['address'] = { description: 'ethereum address' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'Ether balance successfully obtained.',
      schema: { $ref: '#/definitions/etherBalance' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */

  const balance = await Wallet.ethBalance(req.params.address);
  return res.status(200).send({ address: req.params.address, balance: balance.toString() });
};

exports.getAddrTokenBalance = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'getAddrTokenBalance'
  #swagger.summary = 'get specific address Token balance'
  #swagger.parameters['address'] = { description: 'ethereum address' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'Token balance successfully obtained.',
      schema: { $ref: '#/definitions/tokenBalance' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */

  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(req.params.address);
  return res.status(200).send({ address: req.params.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.getUserEthBalance = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'getUserEthBalance'
  #swagger.summary = 'get specific user Ether balance'
  #swagger.parameters['id'] = { description: 'User id' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'User Ether balance successfully obtained.',
      schema: { $ref: '#/definitions/ethBalance' }
      } 
  #swagger.responses[404] = { 
    schema: { "$ref": "#/definitions/notFound" },
    description: "User not found." }
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */

  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const balance = await Wallet.ethBalance(user.address);
  return res.status(200).send({ address: user.address, balance: balance.toString() });
};

exports.getUserTokenBalance = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'getUserTokenBalance'
  #swagger.summary = 'get specific user token balance'
  #swagger.parameters['id'] = { description: 'User id' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'User token balance successfully obtained.',
      schema: { $ref: '#/definitions/tokenBalance' }
      } 
  #swagger.responses[404] = { 
    schema: { "$ref": "#/definitions/notFound" },
    description: "User not found." }
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const { balance, decimal, tokenName, tokenSymbol } = await Wallet.tokenBalance(user.address);
  return res.status(200).send({ address: user.address, balance: balance.toString(), decimal: decimal.toString(), tokenName, tokenSymbol });
};

exports.sendEthToAddr = async (req, res, next) => {
  const { toAddress, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendEthToAddr'
  #swagger.summary = 'send Ether from logged-in user to address'
  #swagger.parameters['address'] = { description: 'Ethereum address' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/ToAddr" }} 
  #swagger.responses[200] = {
      description: 'Send Ether successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const tx = await Wallet.sendEth(req.user.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, req.user._id, false, amount);
};
exports.sendTokenToAddr = async (req, res, next) => {
  const { toAddress, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendTokenToAddr'
  #swagger.summary = 'send Token from logged-in user to address'
  #swagger.parameters['address'] = { description: 'Ethereum address' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/ToAddr" }} 
  #swagger.responses[200] = {
      description: 'Send Token successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const tx = await Wallet.sendToken(req.user.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, req.user._id, true, amount);
};

exports.sendEthToUserId = async (req, res, next) => {
  const { id, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendEthToUserId'
  #swagger.summary = 'send Ether from logged-in user to user by id'
  #swagger.parameters['address'] = { description: 'Ethereum address' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/ToUserId" }} 
  #swagger.responses[200] = {
      description: 'Send Ether successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const tx = await Wallet.sendEth(req.user.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, req.user._id, false, amount);
};
exports.sendTokenToUserId = async (req, res, next) => {
  const { id, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendTokenToUserId'
  #swagger.summary = 'send Token from logged-in user to user by id'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/ToUserId" }} 
  #swagger.responses[200] = {
      description: 'Send Token successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const tx = await Wallet.sendToken(req.user.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, req.user._id, true, amount);
};

exports.sendEthToUsername = async (req, res, next) => {
  const { username, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendEthToUsername'
  #swagger.summary = 'send Ether from logged-in user to user by username'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/ToUsername" }} 
  #swagger.responses[200] = {
      description: 'Send Ether successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const user = await User.findOne({ username });
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const tx = await Wallet.sendEth(req.user.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, req.user._id, false, amount);
};
exports.sendTokenToUsername = async (req, res, next) => {
  const { username, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendTokenToUsername'
  #swagger.summary = 'send Token from logged-in user to user by username'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/ToUsername" }} 
  #swagger.responses[200] = {
      description: 'Send Token successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const user = await User.findOne({ username });
  if (!user) throw new NotFoundError("User not found");
  const toAddress = user.address;
  const tx = await Wallet.sendToken(req.user.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, req.user._id, true, amount);
};

exports.sendEth_UserToUser = async (req, res, next) => {
  const { fromUsername, toUsername, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendEthUserToUser'
  #swagger.summary = 'send Ether from username to username'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/UserToUser" }} 
  #swagger.responses[200] = {
      description: 'Send Ether successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const fromUser = await User.findOne({ username: fromUsername });
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findOne({ username: toUsername });
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const tx = await Wallet.sendEth(fromUser.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, fromUser._id, false, amount);
};
exports.sendToken_UserToUser = async (req, res, next) => {
  const { fromUsername, toUsername, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendTokenUserToUser'
  #swagger.summary = 'send Token from username to username'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/UserToUser" }} 
  #swagger.responses[200] = {
      description: 'Send Token successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const fromUser = await User.findOne({ username: fromUsername });
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findOne({ username: toUsername });
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const tx = await Wallet.sendToken(fromUser.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, fromUser._id, true, amount);
};

exports.sendEth_UserIdToUserId = async (req, res, next) => {
  const { fromUserId, toUserId, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendEthUserIdToUserId'
  #swagger.summary = 'send Ether from user to user by Id'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/UserIdToUserId" }} 
  #swagger.responses[200] = {
      description: 'Send Ether successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const fromUser = await User.findById(fromUserId);
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findById(toUserId);
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const tx = await Wallet.sendEth(fromUser.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, fromUser._id, false, amount);
};
exports.sendToken_UserIdToUserId = async (req, res, next) => {
  const { fromUserId, toUserId, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendTokenUserIdToUserId'
  #swagger.summary = 'send Token from user to user by Id'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/UserIdToUserId" }} 
  #swagger.responses[200] = {
      description: 'Send Token successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const fromUser = await User.findById(fromUserId);
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const toUser = await User.findById(toUserId);
  if (!toUser) throw new NotFoundError("Receiver user not found");
  const toAddress = toUser.address;
  const tx = await Wallet.sendToken(fromUser.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, fromUser._id, true, amount);
};

exports.sendEth_UserToAddr = async (req, res, next) => {
  const { fromUsername, toAddress, amount } = req.body;
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendEthUserToAddr'
  #swagger.summary = 'send Ether from username to user by Id'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/UserToAddr" }} 
  #swagger.responses[200] = {
      description: 'Send Ether successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const fromUser = await User.findOne({ username: fromUsername });
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const tx = await Wallet.sendEth(fromUser.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, fromUser._id, false, amount);
};
exports.sendToken_UserToAddr = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'sendTokenUserToAddr'
  #swagger.summary = 'send Token from username to user by Id'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/UserToAddr" }} 
  #swagger.responses[200] = {
      description: 'Send Token successfully.',
      schema: { $ref: '#/definitions/sendTransaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  const { fromUsername, toAddress, amount } = req.body;
  const fromUser = await User.findOne({ username: fromUsername });
  if (!fromUser) throw new NotFoundError("Sender user not found");
  const tx = await Wallet.sendToken(fromUser.index, toAddress, amount);
  res.status(200).send({ transactionHash: tx.hash, message: "Transaction sent successful" });
  recordTx(tx, fromUser._id, true, amount);
};

exports.estimateGasPrice = async (req, res, next) => {
  /*
  #swagger.tags = ['Wallet']
  #swagger.operationId = 'estimateGasPrice'
  #swagger.summary = 'get Ethereum gas price estimation'
  #swagger.responses[200] = {
      description: 'Get gas price successfully.',
      schema: { $ref: '#/definitions/gasPrice' }
      } 
   */
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await Wallet.estimateGasFee();
  return res.status(200).send({ gasPrice: `${gasPrice} Gwei`, maxFeePerGas: `${maxFeePerGas} Gwei`, maxPriorityFeePerGas: `${maxPriorityFeePerGas} Gwei` });
};

async function recordTx(tx, userId, isTokenTx, value) {
  try {
    const receipt = await tx.wait();
    const txnFee = tx.gasLimit * receipt.gasPrice;
    await Transaction.create({ userId, isTokenTx, value, toAddress: tx.to, blockNumber: receipt.blockNumber, txnFee: Number(txnFee), gasPrice: Number(receipt.gasPrice), txnHash: tx.hash, method: "Transfer" });
  } catch (err) {
    console.error(err);
  }
}
