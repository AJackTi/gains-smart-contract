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
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
          viaIR: true,
        },
      },
      {
        version: "0.8.17",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
          viaIR: true,
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 800,
          },
          metadata: {
            // do not include the metadata hash, since this is machine dependent
            // and we want all generated code to be deterministic
            // https://docs.soliditylang.org/en/v0.7.6/metadata.html
            bytecodeHash: "none",
          },
        },
      },
    ],
    overrides: {
      "contracts/uniswap/libraries/TickBitmap.sol": { version: "0.7.6" },
      "contracts/GNSTradingCallbacksV6_1": { version: "0.8.14" },
    },
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai-pokt.nodies.app",
      chainId: 80001,
      accounts: process.env.ACCOUNT_KEYS.split(",") || [],
      allowUnlimitedContractSize: true,
    },
    hardhat: {},
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
