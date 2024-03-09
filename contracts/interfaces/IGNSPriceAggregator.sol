// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./IGNSMultiCollatDiamond.sol";
import "./IChainlinkFeed.sol";
import "./IGNSTradingCallbacks.sol";
import "./IGNSMultiCollatDiamond.sol";

/**
 * @custom:version 7
 */
interface IGNSPriceAggregator {
    enum OrderType {
        MARKET_OPEN,
        MARKET_CLOSE,
        LIMIT_OPEN,
        LIMIT_CLOSE
    }

    struct Order {
        uint16 pairIndex;
        uint112 linkFeePerNode;
        OrderType orderType;
        bool active;
        bool isLookback;
    }

    struct LookbackOrderAnswer {
        uint64 open;
        uint64 high;
        uint64 low;
        uint64 ts;
    }

    function getPrice(uint256, OrderType, uint256, uint256) external returns (uint256);

    function tokenPriceDai() external returns (uint256);

    function linkFee(uint256, uint256) external view returns (uint256);

    function linkUsdPriceFeed() external view returns (IChainlinkFeed);

    function collateralUsdPriceFeed() external view returns (IChainlinkFeed);

    function nodes(uint256 index) external view returns (address);

    function getCollateralPriceUsd() external view returns (uint256);

    function getUsdNormalizedValue(uint256 collateralValue) external view returns (uint256);

    function getTokenPriceUsd() external view returns (uint256);

    function getTokenPriceUsd(uint256 tokenPriceCollateral) external view returns (uint256);

    function getCollateralFromUsdNormalizedValue(uint256 normalizedValue) external view returns (uint256);

    event PairsStorageUpdated(address value);
    event LinkPriceFeedUpdated(address value);
    event CollateralPriceFeedUpdated(address value);

    event MinAnswersUpdated(uint256 value);

    event NodeAdded(uint256 index, address value);
    event NodeReplaced(uint256 index, address oldNode, address newNode);
    event NodeRemoved(uint256 index, address oldNode);

    event JobIdUpdated(uint256 index, bytes32 jobId);

    event PriceRequested(
        uint256 indexed orderId,
        bytes32 indexed job,
        uint256 indexed pairIndex,
        OrderType orderType,
        uint256 nodesCount,
        uint256 linkFeePerNode,
        uint256 fromBlock,
        bool isLookback
    );

    event PriceReceived(
        bytes32 request,
        uint256 indexed orderId,
        address indexed node,
        uint16 indexed pairIndex,
        uint256 price,
        uint256 referencePrice,
        uint112 linkFee,
        bool isLookback,
        bool usedInMedian
    );

    event CallbackExecuted(IGNSTradingCallbacks.AggregatorAnswer a, OrderType orderType);
}