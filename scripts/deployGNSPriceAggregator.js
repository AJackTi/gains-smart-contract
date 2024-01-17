const { timeout } = require("../utils/delay");
const { createDeployFunction } = require("../utils/deploy");

const func = createDeployFunction({
  contractName: "GNSPriceAggregatorV6_4",
  afterDeploy: async () => {
    await timeout(1500);
  },
  getDeployArgs: () => [
    "0x8FC77E1D377d96f7c9544469544212DE8F898B86",
    "0x00452D19BaB509CA779b19A73b1F363530B06b07",
    "0x6d5689Ad4C1806D1BA0c70Ab95ebe0Da6B204fC5",
    3,
    ["0x0ba974ec0B54D33Ef0302c248b7A5BAc980FCbaD"],
    ["0x3166336165303963366139313439656139623432663339393238366435326534", "0x3166336165303963366139313439656139623432663339393238366435326535"]
  ],
});

module.exports = func;

