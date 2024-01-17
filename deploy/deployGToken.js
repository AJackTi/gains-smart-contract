const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");


const func = createDeployFunction({
  contractName: "GTokenV6_3_2",
  afterDeploy: async () => {
    await timeout(1500);
  },
});

module.exports = func;
