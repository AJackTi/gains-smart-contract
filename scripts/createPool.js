const hre = require('hardhat');
const deployment = require('../deployments/mumbai/UniswapV3Factory.json');

async function main() {
  try {
    const contract = await hre.ethers.getContractAt(
      'UniswapV3Factory',
      deployment.address
    );

    const owner = await contract.owner();
    console.log(owner);
  } catch (e) {
    console.error('1', e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
