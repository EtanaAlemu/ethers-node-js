const express = require("express");
const router = express.Router();

const { userAuth, adminAuth } = require("../middlewares/auth");
const { getTransactions, getAllTransaction, getTransactionByTx } = require("../controllers/transaction.controller");

router.route("/getTransaction/:txnHash").get(userAuth, getTransactionByTx);
router.route("/getTransactions").get(userAuth, getTransactions);
router.route("/getAllTransaction").get(adminAuth, getAllTransaction);

module.exports = router;
