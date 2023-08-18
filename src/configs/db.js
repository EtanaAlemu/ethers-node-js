const mongoose = require("mongoose");

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

mongoose.set("strictQuery", true);
mongoose.set("debug", false);
const host = process.env.DB_HOST;
const port = process.env.DB_DOCKER_PORT;
const dbName = process.env.DB_NAME;
const DB_URL = `mongodb://${host}:${port}/${dbName}`;
//Connect the using mongoose to the database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);
mongoose.set("debug", false);

const db = mongoose.connection;
db.on("error", () => {
  console.error("connection error: ");
});
db.once("open", () => {
  console.info("DB Connected successfully");
});
