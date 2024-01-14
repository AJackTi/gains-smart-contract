require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1000,
        details: {
          constantOptimizer: true,
        },
      },
    },
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai-pokt.nodies.app",
      chainId: 80001,
      accounts: process.env.ACCOUNT_KEYS?.split(",") || [],
      allowUnlimitedContractSize: true,
    },
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  gasReporter: {
    enabled: true,
  },
  namedAccounts: {
    deployer: 0,
  },
  mocha: {
    timeout: 100000000,
  },
};
