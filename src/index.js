const dotenv = require("dotenv").config();
const express = require("express");
const router = require("./routes");
require("./configs/db");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
