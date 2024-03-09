const tradingStorageAddr =
  require('../deployments/mumbai/GFarmTradingStorageV5.json').address;
const priceAggregatorAddr =
  require('../deployments/mumbai/GNSPriceAggregatorV6_4.json').address;
const tradingAddr =
  require('../deployments/mumbai/GNSTradingV6_4_1.json').address;
const callbacksAddr =
  require('../deployments/mumbai/GNSTradingCallbacksV6_4_1_Proxy.json').address;

async function setTradingStorageParams() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    'GFarmTradingStorageV5',
    tradingStorageAddr,
    owner
  );

  console.info('Setting GFarmTradingStorageV5 params...');
  console.info('Submitting setPriceAggregator transaction...');
  const setPriceAggregatorTx = await contract.setPriceAggregator(
    priceAggregatorAddr
  );
  console.info('Waiting for setPriceAggregator transaction...');
  await hre.ethers.provider.waitForTransaction(setPriceAggregatorTx.hash);
  console.info('setPriceAggregator completed.');

  console.info('Submitting setTrading transaction...');
  const setTradingTx = await contract.setTrading(tradingAddr);
  console.info('Waiting for setTrading transaction...');
  await hre.ethers.provider.waitForTransaction(setTradingTx.hash);
  console.info('setTrading completed.');

  console.info('Submitting setCallbacks transaction...');
  const setCallbacksTx = await contract.setCallbacks(tradingAddr);
  console.info('Waiting for setCallbacks transaction...');
  await hre.ethers.provider.waitForTransaction(setCallbacksTx.hash);
  console.info('setCallbacks completed.');

  console.info('Submitting addTradingContract transaction...');
  const addTradingContractTx = await contract.addTradingContract(tradingAddr);
  console.info('Waiting for addTradingContract transaction...');
  await hre.ethers.provider.waitForTransaction(addTradingContractTx.hash);
  console.info('addTradingContract completed.');
}

module.exports = setTradingStorageParams;
