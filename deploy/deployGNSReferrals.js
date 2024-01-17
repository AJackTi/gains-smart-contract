const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GNSReferralsV6_2",
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);
  },
  getDeployArgs: () => [
    "0x8a28637be34be5c3BBdF893be8B8A387C2843cbc",
    10,
    33,
    50,
    10000000,
  ],
});

module.exports = func;
