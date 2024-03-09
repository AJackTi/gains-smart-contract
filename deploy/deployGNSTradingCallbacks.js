const { timeout } = require('../utils/delay');
const { createDeployFunction } = require('../utils/deploy');

const constructorContracts = [
  'GFarmTradingStorageV5',
  'GNSOracleRewardsV6_4_1',
  'GNSPairInfosV6_1',
  'GNSReferralsV6_2',
  'GNSStakingV6_4_1',
];

const func = createDeployFunction({
  contractName: 'GNSTradingCallbacksV6_4_1',
  dependencyNames: constructorContracts,
  getProxyConfig: ({ dependencyContracts }) => ({
    execute: {
      init: {
        methodName: 'initialize',
        args: [
          ...constructorContracts.map(
            (dependencyName) => dependencyContracts[dependencyName].value
          ),
          50,
          0,
          50,
          2,
        ],
      },
    },
    proxyContract: 'OpenZeppelinTransparentProxy',
  }),
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);
  },
});

module.exports = func;
