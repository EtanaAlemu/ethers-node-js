const { HDNodeWallet, ethers } = require("ethers");
const words = process.env.WORDS;
const node = HDNodeWallet.fromPhrase(words);

const MAINNET_HD_WALLET = "m/44'/60'/0'/0";
const TESTNET_HD_WALLET = "m/44'/1'/0'/0";
const isProd = process.env.NODE_ENV == "production";
const network = isProd ? "mainnet" : "sepolia";
const provider = isProd ? ethers.getDefaultProvider() : new ethers.InfuraProvider(network, process.env.INFURA_API_KEY);
const path = isProd ? MAINNET_HD_WALLET : TESTNET_HD_WALLET;

exports.address = async (index) => {
  try {
    let account = node.derivePath(`${path}/${index}`);
    return account.address;
  } catch (err) {
    throw err;
  }
};

exports.ethBalance = async (addr) => {
  try {
    // convert a currency unit from wei to ether
    const balance = ethers.formatEther(await provider.getBalance(addr));
    return balance;
  } catch (error) {
    throw error;
  }
};

exports.tokenBalance = async (addr) => {
  try {
    const abi = require("../ABI.json");
    const contractAddress = "0xF4623e04B96dFa4fc2267ac1217FC86966f56752";
    const contract = new ethers.Contract(contractAddress, abi, provider);
    var decimal = await contract.decimals();
    var tokenName = await contract.name();
    var tokenSymbol = await contract.symbol();
    const balance = ethers.formatUnits(await contract.balanceOf(addr), 18);
    // return { balance };
    return { balance, decimal, tokenName, tokenSymbol };
  } catch (error) {
    throw error;
  }
};

exports.sendEth = async (index, addr, amount) => {
  try {
    let account = node.derivePath(`${path}/${index}`);
    let privateKey = account.privateKey;
    let signer = new ethers.Wallet(privateKey, provider);
    let data = {
      to: addr,
      // Convert currency unit from ether to wei
      value: ethers.parseEther(amount),
    };
    let tx = await signer.sendTransaction(data);
    console.log("Mining transaction...");
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Mined in block ${receipt.blockNumber}`);
    return { txHash: tx.hash };
  } catch (error) {
    throw error;
  }
};

exports.sendToken = async (index, toAddress, value) => {
  try {
    let account = node.derivePath(`${path}/${index}`);
    let privateKey = account.privateKey;
    let signer = new ethers.Wallet(privateKey, provider);
    const abi = require("../ABI.json");
    const contractAddress = "0xF4623e04B96dFa4fc2267ac1217FC86966f56752";
    const contract = new ethers.Contract(contractAddress, abi, provider);
    var decimal = await contract.decimals();
    let amount = ethers.parseUnits(value, decimal);
    const data = contract.interface.encodeFunctionData("transfer", [toAddress, amount]);

    const gasLimit = await provider.estimateGas({
      from: signer.address,
      to: contractAddress,
      value: ethers.parseUnits("0.000", "ether"),
      data: data,
    });
    console.log("gasLimit", gasLimit);
    const nonce = await signer.getNonce();
    console.log("nonce", nonce);
    const chainId = isProd ? 1 : 11155111;
    const tx = await signer.sendTransaction({
      to: contract,
      from: signer.address,
      value: ethers.parseUnits("0.000", "ether"),
      data,
      nonce,
      maxPriorityFeePerGas: ethers.parseUnits("3", "wei"),
      gasLimit,
      chainId,
    });

    //Connect to a signer so that you can pay to send state changing txs
    // const contractSigner = contract.connect(signer);

    //Define tx and transfer token amount to the destination address
    // const tx = await contractSigner.transfer(toAddress, amount);
    console.log("Mining transaction...");
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Mined in block ${receipt.blockNumber}`);
    return { txHash: tx.hash };
  } catch (error) {
    throw error;
  }
};

exports.estimateGasToken = async (index, toAddress, value) => {
  try {
    let account = node.derivePath(`${path}/${index}`);
    let privateKey = account.privateKey;
    let signer = new ethers.Wallet(privateKey, provider);
    const abi = require("../ABI.json");
    const contractAddress = "0xF4623e04B96dFa4fc2267ac1217FC86966f56752";
    const contract = new ethers.Contract(contractAddress, abi, provider);
    var decimal = await contract.decimals();
    let amount = ethers.parseUnits(value, decimal);

    const data = contract.interface.encodeFunctionData("transfer", [toAddress, amount]);
    const limit = await provider.estimateGas({
      from: signer.address,
      to: contractAddress,
      value: ethers.parseUnits("0.000", "ether"),
      data: data,
    });

    return { limit };
  } catch (error) {
    throw error;
  }
};
