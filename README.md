Overview
This repository contains a collection of Solidity smart contracts for token transfers and meta-transactions. It includes the following contracts:

MetaTransactionReceiver: Implements the IERC20 interface and provides functionality for processing user transactions and executing token transfers.

TargetSmartContract: Implements the IERC20 interface and provides basic token transfer functionality.

RelayerService: Allows users to submit batched transactions that will be executed on target contracts.

Contracts
MetaTransactionReceiver
This contract implements the IERC20 interface and provides the following functions:

processUserTransaction(address user, uint256 amount)
Description: Handles a user transaction by updating the user's balance.
Parameters:
user: The address of the user.
amount: The amount of tokens to process.
Visibility: External

transfer(address recipient, uint256 amount) returns (bool)
Description: Transfers tokens from the sender's account to the recipient's account.
Parameters:
recipient: The address of the recipient.
amount: The amount of tokens to transfer.
Returns: true if the transfer is successful, otherwise reverts.
Visibility: External

approve(address spender, uint256 amount) returns (bool)
Description: Approves a spender to spend tokens on behalf of the sender.
Parameters:
spender: The address of the spender.
amount: The amount of tokens to approve.
Returns: true if the approval is successful, otherwise reverts.
Visibility: External

transferFrom(address sender, address recipient, uint256 amount) returns (bool)
Description: Transfers tokens from the sender's account to the recipient's account on behalf of a spender.
Parameters:
sender: The address of the sender.
recipient: The address of the recipient.
amount: The amount of tokens to transfer.
Returns: true if the transfer is successful, otherwise reverts.
Visibility: External

TargetSmartContract
This contract implements the IERC20 interface and provides basic token transfer functionality.

transfer(address recipient, uint256 amount) returns (bool)
Description: Transfers tokens from the sender's account to the recipient's account.
Parameters:
recipient: The address of the recipient.
amount: The amount of tokens to transfer.
Returns: true if the transfer is successful, otherwise reverts.
Visibility: External

approve(address spender, uint256 amount) returns (bool)
Description: Approves a spender to spend tokens on behalf of the sender.
Parameters:
spender: The address of the spender.
amount: The amount of tokens to approve.
Returns: true if the approval is successful, otherwise reverts.
Visibility: External

transferFrom(address sender, address recipient, uint256 amount) returns (bool)
Description: Transfers tokens from the sender's account to the recipient's account on behalf of a spender.
Parameters:
sender: The address of the sender.
recipient: The address of the recipient.
amount: The amount of tokens to transfer.
Returns: true if the transfer is successful, otherwise reverts.
Visibility: External

RelayerService
This contract enables users to submit batched transactions to be executed on target contracts.

submitUserTransaction(address targetContract, bytes data)
Description: Submits a user transaction to be executed on a target contract.
Parameters:
targetContract: The address of the target contract.
data: The transaction data.
Visibility: External

sendBatch()
Description: Executes a batch of user transactions on target contracts.
Conditions: The batch send interval must have passed since the last batch was sent.
Visibility: External

Compilation and Deployment
To compile and access these smart contracts, you can use the Hardhat tool. Follow the steps below:

1.Install Hardhat: Make sure you have Node.js and npm installed on your machine. Run the following command to install Hardhat globally:
npm install -g hardhat

2.Compile Contracts: Run the following command to compile the contracts:
npx hardhat compile

3.Deploy the Contracts: Run the deployment script with the following command:
npx hardhat run scripts/deploy.ts --network <network_name>

4. Access the Contracts: Once the contracts are deployed, you can interact with them using various Ethereum tools, such as web3.js or ethers.js. Use the contract addresses and ABIs provided during deployment to instantiate contract instances and call their functions.

License
This project is licensed under the MIT License. You can find the license text in the provided SPDX-License-Identifier comment at the beginning of each smart contract file.


