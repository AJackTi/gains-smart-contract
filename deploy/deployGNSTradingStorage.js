// const { addTradingContract } = require("../utils/trading");
const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GFarmTradingStorageV5",
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);

    // await addTradingContract(deployedContract.address);
  },
});

module.exports = func;
