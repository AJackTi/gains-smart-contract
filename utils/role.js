// GNSToken::addMinterRole: (add mint GNS role for trading contract)
const hre = require("hardhat");

async function addMinterRole(address, tradingContractAddress) {
  const { deployments, getNamedAccounts } = hre;
  const { read, execute, log } = deployments;
  const { deployer } = await getNamedAccounts();

  try {
    await execute(
      "GainsNetworkToken",
      { from: deployer, log: true },
      "addMinterRole",
      address,
      tradingContractAddress
    );
  } catch (err) {
    console.log(
      `🚀 ~ file: role.js:19 ~ addMinterRole at contract ${address} ~ error: ${err}`
    );
  }
}

module.exports = {
  addMinterRole,
};
