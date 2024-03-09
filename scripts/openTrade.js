const hre = require('hardhat');
const deployment = require('../deployments/mumbai/GNSTradingV6_4_1.json');
const callbacksAddr =
  require('../deployments/mumbai/GNSTradingCallbacksV6_4_1.json').address;
const rewardsAddr =
  require('../deployments/mumbai/GNSOracleRewardsV6_4_1.json').address;

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    'GNSTradingV6_4_1',
    deployment.address,
    // '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    owner
  );

  const callbacks = await hre.ethers.getContractAt(
    'GNSTradingCallbacksV6_4_1',
    callbacksAddr
  );

  const rewards = await hre.ethers.getContractAt(
    'GNSOracleRewardsV6_4_1',
    rewardsAddr
  );

  // market
  // await contract.openTrade(
  //   [
  //     owner.address,
  //     0,
  //     0,
  //     0,
  //     50000000000000000000n,
  //     674125000000000,
  //     true,
  //     32,
  //     863722656250000,
  //     0,
  //   ],
  //   0,
  //   10400000000,
  //   0x0000000000000000000000000000000000000000
  // );

  // limit
  console.info('submitting openTrade tx...');
  const tx = await contract.openTrade(
    [
      owner.address,
      0,
      0,
      0,
      '100000000000000000000',
      650000000000000,
      true,
      29,
      851724137931034,
      0,
    ],
    1,
    10000000000,
    '0x0000000000000000000000000000000000000000'
  );
  console.info('submited openTrade tx. Waiting...');
  await tx.wait();
  console.info('tx completed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
