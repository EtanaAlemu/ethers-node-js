const mongoose = require("mongoose");

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

mongoose.set("strictQuery", true);
mongoose.set("debug", false);
const host = process.env.DB_HOST;
const pass = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const port = process.env.DB_DOCKER_PORT;
const dbName = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${user}:${pass}@cluster0.ubzdwej.mongodb.net/${dbName}`;
//Connect the using mongoose to the database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);
mongoose.set("debug", false);

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("⛔️ [MongoDB]: ",err);
});
db.once("open", () => {
  console.info("Database connected ✨");
});
