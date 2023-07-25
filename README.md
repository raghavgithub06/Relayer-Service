# Relayer-Service

This repository contains multiple smart contracts implemented in Solidity.

## MetaTransactionReceiver Smart Contract

### Description

The `MetaTransactionReceiver` smart contract implements the `IERC20` interface and allows users to interact with ERC-20 tokens. It provides functionalities to handle user transactions and manage token transfers and allowances.

### Contract Details

- **Solidity Version Compatibility**: ^0.8.0
- **License**: MIT

### State Variables

- `balances` (mapping): Tracks the token balance of each user.
- `allowances` (mapping): Tracks the approved allowances for each user to spend tokens on their behalf.

### Functions

1. `processUserTransaction(address user, uint256 amount) external`: Allows processing user transactions and updating their token balances.

2. `transfer(address recipient, uint256 amount) external override returns (bool)`: Implements the transfer of tokens from the sender to the recipient.

3. `approve(address spender, uint256 amount) external override returns (bool)`: Implements the approval of allowances for a spender to spend tokens on behalf of the sender.

4. `transferFrom(address sender, address recipient, uint256 amount) external override returns (bool)`: Implements the transfer of tokens from the sender to the recipient on behalf of the sender's approved allowance.

## TargetSmartContract Smart Contract

### Description

The `TargetSmartContract` smart contract also implements the `IERC20` interface and allows users to interact with ERC-20 tokens. It provides functionalities to manage token transfers and allowances.

### Contract Details

- **Solidity Version Compatibility**: ^0.8.0
- **License**: MIT

### State Variables

- `balances` (mapping): Tracks the token balance of each user.
- `allowances` (mapping): Tracks the approved allowances for each user to spend tokens on their behalf.

### Functions

1. `transfer(address recipient, uint256 amount) external override returns (bool)`: Implements the transfer of tokens from the sender to the recipient.

2. `approve(address spender, uint256 amount) external override returns (bool)`: Implements the approval of allowances for a spender to spend tokens on behalf of the sender.

3. `transferFrom(address sender, address recipient, uint256 amount) external override returns (bool)`: Implements the transfer of tokens from the sender to the recipient on behalf of the sender's approved allowance.

## RelayerService Smart Contract

### Description

The `RelayerService` smart contract enables the submission and batch execution of user transactions on target smart contracts. The contract batches and executes user transactions in intervals to optimize gas usage.

### Contract Details

- **Solidity Version Compatibility**: ^0.8.0
- **License**: MIT

### State Variables

- `userTransactions` (array of `UserTransaction` struct): Stores the user transactions to be executed in batches.
- `lastBatchSentTime` (uint256): Records the timestamp of the last batch execution.

### Structs

1. `UserTransaction`: Represents a user transaction with the following properties:
   - `user` (address): The address of the user initiating the transaction.
   - `targetContract` (address): The address of the target smart contract where the transaction will be executed.
   - `data` (bytes): The transaction data to be executed on the target contract.

### Functions

1. `submitUserTransaction(address targetContract, bytes memory data) external`: Allows users to submit their transactions for batch execution.

2. `sendBatch() external`: Executes a batch of user transactions in intervals based on gas optimization. The function removes processed transactions from the list and shifts remaining transactions to the beginning of the array to trim the array and remove empty elements.

## Note

This documentation provides an overview of the three smart contracts - `MetaTransactionReceiver`, `TargetSmartContract`, and `RelayerService`. Before deploying or interacting with any smart contract, it is crucial to conduct a thorough code review, audit the contract's security, and understand the implications of each function. The contracts handle ERC-20 token interactions and user transaction batching to optimize gas usage and efficiency in token transfers and allowances.
