const addr =
  require('../deployments/mumbai/GNSOracleRewardsV6_4_1.json').address;
const storageT =
  require('../deployments/mumbai/GFarmTradingStorageV5.json').address;

async function initOracleRewards() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    'GNSOracleRewardsV6_4_1',
    addr,
    owner
  );

  console.info('Initializing GNSOracleRewardsV6_4_1...');
  console.info('Submitting initialize transaction...');
  const tx = await contract.initialize(storageT, 1, 1);
  console.info('Waiting for initialize transaction...');
  await hre.ethers.provider.waitForTransaction(tx.hash);
  console.info('initialize completed.');
}

module.exports = initOracleRewards;
