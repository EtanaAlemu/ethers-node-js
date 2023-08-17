const express = require("express");
const router = express.Router();

const { ethBalance, tokenBalance, sendEth, sendToken, estimateGasPrice } = require("../controllers/wallet.controller");

router.route("/getEthBalance").get(ethBalance);
router.route("/getTokenBalance").get(tokenBalance);
router.route("/sendEth").post(sendEth);
router.route("/sendToken").post(sendToken);
router.route("/estimateGasPrice").get(estimateGasPrice);

module.exports = router;
