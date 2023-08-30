var {ethers} = require("ethers");

var init = function () {
  var provider = new ethers.InfuraWebSocketProvider("sepolia", process.env.INFURA_API_KEY);
  
  provider.on("block", (blockNumber) => {
    // Emitted on every block change
    provider.getBlock(blockNumber).then(function (block) {
      console.log(block);
    });
  });

  provider.on("error", async () => {
    // Emitted when any error occurs
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
};

init();