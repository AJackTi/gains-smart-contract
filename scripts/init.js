const addPair = require('./addPair.js');
const initOracleRewards = require('./initOracleRewards.js');
const setPairParams = require('./setPairParams.js');
const setTradingStorageParams = require('./setTradingStorageParams.js');
const setupRoles = require('./setupRoles.js');

async function main() {
  await addPair();
  await setPairParams();
  await setupRoles();

  await initOracleRewards();
  await setTradingStorageParams();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
