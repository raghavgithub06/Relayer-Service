import { ethers } from "hardhat";

async function main() {
  const TargetSmartContract = await ethers.getContractFactory("TargetSmartContract");
  const targetContract = await TargetSmartContract.deploy();

  console.log("TargetSmartContract deployed to:", targetContract.address);

  const RelayerService = await ethers.getContractFactory("RelayerService");
  const relayerService = await RelayerService.deploy();

  console.log("RelayerService deployed to:", relayerService.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });









