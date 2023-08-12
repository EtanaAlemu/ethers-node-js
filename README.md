# Node.js Ethers HD Wallet and Token Transfer Example

![GitHub](https://img.shields.io/github/license/EtanaAlemu/ethers-node-js)
![GitHub stars](https://img.shields.io/github/stars/EtanaAlemu/ethers-node-js)
![GitHub last commit](https://img.shields.io/github/last-commit/EtanaAlemu/ethers-node-js)
![Logo](logo.png)

This repository contains a Node.js REST API example that demonstrates how to use the Ethers library to interact with Ethereum using Infura and dotenv for environment variable management. The API showcases various functionalities, including creating an HD wallet, fetching Ethereum and token balances, sending Ethereum and tokens, estimating gas prices, and more. It also offers configurations for both testnet and mainnet environments, determined by the `NODE_ENV` environment variable.

**Note:** For the token transfer demonstration, a separate project has been developed for the token contract. You can find the corresponding repository [here](https://github.com/EtanaAlemu/erc20-token-contract), and the frontend project that interacts with the API [here](https://github.com/EtanaAlemu/ethers-hdwallet-frontend).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/EtanaAlemu/ethers-node-js.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ethers-node-js
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Rename `.env.example` to `.env` in the root directory and add your Infura Web3 API key:

   ```bash
   INFURA_API_KEY = your-infura-project-api-key
   ```

## Usage

Make sure you have an Infura project ID. Update the configuration files accordingly before running the API.

To start the REST API server, run:

```bash
npm start
```

The API will be accessible at http://localhost:5000 by default. You can configure the port and other settings in the env files.

## Configuration

In the `configs` directory, you will find environment-specific configuration files for testnet and mainnet environments. Update these files with your contract addresses and other configuration parameters as needed.

## API Endpoints

The API exposes the following endpoints:

- `POST /register`: Register a new user and create an HD wallet for them.
- `POST /login`: Log in a user and retrieve their wallet from MongoDB. Provide an access token for subsequent API requests.
- `GET /getEthBalance`: Get the Ethereum balance of an address.
- `GET /getTokenBalance`: Get the balance of a specific token for an address.
- `POST /sendEth`: Send Ethereum from one address to another.
- `POST /sendToken`: Transfer tokens from one address to another using the token contract.
- `GET /estimateGasPrice`: Estimate the gas price for a transaction.

Refer to the [API documentation](DOCUMENTATION.md) for more details on the request and response formats.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to open a pull request. Make sure to follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This project is for educational purposes only. Use it at your own risk. The authors and contributors are not responsible for any misuse, loss, or damages caused by this software.

The information and code provided in this repository are meant for learning and demonstration purposes. They do not constitute financial, investment, legal, or professional advice. Always exercise caution and conduct thorough research before using any code or making financial decisions related to cryptocurrencies or blockchain technologies.

By using this software, you agree to the terms outlined in the [License](LICENSE) and this disclaimer. If you do not agree with these terms, you should not use this software.

Keep in mind that the cryptocurrency and blockchain space is rapidly evolving, and practices, regulations, and technologies can change. It's important to stay informed about the latest developments and to exercise caution when dealing with cryptocurrencies and related technologies.

Use this project responsibly, and be aware of the potential risks and benefits associated with blockchain and cryptocurrency technologies.
