const express = require("express");
const router = express.Router();

const { getUserEthBalance, getUserTokenBalance, getEthBalance, getTokenBalance, getAddrEthBalance, getAddrTokenBalance, sendEthToAddr, sendTokenToAddr, sendEthToUserId, sendTokenToUserId, sendEthToUsername, sendTokenToUsername, estimateGasPrice, sendToken_UserIdToUserId, sendEth_UserIdToUserId, sendToken_UserToUser, sendEth_UserToUser, sendEth_UserToAddr, sendToken_UserToAddr } = require("../controllers/wallet.controller");
const { userAuth, adminAuth } = require("../middlewares/auth");

router.route("/getEthBalance").get(userAuth, getEthBalance);
router.route("/getTokenBalance").get(userAuth, getTokenBalance);
router.route("/getAddrEthBalance/:address").get(adminAuth, getAddrEthBalance);
router.route("/getAddrTokenBalance/:address").get(adminAuth, getAddrTokenBalance);
router.route("/getUserEthBalance/:id").get(adminAuth, getUserEthBalance);
router.route("/getUserTokenBalance/:id").get(adminAuth, getUserTokenBalance);
router.route("/sendEthToAddr").post(userAuth, sendEthToAddr);
router.route("/sendTokenToAddr").post(userAuth, sendTokenToAddr);
router.route("/sendEthToUserId").post(userAuth, sendEthToUserId);
router.route("/sendTokenToUserId").post(userAuth, sendTokenToUserId);
router.route("/sendEthToUsername").post(userAuth, sendEthToUsername);
router.route("/sendTokenToUsername").post(userAuth, sendTokenToUsername);
router.route("/sendEthUserToUser").post(adminAuth, sendEth_UserToUser);
router.route("/sendTokenUserToUser").post(adminAuth, sendToken_UserToUser);
router.route("/sendEthUserIdToUserId").post(adminAuth, sendEth_UserIdToUserId);
router.route("/sendTokenUserIdToUserId").post(adminAuth, sendToken_UserIdToUserId);
router.route("/sendEthUserToAddr").post(adminAuth, sendEth_UserToAddr);
router.route("/sendTokenUserToAddr").post(adminAuth, sendToken_UserToAddr);
router.route("/estimateGasPrice").get(estimateGasPrice);

module.exports = router;
