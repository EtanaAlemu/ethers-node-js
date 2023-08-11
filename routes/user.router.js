const express = require("express");
const router = express.Router();

const { ethBalance, tokenBalance, sendEth, sendToken, estimateGasEth, estimateGasToken } = require("../controllers/user.controller");

router.route("/ethBalance").get(ethBalance);
router.route("/tokenBalance").get(tokenBalance);
router.route("/estimateGasEth").post(estimateGasEth);
router.route("/estimateGasToken").post(estimateGasToken);
router.route("/sendEth").post(sendEth);
router.route("/sendToken").post(sendToken);

module.exports = router;
