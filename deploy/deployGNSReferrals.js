const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const constructorContracts = ["GFarmTradingStorageV5"];

const func = createDeployFunction({
  contractName: "GNSReferralsV6_2",
  dependencyNames: constructorContracts,
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);
  },
  getDeployArgs: async ({ dependencyContracts }) => {
    return constructorContracts
      .map((dependencyName) => dependencyContracts[dependencyName].address)
      .concat([10, 33, 50, 10000000]);
  },
});

module.exports = func;
