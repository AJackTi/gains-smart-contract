const hre = require("hardhat");
require("dotenv").config();
const { Wallet } = require("ethers");

const getConfigs = (network) => {
  if (network.name === "mumbai") {
    if (process.env.ACCOUNT_KEYS?.split(",").length == 0) {
      return undefined;
    }
    let owner = new Wallet(process.env.ACCOUNT_KEYS?.split(",")[0]).address;

    let currentOrderID = process.env.CURRENT_ORDER_ID;
    let allFeePercentage = process.env.ALL_FEE_PERCENTAGE;
    let startReferrerFeePercentage = process.env.START_REFERRER_FEE_PERCENTAGE;
    let openFeePercentage = process.env.OPEN_FEE_PERCENTAGE;
    let targetVolumeDai = process.env.TARGET_VOLUME_DAI;

    return {
      Owner: { value: owner },
      CurrentOrderID: { value: currentOrderID },
      AllFeePercentage: { value: allFeePercentage },
      StartReferrerFeePercentage: { value: startReferrerFeePercentage },
      OpenFeePercentage: { value: openFeePercentage },
      TargetVolumeDai: { value: targetVolumeDai },
    };
  }
};

module.exports = {
  getConfigs,
};
