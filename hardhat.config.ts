import { HardhatUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-ethers'
const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com",
      accounts: ["1b0e72aa33c9b205609c8a7910ce9c7d6a580ef9d81599b83388d6181c2f2768"], 
  },
},
  solidity: {
    version: "0.8.0",
  },
};

export default config;