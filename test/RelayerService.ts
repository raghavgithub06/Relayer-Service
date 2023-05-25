import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy the MetaTransactionReceiver contract
  const MetaTransactionReceiver = await ethers.getContractFactory("MetaTransactionReceiver");
  const metaTransactionReceiver = await MetaTransactionReceiver.deploy();

  // Deploy the TargetSmartContract contract
  const TargetSmartContract = await ethers.getContractFactory("TargetSmartContract");
  const targetSmartContract = await TargetSmartContract.deploy();

  // Deploy the RelayerService contract
  const RelayerService = await ethers.getContractFactory("RelayerService");
  const relayerService = await RelayerService.deploy();

  // Wait for the contracts to be deployed
  await metaTransactionReceiver.deployed();
  await targetSmartContract.deployed();
  await relayerService.deployed();

  // Perform test cases
  await testTransfer(metaTransactionReceiver, deployer);
  await testApprove(metaTransactionReceiver, deployer);
  await testTransferFrom(metaTransactionReceiver, deployer);
  await testSubmitUserTransaction(relayerService, targetSmartContract, deployer);
  await testSendBatch(relayerService, deployer);

  // Finish testing
  console.log("All tests passed!");
}

async function testTransfer(contract: any, deployer: any) {
  // Perform test for transfer function
  const amount = ethers.utils.parseEther("1.0");
  const recipient = await deployer.getAddress();

  const tx = await contract.transfer(recipient, amount);
  await tx.wait();

  // Check the balances after the transfer
  const balance = await contract.balances(deployer.address);
  console.log(`Transfer Test - Balance after transfer: ${balance.toString()}`);
}

async function testApprove(contract: any, deployer: any) {
  // Perform test for approve function
  const amount = ethers.utils.parseEther("1.0");
  const spender = await deployer.getAddress();

  const tx = await contract.approve(spender, amount);
  await tx.wait();

  // Check the allowance after approval
  const allowance = await contract.allowances(deployer.address, spender);
  console.log(`Approve Test - Allowance after approval: ${allowance.toString()}`);
}

async function testTransferFrom(contract: any, deployer: any) {
  // Perform test for transferFrom function
  const amount = ethers.utils.parseEther("1.0");
  const sender = await deployer.getAddress();
  const recipient = await deployer.getAddress();

  // Increase allowance before transferFrom
  await contract.approve(sender, amount);

  const tx = await contract.transferFrom(sender, recipient, amount);
  await tx.wait();

  // Check the balances after transferFrom
  const senderBalance = await contract.balances(sender);
  const recipientBalance = await contract.balances(recipient);
  console.log(`TransferFrom Test - Sender balance after transfer: ${senderBalance.toString()}`);
  console.log(`TransferFrom Test - Recipient balance after transfer: ${recipientBalance.toString()}`);
}

async function testSubmitUserTransaction(relayerService: any, targetSmartContract: any, deployer: any) {
  // Perform test for submitUserTransaction function
  const data = targetSmartContract.interface.encodeFunctionData("transfer", [
    await deployer.getAddress(),
    ethers.utils.parseEther("1.0")
  ]);

  const tx = await relayerService.submitUserTransaction(targetSmartContract.address, data);
  await tx.wait();

  // Add assertions if necessary
}

async function testSendBatch(relayerService: any, deployer: any) {
  // Perform test for sendBatch function
  const currentTime = Math.floor(Date.now() / 1000);
  await relayerService.sendBatch();

  // Check if the lastBatchSentTime is updated
  const lastBatchSentTime = await relayerService.lastBatchSentTime();
  console.log(`SendBatch Test - lastBatchSentTime: ${lastBatchSentTime.toString()}`);
}

// Run the test script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });