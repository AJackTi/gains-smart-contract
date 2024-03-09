// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

/**
 * @custom:version 7
 */
interface IPriceImpactUtils {
    struct PriceImpactStorage {
        OiWindowsSettings oiWindowsSettings;
        mapping(uint48 => mapping(uint256 => mapping(uint256 => PairOi))) windows; // duration => pairIndex => windowId => Oi
        mapping(uint256 => PairDepth) pairDepths; // pairIndex => depth (USD)
        uint256[47] __gap;
    }

    struct OiWindowsSettings {
        uint48 startTs;
        uint48 windowsDuration;
        uint48 windowsCount;
    }

    struct PairOi {
        uint128 oiLongUsd; // 1e18 USD
        uint128 oiShortUsd; // 1e18 USD
    }

    struct OiWindowUpdate {
        uint48 windowsDuration;
        uint256 pairIndex;
        uint256 windowId;
        bool long;
        uint128 openInterestUsd; // 1e18 USD
    }

    struct PairDepth {
        uint128 onePercentDepthAboveUsd; // USD
        uint128 onePercentDepthBelowUsd; // USD
    }

    event OiWindowsSettingsInitialized(uint48 indexed windowsDuration, uint48 indexed windowsCount);
    event PriceImpactWindowsCountUpdated(uint48 indexed windowsCount);
    event PriceImpactWindowsDurationUpdated(uint48 indexed windowsDuration);
    event PriceImpactOpenInterestAdded(OiWindowUpdate oiWindowUpdate);
    event PriceImpactOpenInterestRemoved(OiWindowUpdate oiWindowUpdate, bool notOutdated);
    event PriceImpactOiTransferredPairs(
        uint256 pairsCount,
        uint256 prevCurrentWindowId,
        uint256 prevEarliestWindowId,
        uint256 newCurrentWindowId
    );
    event PriceImpactOiTransferredPair(uint256 indexed pairIndex, PairOi totalPairOi);
    event OnePercentDepthUpdated(uint256 indexed pairIndex, uint128 valueAboveUsd, uint128 valueBelowUsd);

    function addPriceImpactOpenInterest(uint256 _openInterestUsd, uint256 _pairIndex, bool _long) external; // `_openInterest`: 1e18 USD

    function removePriceImpactOpenInterest(
        uint256 _openInterestUsd, // 1e18 USD
        uint256 _pairIndex,
        bool _long,
        uint48 _addTs
    ) external;

    function getTradePriceImpact(
        uint256 _openPrice, // PRECISION
        uint256 _pairIndex,
        bool _long,
        uint256 _tradeOpenInterestUsd // 1e18 USD
    )
        external
        view
        returns (
            uint256 priceImpactP, // PRECISION (%)
            uint256 priceAfterImpact // PRECISION
        );
}