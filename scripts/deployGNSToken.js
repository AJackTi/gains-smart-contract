const hre = require("hardhat");
require("dotenv").config();
const { Wallet } = require("ethers");

async function main() {
  if (process.env.ACCOUNT_KEYS?.split(",").length == 0) {
    return;
  }
  let firstWallet = new Wallet(process.env.ACCOUNT_KEYS?.split(",")[0]).address;

  const gns = await hre.ethers.deployContract("GainsNetworkToken", [
    firstWallet,
  ]);

  await gns.waitForDeployment();

  console.log(`GNS token address: ${gns.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
