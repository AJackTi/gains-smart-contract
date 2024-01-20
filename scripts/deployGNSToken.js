const hre = require("hardhat");
require("dotenv").config();
const { Wallet } = require("ethers");

async function main() {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const gns = await hre.ethers.deployContract("GainsNetworkToken", [deployer]);

  await gns.waitForDeployment();

  console.log(`GNS token address: ${gns.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
