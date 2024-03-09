// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

/**
 * @custom:version 7
 */
interface IFeeTiersUtils {
    /**
     * Fee tiers storage
     */
    struct FeeTiersStorage {
        FeeTier[8] feeTiers;
        mapping(uint256 => uint256) groupVolumeMultipliers; // groupIndex (pairs storage) => multiplier (1e3)
        mapping(address => TraderInfo) traderInfos; // trader => TraderInfo
        mapping(address => mapping(uint32 => TraderDailyInfo)) traderDailyInfos; // trader => day => TraderDailyInfo
        uint256[39] __placeholder;
    }

    struct FeeTier {
        uint32 feeMultiplier; // 1e3
        uint32 pointsThreshold;
    }

    struct TraderInfo {
        uint32 lastDayUpdated;
        uint224 trailingPoints; // 1e18 | 1e6
    }

    struct TraderDailyInfo {
        uint32 feeMultiplierCache; // 1e3
        uint224 points; // 1e18 | 1e6
    }

    function updateTraderPoints(address trader, uint256 volumeUsd, uint256 pairIndex) external;
    function calculateFeeAmount(address trader, uint256 normalFeeAmount) external view returns (uint256);

    event GroupVolumeMultipliersUpdated(uint256[] groupIndices, uint256[] groupVolumeMultipliers);
    event FeeTiersUpdated(uint256[] feeTiersIndices, IFeeTiersUtils.FeeTier[] feeTiers);

    event TraderDailyPointsIncreased(address indexed trader, uint32 indexed day, uint224 points);
    event TraderInfoFirstUpdate(address indexed trader, uint32 day);
    event TraderTrailingPointsExpired(address indexed trader, uint32 fromDay, uint32 toDay, uint224 amount);
    event TraderInfoUpdated(address indexed trader, IFeeTiersUtils.TraderInfo traderInfo);
    event TraderFeeMultiplierCached(address indexed trader, uint32 indexed day, uint32 feeMultiplier);
}