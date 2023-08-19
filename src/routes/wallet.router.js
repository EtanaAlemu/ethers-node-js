const express = require("express");
const router = express.Router();

const { ethBalance, tokenBalance, sendEth, sendToken, estimateGasPrice } = require("../controllers/wallet.controller");
const { userAuth } = require("../middlewares/auth");

router.route("/getEthBalance").get(userAuth, ethBalance);
router.route("/getTokenBalance").get(userAuth, tokenBalance);
router.route("/sendEth").post(userAuth, sendEth);
router.route("/sendToken").post(userAuth, sendToken);
router.route("/estimateGasPrice").get(estimateGasPrice);

module.exports = router;
