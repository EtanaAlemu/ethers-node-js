var { ethers,utils } = require("ethers");

const ABI = require("../abis/MartrezaToken.json");

var init = function () {
  var provider = new ethers.InfuraWebSocketProvider("sepolia", process.env.INFURA_API_KEY);
  var TOKEN_CONTRACT_ADDRESS = "0xF4623e04B96dFa4fc2267ac1217FC86966f56752";
  // This filter could also be generated with the Contract or
  // Interface API. If address is not specified, any address
  // matches and if topics is not specified, any log matches
//   filter = {
//     address: TOKEN_CONTRACT_ADDRESS,
//     topics: [utils.id("Transfer(address,address,uint256)")],
//   };
//   provider.on(filter, (log, event) => {
//     // Emitted whenever a token transfer occurs
//     provider.getTransaction(tx).then(function (transaction) {
//         console.log(transaction);
//       });
//   });

  const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ABI, provider);
  contract.on("Transfer", (from, to, value, event) => {
    let info = {
      from: from,
      to: to,
      value: ethers.formatUnits(value, 6),
      data: event,
    };
    console.log(JSON.stringify(info, null, 4));
  });


  provider.on("error", async () => {
    // Emitted when any error occurs
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
};

init();
