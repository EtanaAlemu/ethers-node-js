const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/user");
const Wallet = require("../utils/wallet");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Authenticate user'
    #swagger.description = 'Endpoint to authenticate a user.'
  
    #swagger.requestBody = { 
      required: true,
      schema: { "$ref": "#/definitions/auth" }} 

    #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/loginRes" },
      description: "User log in successfully." } 
    #swagger.responses[404] = { 
      schema: { "$ref": "#/definitions/notFound" },
      description: "User not found." } */

  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (!userExist) throw new NotFoundError("User not found");
  const isMatch = await userExist.matchPassword(password);
  if (!isMatch) throw Error("Incorrect password");
  const accessTokenPayload = {
    id: userExist._id,
  };
  const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
  const secretKey = process.env.JWT_SECRET;
  const access_token = jwt.sign(accessTokenPayload, secretKey, {
    expiresIn: accessTokenExpiresIn,
  });

  const user = userExist.toJSON();
  user["access_token"] = access_token;
  return res.status(200).json(user);
};

exports.register = async (req, res, next) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Register user'
    #swagger.description = 'Endpoint to add a user.'
  
    #swagger.requestBody = { 
      required: true,
      schema: { "$ref": "#/definitions/auth" }} 

    #swagger.responses[201] = { 
      schema: { "$ref": "#/definitions/registerRes" },
      description: "User log in successfully." } 
    #swagger.responses[500] = { 
      schema: { "$ref": "#/definitions/error" },
      description: "User exist with same username." } */
  
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) throw Error("User exist with same username");
  const index = await User.countDocuments({});
  const address = await Wallet.address(index);
  const user = await User.create({ username, password, address, index });

  return res.status(201).send({ message: "User registered successfully", user });
};
