// const { addTradingContract } = require("../utils/trading");

const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

// const constructorContracts = ["GFarmTradingStorageV5"];

const func = createDeployFunction({
  contractName: "GFarmTradingStorageV5",
  // dependencyNames: constructorContracts,
  afterDeploy: async ({
    deployedContract,
    getNamedAccounts,
    deployments,
    network,
  }) => {
    await timeout(1500);

    // let result = constructorContracts.map(
    //   (dependencyName) => dependencyContracts[dependencyName].address
    // );
    // console.log("result: ", result);
    // await addTradingContract(deployedContract.address);
  },
});

module.exports = func;
