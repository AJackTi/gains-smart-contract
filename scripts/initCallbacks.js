const addr =
  require('../deployments/mumbai/GNSTradingCallbacksV6_4_1.json').address;
const storageT =
  require('../deployments/mumbai/GFarmTradingStorageV5.json').address;
const rewards =
  require('../deployments/mumbai/GNSOracleRewardsV6_4_1.json').address;
const pairsInfo =
  require('../deployments/mumbai/GNSPairInfosV6_1.json').address;
const referrals =
  require('../deployments/mumbai/GNSReferralsV6_2.json').address;

async function initCallbacks() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    'GNSTradingCallbacksV6_4_1',
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

module.exports = initCallbacks;
