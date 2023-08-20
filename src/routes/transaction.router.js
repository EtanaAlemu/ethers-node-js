const express = require("express");
const router = express.Router();

const { userAuth, adminAuth } = require("../middlewares/auth");
const { getTransaction, getAllTransaction } = require("../controllers/transaction.controller");

router.route("/getTransaction/:txnHash").get(userAuth, getTransaction);
router.route("/getAllTransaction").get(userAuth, getAllTransaction);

module.exports = router;
