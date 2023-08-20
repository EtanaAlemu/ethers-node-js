const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    index: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.index;
        delete ret.__v;
      },
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(mongoosePaginate);

UserSchema.pre("save", async function (next) {
  // check method of registration
  const user = this;
  if (!user.isModified("password")) next();
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password
  const hashedPassword = await bcrypt.hash(this.password, salt);
  // replace plain text password with hashed password
  this.password = hashedPassword;
  next();
});
UserSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  if (!update.password) next();
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password
  const hashedPassword = await bcrypt.hash(update.password, salt);
  // replace plain text password with hashed password
  update.password = hashedPassword;

  next();
});
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
