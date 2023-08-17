const express = require("express");
const router = express.Router();

const auth = require("./auth.router");
const wallet = require("./wallet.router");
router.use(auth);
router.use(wallet);
module.exports = router;
