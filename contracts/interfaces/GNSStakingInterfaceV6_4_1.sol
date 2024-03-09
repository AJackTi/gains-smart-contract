// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface GNSStakingInterfaceV6_4_1 {
    // Structs
    struct User {
        uint128 stakedTokens; // 1e18
        uint128 debtDai; // 1e18
    }

    struct UnlockSchedule {
        uint128 totalTokens;
        uint128 claimedTokens;
        uint128 debtDai;
        uint48 start; // block.timestamp (seconds)
        uint48 duration; // in seconds
        bool revocable;
        UnlockType unlockType;
        uint16 __placeholder;
    }

    struct UnlockScheduleInput {
        uint128 totalTokens;
        uint48 start; // block.timestamp (seconds)
        uint48 duration; // in seconds
        bool revocable;
        UnlockType unlockType;
    }

    enum UnlockType {
        LINEAR,
        CLIFF
    }

    function govFund() external returns (address);

    function distributeRewardDai(uint amount) external;

    function createUnlockSchedule(UnlockScheduleInput memory schedule, address user) external;

    function getUnlockSchedules(address user) external view returns (UnlockSchedule[] memory schedules);

    function unlockedAmount(UnlockSchedule memory v, uint48 timestamp) external view returns (uint128 amount);

    function releasable(UnlockSchedule memory v, uint48 timestamp) external view returns (uint128 amount);
}