require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 10,
      details: {
        constantOptimizer: true,
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
