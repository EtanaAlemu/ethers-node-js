const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../../swagger-output.json");

const auth = require("./auth.router");
const wallet = require("./wallet.router");
const user = require("./user.router");
const transaction = require("./transaction.router");

router.use(auth);
router.use(wallet);
router.use(user);
router.use(transaction);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));
module.exports = router;
