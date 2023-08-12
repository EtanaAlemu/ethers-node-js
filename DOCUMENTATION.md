### Register User and Create Wallet

- `POST /register`: Registers a new user and creates an HD wallet for them.

#### Request

- Body:

```json
{
  "username": "user",
  "password": "password"
}
```

#### Response

- Status: `201 Created`
- Body:

```json
{
  "message": "User registered successfully"
}
```

### User Login and Retrieve Wallet

- `POST /login` : Logs in a user and retrieves their wallet from MongoDB. Provides an access token for subsequent API requests.

#### Request

- Body:

```json
{
  "username": "user",
  "password": "password"
}
```

#### Response

- Status: `200 OK`
- Body:

```json
{
  "username": "user",
  "address": "0xYourAddress",
  "access_token": "your-access-token"
}
```

### Get Ethereum Balance

- `GET /getEthBalance`: Gets the Ethereum balance of a user login.

#### Request

- Headers:
  - `Authorization: Bearer your-access-token`

#### Response

- Status: `200 OK`
- Body:

```json
{
  "address": "0xYourAddress",
  "balance": "1.23456789"
}
```

**Note:** Replace `your-access-token` with the actual token provided during the login process.

**Example Flow:**

1. The client includes the user's access token in the Authorization header as a bearer token.

2. The server decodes the token to extract user information, including the user ID.

3. The server looks up the user in the database using the decoded user ID to retrieve their wallet address associated with the account.

4. The server then queries the Ethereum blockchain or provider to get the Ethereum balance of the provided address.

5. The server responds with the user's Ethereum balance.

### Get Token Balance

- `GET /getTokenBalance`: Gets the balance of a specific token for the authenticated user's wallet address.

#### Request

- Headers:
  - `Authorization: Bearer your-access-token`

#### Response

- Status: `200 OK`
- Body:

```json
{
  "address": "0xYourAddress",
  "balance": "1.23456789",
  "decimal": "18",
  "tokenName": "TokenName",
  "tokenSymbol": "TokenSymbol"
}
```

**Note:** Replace `your-access-token` with the actual token provided during the login process.

**Example Flow:**

1. The client includes the user's access token in the `Authorization` header as a bearer token.

2. The server decodes the token to extract user information, including the user ID.

3. The server looks up the user in the database using the decoded user ID to retrieve their wallet address associated with the account.

4. The server retrieves the token contract address and ABI from configuration.

5. Using the Ethers library the server queries the token contract using the known tokenAddress to get the token balance of the user's wallet address.

6. The server responds with the user's token balance.

### Send Ethereum

- `POST /sendEth`: Sends Ethereum from user login to another.

#### Request

- Headers:
  - `Authorization: Bearer your-access-token`
- Body:

```json
{
  "toAddress": "0xRecipientAddress",
  "amount": "1.2345"
}
```

#### Response

- Status: `200 OK`
- Body:

```json
{
  "transactionHash": "0xTransactionHash",
  "message": "Transaction successful"
}
```

**Note:** Replace `your-access-token` with the actual token provided during the login process.

**Example Flow:**

1. The client includes the user's access token in the `Authorization` header as a bearer token.

2. The server decodes the token to extract user information, including the user ID.

3. The server looks up the user in the database using the decoded user ID to retrieve their wallet address associated with the account.

4. The server constructs a transaction to send Ethereum from the user's wallet address to the specified recipient's address.

5. The transaction is signed with the user's wallet private key.

6. The transaction is broadcasted to the Ethereum network.

7. The server responds with the transaction hash and a success message.

### Send Token

- `POST /sendToken`: Transfers tokens from the authenticated user's wallet to a specified recipient using a token contract. Please note that users need to have some Ether for gas fees.

#### Request

- Headers:
  - `Authorization: Bearer your-access-token`
- Body:

```json
{
  "toAddress": "0xRecipientAddress",
  "amount": "1.2345"
}
```

**Note:** Replace `your-access-token` with the actual token provided during the login process.

#### Response

- Status: `200 OK`
- Body:

```json
{
  "transactionHash": "0xTransactionHash",
  "message": "Transaction successful"
}
```

**Example Flow:**

1. The client includes the user's access token in the Authorization header as a bearer token.

2. The server decodes the token to extract user information, including the user ID.

3. The server looks up the user in the database using the decoded user ID to retrieve their wallet address associated with the account.

4. The server retrieves the token contract address and ABI from configuration.

5. The server constructs a transaction to transfer tokens from the user's wallet address to the specified recipient's address using the token contract.

6. The transaction is signed with the user's wallet private key.

7. The transaction is broadcasted to the Ethereum network.

8. The server responds with the transaction hash and a success message.

### Estimate Gas Price

- `GET /estimateGasPrice`: Estimates the gas price for a transaction.

#### Request

- No request parameters needed.

#### Response

- Status: `200 OK`
- Body:

```json
{
  "gasPrice": "10 Gwei"
}
```
