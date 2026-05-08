require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const BESU_RPC_URL = process.env.BESU_RPC_URL || "http://127.0.0.1:8545";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    besu: {
      url: BESU_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: Number(process.env.BESU_CHAIN_ID || 1337)
    }
  }
};
