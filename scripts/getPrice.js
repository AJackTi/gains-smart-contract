const hre = require('hardhat');
require('dotenv').config();
const contractAddr =
  require('../deployments/mumbai/GNSPriceAggregatorV6_4.json').address;
const tradingStorageAddr =
  require('../deployments/mumbai/GFarmTradingStorageV5.json').address;
const pairStorageAddr =
  require('../deployments/mumbai/GNSPairsStorageV6.json').address;

async function main() {
  const accounts = await hre.ethers.getSigners();

  const tradingStorage = await hre.ethers.getContractAt(
    'GFarmTradingStorageV5',
    tradingStorageAddr
  );

  // const signed = tradingStorage.connect(accounts[0]);
  // await signed.setPriceAggregator(contractAddr);

  const aggParam = await tradingStorage.priceAggregator();
  console.log('aggParam', aggParam);

  const pairStorage = await hre.ethers.getContractAt(
    'GNSPairsStorageV6',
    pairStorageAddr
  );

  console.log('current order id', await pairStorage.currentOrderId());

  try {
    const res = await pairStorage.pairJob(0);
    console.log('pairjob ok', res);
  } catch (e) {
    console.error('pair an loz', e);
  }

  const contract = await hre.ethers.getContractAt(
    'GNSPriceAggregatorV6_4',
    contractAddr
  );

  console.log('contract', contract.address);

  try {
    const signedContract = contract.connect(accounts[0]);
    const orderId = await signedContract.getPrice(0, 0, 0, 0);
    console.log('check', orderId);
  } catch (e) {
    console.error('duma', e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
