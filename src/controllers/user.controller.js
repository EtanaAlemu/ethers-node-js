const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  await User.updateOne({ _id: id }, req.body);
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send(user);
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send({ message: `Document with ${user._id} has been deleted..` });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  return res.status(200).send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send(user);
};
