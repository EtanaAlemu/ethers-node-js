const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const Transaction = require("../models/transaction");

exports.getAllTransaction = async (req, res, next) => {
  const { page, size, userId } = req.query;
  /*
  #swagger.tags = ['Transaction']
  #swagger.operationId = 'getAllTransaction'
  #swagger.summary = 'Get all transactions'
  #swagger.security = [{
            "bearerAuth": []
        }]  
  #swagger.parameters['page'] = {
          in: 'query',
          description: 'page number to be enquiry',
          type: 'integer'
      }
  #swagger.parameters['size'] = {
          in: 'query',
          description: 'quantity of transactions object per page',
          type: 'integer'
      }
  #swagger.parameters['userId'] = {
          in: 'query',
          description: 'filter transactions with user Id',
          type: 'integer'
      }
  #swagger.responses[200] = {
      description: 'Transactions successfully obtained.',
      schema: { $ref: '#/definitions/transaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  let query = {};
  if (userId) {
    query.userId = { $regex: new RegExp(userId), $options: "i" };
  }
  // var condition = userId ? { userId: { $regex: new RegExp(userId), $options: "i" } } : {};
  const { limit, offset } = getPagination(page, size);
  const myCustomLabels = {
    totalDocs: "totalItems",
    docs: "transactions",
    limit: "pageSize",
    page: "currentPage",
  };

  const transactions = await Transaction.paginate(query, { offset, limit, customLabels: myCustomLabels });

  return res.status(200).send(transactions);
};

exports.getTransactions = async (req, res, next) => {
  const { page, size } = req.query;
  /*
  #swagger.tags = ['Transaction']
  #swagger.operationId = 'getTransactions'
  #swagger.summary = 'Get all transactions of logged-in user'
  #swagger.security = [{
            "bearerAuth": []
        }]  
  #swagger.parameters['page'] = {
          in: 'query',
          description: 'page number to be enquiry',
          type: 'integer'
      }
  #swagger.parameters['size'] = {
          in: 'query',
          description: 'quantity of transactions object per page',
          type: 'integer'
      }
  #swagger.responses[200] = {
      description: 'Transactions successfully obtained.',
      schema: { $ref: '#/definitions/transaction' }
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  var condition = { userId: { $regex: new RegExp(req.user._id), $options: "i" } };
  
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

exports.getTransactionByTx = async (req, res, next) => {
  const { txnHash } = req.params;
  /*
  #swagger.tags = ['Transaction']
  #swagger.operationId = 'getTransactionByTx'
  #swagger.summary = 'Get specific transactions by transaction hash'
  #swagger.security = [{
            "bearerAuth": []
        }]  
  #swagger.parameters['txnHash'] = {
          in: 'path',
          description: 'transaction hash',
          type: 'integer'
      }
  #swagger.responses[200] = {
      description: 'Transaction successfully obtained.',
      schema: { $ref: '#/definitions/transaction' }
      } 
  #swagger.responses[404] = { 
    schema: { "$ref": "#/definitions/notFound" },
    description: "Transaction not found." }
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
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
