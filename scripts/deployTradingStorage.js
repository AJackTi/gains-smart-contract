const hre = require("hardhat");

async function main() {
  const tradingStorage = await hre.ethers.deployContract(
    "GFarmTradingStorageV5"
  );

  await tradingStorage.waitForDeployment();

  console.log(`Trading storage address: ${tradingStorage.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
