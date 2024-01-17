const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const constructorContracts = ["GFarmTradingStorageV5"];

const func = createDeployFunction({
  contractName: "GNSPairInfosV6_1",
  afterDeploy: async () => {
    await timeout(1500);
  },
  getDeployArgs: () => ["0x60B0334FA0D05A6c69a0752B626Ea8D0bAf3f617"],
});

module.exports = func;
