var {ethers} = require("ethers");

var init = function () {
  var provider = new ethers.InfuraWebSocketProvider("sepolia", process.env.INFURA_API_KEY);
  
  provider.once("pending", (tx) => {
    // Emitted when the transaction has been mined
    provider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
  });

  provider.on("error", async () => {
    // Emitted when any error occurs
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
};

init();