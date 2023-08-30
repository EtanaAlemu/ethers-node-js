const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

require("express-async-errors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const errorLogger = require("./middlewares/errorLogger");
const errorNotFound = require("./middlewares/errorNotFound");
require("./configs/db");

const port = process.env.PORT || 5000;

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "production") {
  console.log("Running in production environment");
} else if (nodeEnv === "development") {
  console.log("Running in development environment");
} else {
  console.log("Running in an unknown environment");
}
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(router);
app.use(errorNotFound, errorLogger, errorHandler);
// app.listen(port, () => {
//   console.log(`Server running on ${port} port`);
// });

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server running on ${port} port`);
  });
