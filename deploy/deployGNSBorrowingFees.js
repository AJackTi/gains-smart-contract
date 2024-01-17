const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");


const func = createDeployFunction({
  contractName: "GNSBorrowingFeesV6_4",
  afterDeploy: async () => {
    await timeout(1500);
  },
});

module.exports = func;
