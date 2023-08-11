const { HDNodeWallet, ethers } = require("ethers");
const words = process.env.WORDS;
const node = HDNodeWallet.fromPhrase(words);

exports.address = async (index) => {
  try {
    let account = node.derivePath(`m/44'/0'/0'/0/${index}`);
    console.log(`Address: ${account.address}`);

    return account.address;
  } catch (err) {
    throw err;
  }
};

exports.ethBalance = async (addr) => {
  try {
    const network = "rinkeby"; // use rinkeby testnet
    const provider = ethers.getDefaultProvider();
    const balance = await provider.getBalance(addr);
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.formatEther(balance);
    console.log(`balance: ${balanceInEth} ETH`);

    return balanceInEth;
  } catch (error) {
    throw error;
  }
};

exports.tokenBalance = async (addr) => {
  try {
    const ethers = require("ethers");
    const genericErc20Abi = require("../Erc20.json");
    const tokenContractAddress = "0x...";
    // const provider = ...; (use ethers.providers.InfuraProvider for a Node app or ethers.providers.Web3Provider(window.ethereum/window.web3) for a React app)
    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
    const balance = ((await contract.balanceOf((await provider.getSigners())[0].address)) / 10 ** 6).toString();
    return balance;
  } catch (error) {
    throw error;
  }
};
