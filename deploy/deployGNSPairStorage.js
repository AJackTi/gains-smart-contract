const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const constructorContracts = ["GFarmTradingStorageV5"];

const func = createDeployFunction({
  contractName: "GNSPairsStorageV6",
  dependencyNames: constructorContracts,
  getDeployArgs: async ({ dependencyContracts }) => {
    return [1].concat(
      constructorContracts.map(
        (dependencyName) => dependencyContracts[dependencyName].address
      )
    );
  },
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
