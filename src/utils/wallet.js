const { HDNodeWallet, ethers } = require("ethers");
const { NETWORK, PROVIDER, PATH, TOKEN_CONTRACT_ADDRESS, ABI } = require("../configs/wallet.config");

const words = process.env.WORDS;
const node = HDNodeWallet.fromPhrase(words);

exports.address = async (index) => {
  let account = node.derivePath(`${PATH}/${index}`);
  return account.address;
};

exports.ethBalance = async (addr) => {
  // convert a currency unit from wei to ether
  const balance = ethers.formatEther(await PROVIDER.getBalance(addr));
  return balance;
};

exports.tokenBalance = async (addr) => {
  const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ABI, PROVIDER);
  var decimal = await contract.decimals();
  var tokenName = await contract.name();
  var tokenSymbol = await contract.symbol();
  const balance = ethers.formatUnits(await contract.balanceOf(addr), decimal);
  return { balance, decimal, tokenName, tokenSymbol };
};

exports.sendEth = async (index, addr, amount) => {
  let account = node.derivePath(`${PATH}/${index}`);
  let privateKey = account.privateKey;
  let signer = new ethers.Wallet(privateKey, PROVIDER);
  let data = {
    to: addr,
    // Convert currency unit from ether to wei
    value: ethers.parseEther(amount),
  };
  let tx = await signer.sendTransaction(data);
  console.log("TRANSACTION: ", tx);
  return tx;
};

exports.sendToken = async (index, toAddress, value) => {
  let account = node.derivePath(`${PATH}/${index}`);
  let privateKey = account.privateKey;
  let signer = new ethers.Wallet(privateKey, PROVIDER);
  const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ABI, PROVIDER);
  var decimal = await contract.decimals();
  let amount = ethers.parseUnits(value, decimal);
  //Connect to a signer so that you can pay to send state changing txs
  const contractSigner = contract.connect(signer);
  //Define tx and transfer token amount to the destination address
  const tx = await contractSigner.transfer(toAddress, amount);
  console.log("TRANSACTION: ", tx);
  return tx;
};

exports.estimateGasFee = async () => {
  const feeData = await PROVIDER.getFeeData();
  return { gasPrice: ethers.formatUnits(feeData.gasPrice.toString(), "gwei"), maxFeePerGas: ethers.formatUnits(feeData.maxFeePerGas.toString(), "gwei"), maxPriorityFeePerGas: ethers.formatUnits(feeData.maxPriorityFeePerGas.toString(), "gwei") };
};
