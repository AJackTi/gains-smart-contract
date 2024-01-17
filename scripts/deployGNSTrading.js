const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GNSTradingV6_4_1",
  afterDeploy: async () => {
    await timeout(1500);
  },
  getDeployArgs: () => [
    "0xAf795d16A42aaD62265c1534804Ef4a78F68f33b", 
    "0x13E8290AADc515f9A8e79e41ad4cb09a084F9Ae8", 
    "0x55411C63549dC4EFA7cD18D746DbE7aa060BDD34", 
    "0x9B3e63e446269fD5362510D0a2aF57bCdd072baA",
    "0xa4f8a0565f4FCc93F0A3E2bb3104926365eB4Be9",
    100000000000000000000000,
    30
],
});

module.exports = func;
