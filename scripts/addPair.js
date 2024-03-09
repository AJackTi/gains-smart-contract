const hre = require("hardhat");
const contractAddr =
  require("../deployments/mumbai/GNSPairsStorageV6.json").address;

async function addPair() {
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt(
    "GNSPairsStorageV6",
    contractAddr
  );
  const signedContract = contract.connect(owner);

  const txPromises = [];

  console.info("Submitting addGroup tx...");

  const addGroupTx = await signedContract.addGroup([
    "crypto",
    "0x3235656562353536636165343464366561303166623233363466616363613131",
    2,
    150,
    15,
  ]);

  console.info("Submitting addFee tx...");

  const addFeeTx = await signedContract.addFee([
    "crypto",
    300000000,
    600000000,
    60000000,
    200000000,
    1,
    "1500000000000000000000",
  ]);

  await ethers.provider.waitForTransaction(addGroupTx.hash);
  console.info("addGroup completed.");
  await ethers.provider.waitForTransaction(addFeeTx.hash),
    console.info("addFee completed.");

  console.info("Submitting addPair tx...");

  const addPairTx = await signedContract.addPair([
    "BTC",
    "USD",
    [
      "0x007A22900a3B98143368Bd5906f8E17e9867581b",
      "0x0000000000000000000000000000000000000000",
      0,
      200000000000,
    ],
    400000000,
    0,
    0,
  ]);

  await ethers.provider.waitForTransaction(addPairTx.hash);
  console.info("addPair completed.");
}

module.exports = addPair;
