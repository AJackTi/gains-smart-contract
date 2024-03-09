const contractAddr =
  require('../deployments/mumbai/GainsNetworkToken.json').address;
const tradingStorage =
  require('../deployments/mumbai/GFarmTradingStorageV5.json').address;
const nftRewards =
  require('../deployments/mumbai/GNSOracleRewardsV6_4_1.json').address;
const referralRewards =
  require('../deployments/mumbai/GNSReferralsV6_2.json').address;
const trading = require('../deployments/mumbai/GNSTradingV6_4_1.json').address;
const callbacks =
  require('../deployments/mumbai/GNSTradingV6_4_1.json').address;
const vault = require('../deployments/mumbai/GTokenV6_3_2.json').address;

async function setupRoles() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    'GainsNetworkToken',
    contractAddr,
    owner
  );

  console.info('Submitting setupRoles transaction...');
  const tx = await contract.setupRoles(
    tradingStorage,
    nftRewards,
    referralRewards,
    trading,
    '0xA7443A20B42f9156F7D9DB01e51523C42CAC8eCE',
    vault
  );

  console.info('Waiting setupRoles to complete...');
  await hre.ethers.provider.waitForTransaction(tx.hash);
  console.info('setupRoles completed.');
}

module.exports = setupRoles;
