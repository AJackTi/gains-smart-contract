const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const constructorContracts = ["Owner"];

const func = createDeployFunction({
  contractName: "GainsNetworkToken",
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);
  },
  getDeployArgs: async ({ dependencyContracts }) => {
    return constructorContracts.map(
      (dependencyName) => dependencyContracts[dependencyName].value
    );
  },
});

module.exports = func;
