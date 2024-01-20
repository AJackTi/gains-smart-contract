// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
pragma abicoder v2;

interface CallbacksInterfaceV6_4 {
    struct AggregatorAnswer {
        uint orderId;
        uint price;
        uint spreadP;
        uint open;
        uint high;
        uint low;
    }

    function openTradeMarketCallback(AggregatorAnswer memory) external;

    function closeTradeMarketCallback(AggregatorAnswer memory) external;

    function executeNftOpenOrderCallback(AggregatorAnswer memory) external;

    function executeNftCloseOrderCallback(AggregatorAnswer memory) external;
}