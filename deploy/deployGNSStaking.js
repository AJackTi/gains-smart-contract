const { timeout } = require('../utils/delay');
const { createDeployFunction } = require('../utils/deploy');

const func = createDeployFunction({
  contractName: 'GNSStakingV6_4_1',
  getProxyConfig: () => ({
    execute: {
      init: {
        methodName: 'initialize',
        args: [
          '0xd7D1dCba2c678ee7e049BD55176354E7C5bBdcCA',
          '0x469Cd2AE37BC3d579eE2c4F0B5e31eA212Fa405E',
          '0x04B2A6E51272c82932ecaB31A5Ab5aC32AE168C3',
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
