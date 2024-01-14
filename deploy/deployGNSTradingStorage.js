const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GFarmTradingStorageV5",
  afterDeploy: async () => {
    await timeout(1500);
  },
});

module.exports = func;
