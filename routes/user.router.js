const express = require("express");
const router = express.Router();

const { ethBalance, tokenBalance } = require("../controllers/user.controller");

router.route("/ethBalance").get(ethBalance);
router.route("/tokenBalance").get(tokenBalance);

module.exports = router;
