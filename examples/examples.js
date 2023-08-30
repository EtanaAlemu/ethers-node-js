// Import necessary modules from the 'ethers' library
const { Wallet, Mnemonic, HDNodeWallet, ethers } = require("ethers");

// Generate a random Ethereum wallet
const wallet = Wallet.createRandom();

// Retrieve the mnemonic phrase, address, and private key from the generated wallet
const phrase = wallet.mnemonic.phrase;
const address = wallet.address;
const privateKey = wallet.privateKey;

// Display wallet information
console.log("wallet mnemonic phrase:", phrase);
console.log("wallet address:", address);
console.log("wallet privateKey:", privateKey);

const provider = ethers.getDefaultProvider();
provider.getBalance(address).then((balance) => {
  console.log(`address balance: ${balance} ETH`);
});

// Create an Mnemonic instance from the generated mnemonic phrase
const mnemonic = Mnemonic.fromPhrase(phrase);

// Derive multiple Ethereum addresses and private keys using the hierarchical deterministic (HD) wallet approach
for (let index = 0; index < 10; index++) {
  // Generate an HDNodeWallet instance using the mnemonic phrase and a derivation path
  // The derivation path follows the BIP-44 standard for Ethereum: m/44'/60'/0'/0/{index}
  const node = HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`);

  // Retrieve the derived address and private key from the HDNodeWallet instance
  const address = node.address;
  const privateKey = node.privateKey;

  // Display the index, derived address, and private key
  console.log(`index ${index}: address = ${address}, privateKey = ${privateKey}`);
}
