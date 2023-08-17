const mongoose = require("mongoose");

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

mongoose.set("strictQuery", true);
mongoose.set("debug", false);
//Connect the using mongoose to the database
mongoose.connect(process.env.DB_URL, {
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
