// GNSToken::addMinterRole: (add mint GNS role for trading contract)
const hre = require("hardhat");

async function addTradingContract(address, tradingContractAddress) {
  const { deployments, getNamedAccounts } = hre;
  const { read, execute, log } = deployments;
  const { deployer } = await getNamedAccounts();

  try {
    await execute(
      "GFarmTradingStorageV5",
      { from: deployer, log: true },
      "addTradingContract",
      address,
      tradingContractAddress
    );
  } catch (err) {
    console.log(
      `🚀 ~ file: trading.js:19 ~ addTradingContract at contract ${address} ~ error: ${err}`
    );
  }
}

module.exports = {
  addTradingContract,
};
