const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  /*
  #swagger.tags = ['User']
  #swagger.operationId = 'getUsers'
  #swagger.summary = 'get specific user'
  #swagger.parameters['id'] = { description: 'User id' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'User successfully obtained.',
      schema: { $ref: '#/definitions/user' }
      } 
  #swagger.responses[404] = { 
    schema: { "$ref": "#/definitions/notFound" },
    description: "User not found." }
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */

  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send(user);
};

exports.getAllUsers = async (req, res, next) => {
  
  const { page, size, role } = req.query;
  /*
  #swagger.tags = ['User']
  #swagger.operationId = 'getAllUsers'
  #swagger.summary = 'get all users'
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.parameters['page'] = {
          in: 'query',
          description: 'page number to be enquiry',
          type: 'integer'
      }
  #swagger.parameters['size'] = {
          in: 'query',
          description: 'quantity of users object per page',
          type: 'integer'
      }
  #swagger.parameters['role'] = {
          in: 'query',
          description: 'filter users with there role',
          type: 'integer'
      }
  #swagger.responses[200] = {
      description: 'Users successfully obtained.',
      schema: { $ref: '#/definitions/users'} 
      } 
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};
  const { limit, offset } = getPagination(page, size);
  const myCustomLabels = {
    totalDocs: "totalItems",
    docs: "users",
    limit: "pageSize",
    page: "currentPage"
  };

  const users = await User.paginate(condition, { offset, limit, customLabels: myCustomLabels });

  return res.status(200).send(users);
};

exports.updateUser = async (req, res, next) => {
  /*
  #swagger.tags = ['User']
  #swagger.operationId = 'updateUser'
  #swagger.summary = 'update user by id'
  #swagger.parameters['id'] = { description: 'User id' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.requestBody = { 
    required: true,
    schema: { "$ref": "#/definitions/auth" }} 
  #swagger.responses[200] = {
      description: 'Users successfully updated.',
      schema: { $ref: '#/definitions/user'} 
      } 
  #swagger.responses[404] = { 
    schema: { "$ref": "#/definitions/notFound" },
    description: "User not found." }
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  
  const { id } = req.params;
  await User.updateOne({ _id: id }, req.body);
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send(user);
};

exports.deleteUser = async (req, res, next) => {
  /*
  #swagger.tags = ['User']
  #swagger.operationId = 'deleteUser'
  #swagger.summary = 'delete user by id'
  #swagger.parameters['id'] = { description: 'User id' }
  #swagger.security = [{
            "bearerAuth": []
        }] 
  #swagger.responses[200] = {
      description: 'Users successfully deleted.',
      schema: { "message": "Document with 64ecbb91f981e92a17e68cb2 has been deleted.."} 
      } 
  #swagger.responses[404] = { 
    schema: { "$ref": "#/definitions/notFound" },
    description: "User not found." }
  #swagger.responses[500] = { 
    schema: { "$ref": "#/definitions/error" },
    description: "JWT Token error" }
   */
  
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new NotFoundError("User not found");
  return res.status(200).send({ message: `Document with ${user._id} has been deleted..` });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
