const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const constructorContracts = ["Owner"];

const func = createDeployFunction({
  contractName: "GainsNetworkToken",
  afterDeploy: async () => {
    await timeout(1500);
  },
  getDeployArgs: async ({ dependencyContracts }) => {
    return constructorContracts.map(
      (dependencyName) => dependencyContracts[dependencyName].address
    );
  },
});

module.exports = func;
