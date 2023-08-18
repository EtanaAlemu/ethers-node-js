const dotenv = require("dotenv").config();
const express = require("express");
require("express-async-errors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const errorLogger = require("./middlewares/errorLogger");
const errorNotFound = require("./middlewares/errorNotFound");
require("./configs/db");

const port = process.env.NODE_DOCKER_PORT || 3000;

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "production") {
  console.log("Running in production environment");
} else if (nodeEnv === "development") {
  console.log("Running in development environment");
} else {
  console.log("Running in an unknown environment");
}
const app = express();
app.use(express.json());
app.use(router);

app.use(errorNotFound, errorLogger, errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
