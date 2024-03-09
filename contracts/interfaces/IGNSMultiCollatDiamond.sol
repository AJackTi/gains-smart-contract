// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./libraries/IAddressStoreUtils.sol";
import "./libraries/IPairsStorageUtils.sol";
import "./libraries/IReferralsUtils.sol";
import "./libraries/IFeeTiersUtils.sol";
import "./libraries/IPriceImpactUtils.sol";

/**
 * @custom:version 7
 */
interface IGNSMultiCollatDiamond is
    IAddressStoreUtils,
    IPairsStorageUtils,
    IReferralsUtils,
    IFeeTiersUtils,
    IPriceImpactUtils
{}