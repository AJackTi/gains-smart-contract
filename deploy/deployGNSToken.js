const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");
const { addMinterRole } = require("../utils/role");

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

    // await addMinterRole(deployedContract.address);
  },
  getDeployArgs: async ({ dependencyContracts }) => {
    return constructorContracts.map(
      (dependencyName) => dependencyContracts[dependencyName].value
    );
  },
});

module.exports = func;
module.exports.tags = ["gns_token"];
