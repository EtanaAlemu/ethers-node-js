const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const Transaction = require("../models/transaction");

exports.getAllTransaction = async (req, res, next) => {
  const { page, size, isToken } = req.query;
  var condition = isToken ? { isToken: { $regex: new RegExp(isToken), $options: "i" } } : {};
  const { limit, offset } = getPagination(page, size);
  const myCustomLabels = {
    totalDocs: "totalItems",
    docs: "transactions",
    limit: "pageSize",
    page: "currentPage",
  };

  const transactions = await Transaction.paginate(condition, { offset, limit, customLabels: myCustomLabels });

  return res.status(200).send(transactions);
};

exports.getTransaction = async (req, res, next) => {
  const { txnHash } = req.params;
  console.log(txnHash);
  const transaction = await Transaction.findOne({ txnHash });
  if (!transaction) throw new NotFoundError("Transaction not found");
  return res.status(200).send(transaction);
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
