require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
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
};
