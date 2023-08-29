const options = {
  openapi: "3.1.0", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: true, // Enable/Disable automatic headers capture. By default is true
  autoQuery: true, // Enable/Disable automatic query capture. By default is true
  autoBody: true, // Enable/Disable automatic body capture. By default is true
};
const swaggerAutogen = require("swagger-autogen")(options);
const dotenv = require("dotenv").config();

const doc = {
  info: {
    title: "Ethers HD Wallet and Token Transfer Example",
    version: "1.0.0",
    description: "This REST API demonstrates how to use the Ethers library to interact with Ethereum using Infura. The API showcases various functionalities, including creating an HD wallet, fetching Ethereum and token balances, sending Ethereum and tokens, estimating gas prices, and more",
  },
  servers: [
    {
      url: `http://localhost:${process.env.NODE_LOCAL_PORT}/`,
      description: "local server",
    },
    {
      url: `http://localhost:${process.env.NODE_DOCKER_PORT}/`,
      description: "docker server",
    },
  ],
  basePath: "/",
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Authentication",
      description: "Endpoints related to user authentication",
    },
    {
      name: "User",
      description: "Endpoints related to user management",
    },
    {
      name: "Wallet",
      description: "Endpoints related to wallet management and send transaction",
    },
    {
      name: "Transaction",
      description: "Endpoints related to transaction history",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  definitions: {
    auth: {
      username: "user1",
      password: "password",
    },
    loginRes: {
      username: "user1",
      role: "user",
      address: "0x663f53bE3B2aBfD8F5Fdc26D6f86bD429a6df588",
      id: "64ecbb91f981e92a17e68cb2",
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGZmM2RlODVkMzA5ZjUxYjUzZjlmNSIsImlhdCI6MTY5MzIzNTgyNSwiZXhwIjoxNjkzMzIyMjI1fQ.loh5w-7oOsdTmutxP4T3UJ0ruXpZr3orVd1msbwM_2k",
    },

    registerRes: {
      message: "User registered successfully",
      user: { $ref: "#/definitions/user" },
    },

    user: {
      username: "user1",
      role: "user",
      address: "0x663f53bE3B2aBfD8F5Fdc26D6f86bD429a6df588",
      id: "64ecbb91f981e92a17e68cb2",
    },
    users: {
      users: [{ $ref: "#/definitions/user" }],
      totalItems: 1,
      offset: 0,
      pageSize: 10,
      totalPages: 1,
      currentPage: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },

    tokenBalance: {
      address: "0xcdaa7e50203D9B48D3A181a02619c812Ce975CA4",
      balance: "6.0",
      decimal: "18",
      tokenName: "MartrezaToken",
      tokenSymbol: "MTT",
    },
    etherBalance: {
      address: "0xcdaa7e50203D9B48D3A181a02619c812Ce975CA4",
      balance: "0.00001",
    },
    sendTransaction: {
      transactionHash: "0x2fbcd6ffdb8912191c73ee40344626ac788488972d14f9b088e699bcca609a24",
      message: "Transaction sent successful",
    },
    gasPrice: {
      gasPrice: "10.723000916 Gwei",
      maxFeePerGas: "22.44598146 Gwei",
      maxPriorityFeePerGas: "1.0 Gwei",
    },
    transaction: {
      userId: "64dff3de85d309f51b53f9f5",
      isTokenTx: true,
      value: 1,
      toAddress: "0xF4623e04B96dFa4fc2267ac1217FC86966f56752",
      blockNumber: 4118919,
      txnHash: "0x451aa55fbeffbeacb2c38ea1a0b2524419c0fb6d3e1e86d3ee7b41a533de3b25",
      txnFee: 97294588618500,
      gasPrice: 1425561738,
      method: "Transfer",
      id: "64e1391d9b18a56af76e0f11",
    },
    ToUserId: {
      id: "64e03680359a4d464352aab9",
      amount: "0.000001",
    },
    UserIdToUserId: {
      fromUserId: "64e03680359a4d464352aab9",
      toUserId: "64e03680359a4d464352aab9",
      amount: "0.00001",
    },
    UserToUser: {
      fromUsername: "admin",
      toUsername: "user",
      amount: "0.00001",
    },
    ToAddr: {
      toAddress: "0xcdaa7e50203D9B48D3A181a02619c812Ce975CA4",
      amount: "1",
    },
    UserToAddr: {
      fromUsername: "user",
      toAddress: "0xE5D0A309b17a6494BcccA29573869805dd71a895",
      amount: "10",
    },
    ToUsername: {
      username: "user",
      amount: "10",
    },
    notFound: {
      error: 404,
      message: "Not found.",
      stack: "",
    },
    error: {
      error: 500,
      message: "Something went wrong",
      stack: "",
    },
  },
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
