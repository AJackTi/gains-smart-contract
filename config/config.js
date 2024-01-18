const hre = require("hardhat");
require("dotenv").config();
const { Wallet } = require("ethers");

const getConfigs = (network) => {
  if (network.name === "mumbai") {
    if (process.env.ACCOUNT_KEYS?.split(",").length == 0) {
      return undefined;
    }
    let owner = new Wallet(process.env.ACCOUNT_KEYS?.split(",")[0]).address;

    return {
      Owner: { value: owner },
    };
  }
};

module.exports = {
  getConfigs,
};
