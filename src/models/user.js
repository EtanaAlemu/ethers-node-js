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

UserSchema.pre("save", async function () {
  // check method of registration
  const user = this;
  if (!user.isModified("password")) return;
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password
  const hashedPassword = await bcrypt.hash(this.password, salt);
  // replace plain text password with hashed password
  this.password = hashedPassword;
});
UserSchema.pre("updateOne", async function () {
  const update = this.getUpdate();
  const password =
    update?.password ?? update?.$set?.password;
  if (!password) return;
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password
  const hashedPassword = await bcrypt.hash(password, salt);
  // replace plain text password with hashed password
  if (update.password) {
    update.password = hashedPassword;
  } else if (update.$set) {
    update.$set.password = hashedPassword;
  }
});
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
