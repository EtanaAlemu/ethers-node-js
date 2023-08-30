# Node.js Ethers HD Wallet and Token Transfer Example

![GitHub](https://img.shields.io/github/license/EtanaAlemu/ethers-node-js)
![GitHub stars](https://img.shields.io/github/stars/EtanaAlemu/ethers-node-js)
![GitHub last commit](https://img.shields.io/github/last-commit/EtanaAlemu/ethers-node-js)

This repository contains a Node.js REST API that demonstrates how to use the Ethers library to interact with Ethereum using Infura and default provider. The API showcases various functionalities, including creating an HD wallet, fetching Ethereum and token balances, sending Ethereum and tokens, estimating gas prices, and more. It also offers configurations for both testnet and mainnet environments, determined by the `NODE_ENV` environment variable.

**Note:** For the token transfer demonstration, a separate project has been developed for the token contract. You can find the corresponding repository [here](https://github.com/EtanaAlemu/erc20-token-contract), and the frontend project that interacts with the API [here](https://github.com/EtanaAlemu/ethers-hdwallet-frontend).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Docker Support](#docker-support)
- [API Documentation with Swagger](#api-documentation-with-swagger)
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

### HTTPS with Self-Signed Certificate
To enable HTTPS with a self-signed certificate for local development, follow these steps:

1. Generate a self-signed certificate:

   ```bash
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
   ```
2. Place the generated `key.pem` and `cert.pem` files in a root directory of the project.
## Usage

Make sure you have an Infura project ID. Update the configuration files accordingly before running the API.

To start the REST API server, run:

```bash
npm run dev
```

The API will be accessible at https://localhost:5000 by default. You can configure the port and other settings in the `env` files.

## Configuration

In the `configs` directory, you will find environment-specific configuration files for testnet and mainnet environments. Update these files with your contract addresses and other configuration parameters as needed.

## Docker Support

You can also run the API using Docker. Make sure you have Docker installed. To build and run the Docker container, execute the following commands:

```bash
docker-compose build
docker-compose up
```

The API will be accessible in the container at the same port as specified in the `env` file.

## API Documentation with Swagger

Swagger provides interactive API documentation. You can access the Swagger UI by navigating to `/api/docs` when the API is running. It provides details about all available endpoints, request/response formats, and more.

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
