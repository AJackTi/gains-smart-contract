const { timeout } = require('../utils/delay');
const { createDeployFunction } = require('../utils/deploy');

const func = createDeployFunction({
  contractName: 'GNSTradingV6_4_1',
  dependencyNames: [
    'GFarmTradingStorageV5',
    'GNSOracleRewardsV6_4_1',
    'GNSPairInfosV6_1',
    'GNSReferralsV6_2',
    'GNSBorrowingFeesV6_4',
  ],
  libraryNames: ['PackingUtils', 'TradeUtils'],
  afterDeploy: async () => {
    await timeout(1500);
  },
  getDeployArgs: ({ dependencyContracts }) => [
    dependencyContracts['GFarmTradingStorageV5'].address,
    dependencyContracts['GNSOracleRewardsV6_4_1'].address,
    dependencyContracts['GNSPairInfosV6_1'].address,
    dependencyContracts['GNSReferralsV6_2'].address,
    dependencyContracts['GNSBorrowingFeesV6_4'].address,
    '100000000000000000000000',
    // 2500000000,
    30,
  ],
});

module.exports = func;
