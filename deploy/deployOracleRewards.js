const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GNSOracleRewardsV6_4_1",
  afterDeploy: async () => {
    await timeout(1500);
  },
});

module.exports = func;
