// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface IOpenTradesPnlFeed {
    function nextEpochValuesRequestCount() external view returns (uint);

    function newOpenPnlRequestOrEpoch() external;
}