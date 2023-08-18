const express = require("express");
const router = express.Router();

const auth = require("./auth.router");
const wallet = require("./wallet.router");
const user = require("./user.router");
router.use(auth);
router.use(wallet);
router.use(user);
module.exports = router;
