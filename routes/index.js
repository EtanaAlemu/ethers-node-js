const express = require("express");
const router = express.Router();

const auth = require("./auth.router");
const user = require("./user.router");
router.use("/api/v1/", auth);
router.use("/api/v1/", user);
module.exports = router;
