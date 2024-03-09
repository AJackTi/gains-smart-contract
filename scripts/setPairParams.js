const addr = require('../deployments/mumbai/GNSPairInfosV6_1.json').address;

async function setPairParams() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    'GNSPairInfosV6_1',
    addr,
    owner
  );

  console.info('Setting GNSPairInfosV6_1 params...');
  console.info('Submitting setManager transaction...');
  const setManagerTx = await contract.setManager(owner.address);
  console.info('Waiting setManager to complete...');
  await hre.ethers.provider.waitForTransaction(setManagerTx.hash);
  console.info('setManager completed.');

  console.info('Submitting setPairParams transaction...');
  const tx = await contract.setPairParams(0, [0, 0, 0, 0]);
  console.info('Waiting setPairParams to complete...');
  await hre.ethers.provider.waitForTransaction(tx.hash);
  console.info('setPairParams completed.');
}

module.exports = setPairParams;
