const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GNSPairsStorageV6",
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);
  },
  getDeployArgs: () => [1, "0x8a28637be34be5c3BBdF893be8B8A387C2843cbc"],
});

module.exports = func;
