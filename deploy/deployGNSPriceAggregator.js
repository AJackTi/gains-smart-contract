const { timeout } = require('../utils/delay');
const { createDeployFunction } = require('../utils/deploy');

const constructorContracts = ['GFarmTradingStorageV5', 'GNSPairsStorageV6'];

const func = createDeployFunction({
  contractName: 'GNSPriceAggregatorV6_4',
  afterDeploy: async () => {
    await timeout(1500);
  },
  libraryNames: ['PackingUtils'],
  dependencyNames: constructorContracts,
  getDeployArgs: ({ dependencyContracts }) => [
    '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', // _linkToken
    // '0x683e310c5D675e896028dBC84E7A674E12341590', // _tokenDaiLp
    // 3600, // _twapInterval
    dependencyContracts['GFarmTradingStorageV5'].address,
    dependencyContracts['GNSPairsStorageV6'].address,
    '0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408', // _linkPriceFeed
    3, // _minAnswers
    ['0x98b40B4C65f6a007034e4F2377118D4B44dDcc39'], // _nodes
    [
      '0x3235656562353536636165343464366561303166623233363466616363613131',
      '0x3235656562353536636165343464366561303166623233363466616363613131',
    ], // _jobIds
  ],
});

module.exports = func;
