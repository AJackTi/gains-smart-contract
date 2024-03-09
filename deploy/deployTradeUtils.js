const { timeout } = require('../utils/delay');
const { createDeployFunction } = require('../utils/deploy');

const func = createDeployFunction({
  contractName: ['TradeUtils'],
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
