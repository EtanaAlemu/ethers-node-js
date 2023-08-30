const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

require("express-async-errors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const errorLogger = require("./middlewares/errorLogger");
const errorNotFound = require("./middlewares/errorNotFound");
require("./configs/db");

const port = process.env.PORT || 5000;
const host = process.env.HOST;

const app = express();

/** Call middleware */
// compresses all the responses
app.use(compression());
// adding set of security middleware
app.use(helmet());
// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable all CORS request
app.use(cors());
app.use(express.json());
//Set all routes from routes folder
app.use("/api", router);
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
    console.log(`⚡️ [server]: Server is running at https://${host}:${port} in %s mode`, app.get("env"));
  });
