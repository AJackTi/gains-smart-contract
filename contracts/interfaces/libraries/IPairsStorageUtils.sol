// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

/**
 * @custom:version 7
 */
interface IPairsStorageUtils {
    struct PairsStorage {
        mapping(uint256 => Pair) pairs;
        mapping(uint256 => Group) groups;
        mapping(uint256 => Fee) fees;
        mapping(string => mapping(string => bool)) isPairListed;
        mapping(uint256 => uint256) pairCustomMaxLeverage;
        uint256 currentOrderId;
        uint256 pairsCount;
        uint256 groupsCount;
        uint256 feesCount;
        uint256[41] __placeholder;
    }

    enum FeedCalculation {
        DEFAULT,
        INVERT,
        COMBINE
    }
    struct Feed {
        address feed1;
        address feed2;
        FeedCalculation feedCalculation;
        uint256 maxDeviationP;
    } // PRECISION (%)

    struct Pair {
        string from;
        string to;
        Feed feed;
        uint256 spreadP; // PRECISION
        uint256 groupIndex;
        uint256 feeIndex;
    }

    struct Group {
        string name;
        bytes32 job;
        uint256 minLeverage;
        uint256 maxLeverage;
    }
    struct Fee {
        string name;
        uint256 openFeeP; // PRECISION (% of leveraged pos)
        uint256 closeFeeP; // PRECISION (% of leveraged pos)
        uint256 oracleFeeP; // PRECISION (% of leveraged pos)
        uint256 nftLimitOrderFeeP; // PRECISION (% of leveraged pos)
        uint256 minLevPosUsd; // 1e18 (collateral x leverage, useful for min fee)
    }

    event PairAdded(uint256 index, string from, string to);
    event PairUpdated(uint256 index);
    event PairCustomMaxLeverageUpdated(uint256 indexed index, uint256 maxLeverage);
    event GroupAdded(uint256 index, string name);
    event GroupUpdated(uint256 index);
    event FeeAdded(uint256 index, string name);
    event FeeUpdated(uint256 index);

    function pairJob(uint256) external returns (string memory, string memory, bytes32, uint256);

    function pairFeed(uint256) external view returns (Feed memory);

    function pairSpreadP(uint256) external view returns (uint256);

    function pairMinLeverage(uint256) external view returns (uint256);

    function pairMaxLeverage(uint256) external view returns (uint256);

    function pairOpenFeeP(uint256) external view returns (uint256);

    function pairCloseFeeP(uint256) external view returns (uint256);

    function pairOracleFeeP(uint256) external view returns (uint256);

    function pairNftLimitOrderFeeP(uint256) external view returns (uint256);

    function pairMinLevPosUsd(uint256) external view returns (uint256);

    function pairsCount() external view returns (uint256);
}