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
  const { page, size, role } = req.query;
  var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};
  const { limit, offset } = getPagination(page, size);
  const myCustomLabels = {
    totalDocs: "totalItems",
    docs: "users",
    limit: "pageSize",
    page: "currentPage",
    // nextPage: "next",
    // prevPage: "prev",
    // totalPages: "totalPages",
    // pagingCounter: 'slNo',
    // meta: 'paginator'
  };

  const users = await User.paginate(condition, { offset, limit, customLabels: myCustomLabels });

  return res.status(200).send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send(user);
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
