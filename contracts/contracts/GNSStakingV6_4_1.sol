// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../interfaces/GNSStakingInterfaceV6_4_1.sol";
import "../interfaces/TokenInterfaceV5.sol";

pragma solidity 0.8.7;

contract GNSStakingV6_4_1 is Initializable, GNSStakingInterfaceV6_4_1 {
    // Constants
    uint128 public constant MAX_UNLOCK_DURATION = 730 days; // 2 years in seconds
    uint128 public constant MIN_UNLOCK_TOKEN_AMOUNT = 1e18;

    // Contracts & Addresses
    address public override govFund;
    TokenInterfaceV5 public token; // GNS
    TokenInterfaceV5 public dai;

    // Pool state
    uint128 public accDaiPerToken;
    uint128 public tokenBalance;

    // Mappings
    mapping(address => User) public users;
    mapping(address => UnlockSchedule[]) public unlockSchedules;
    mapping(address => bool) public unlockManagers; // addresses allowed to create unlock schedules for others

    // Events
    event GovFundUpdated(address value);
    event UnlockManagerUpdated(address indexed manager, bool authorized);

    event DaiDistributed(uint amount);
    event DaiHarvested(address indexed user, uint128 amount);
    event DaiHarvestedFromUnlock(address indexed user, uint128 amount);

    event TokensStaked(address indexed user, uint128 amount);
    event TokensUnstaked(address indexed user, uint128 amount);
    event TokensClaimed(address indexed user, uint[] ids, uint128 amount);

    event UnlockScheduled(address indexed user, uint indexed index, UnlockSchedule schedule);
    event UnlockScheduleRevoked(address indexed user, uint indexed index);

    function initialize(address _govFund, TokenInterfaceV5 _token, TokenInterfaceV5 _dai) external initializer {
        require(_govFund != address(0) && address(_token) != address(0) && address(_dai) != address(0), "WRONG_PARAMS");

        govFund = _govFund;
        token = _token;
        dai = _dai;
    }

    //
    // Modifiers
    //

    modifier onlyGov() {
        require(msg.sender == govFund, "GOV_ONLY");
        _;
    }

    modifier onlyAuthorizedUnlockManager(address user) {
        require(user == msg.sender || msg.sender == govFund || unlockManagers[msg.sender], "NO_AUTH");
        _;
    }

    //
    // Management functions
    //

    function setGovFund(address value) external onlyGov {
        require(value != address(0), "ADDRESS_0");

        govFund = value;

        emit GovFundUpdated(value);
    }

    function setUnlockManager(address manager, bool authorized) external onlyGov {
        unlockManagers[manager] = authorized;

        emit UnlockManagerUpdated(manager, authorized);
    }

    //
    // Internal view functions
    //

    function _currentDebtDai(uint128 staked) internal view returns (uint128) {
        return uint128((uint(staked) * accDaiPerToken) / 1e18);
    }

    function _pendingDai(uint128 staked, uint128 debtDai) internal view returns (uint128) {
        return _currentDebtDai(staked) - debtDai;
    }

    function _pendingDai(UnlockSchedule memory v) internal view returns (uint128) {
        return _currentDebtDai(v.totalTokens - v.claimedTokens) - v.debtDai;
    }

    //
    // Public view functions
    //

    function unlockedAmount(UnlockSchedule memory v, uint48 timestamp) public pure override returns (uint128) {
        // if unlock schedule has ended return totalTokens
        if (timestamp >= v.start + v.duration) return v.totalTokens;

        // if unlock hasn't started or it's a cliff unlock return 0
        if (timestamp < v.start || v.unlockType == UnlockType.CLIFF) return 0;

        return uint128((uint(v.totalTokens) * (timestamp - v.start)) / v.duration);
    }

    function releasable(UnlockSchedule memory v, uint48 timestamp) public override pure returns (uint128) {
        return unlockedAmount(v, timestamp) - v.claimedTokens;
    }

    //
    // Internal state-modifying functions
    //

    function _harvestFromUnlock(address user, uint[] memory ids) internal {
        require(user != address(0), "USER_EMPTY");
        require(ids.length > 0, "IDS_EMPTY");

        uint128 pendingDai;

        for (uint i; i < ids.length; ) {
            UnlockSchedule storage v = unlockSchedules[user][ids[i]];

            uint128 newDebtDai = _currentDebtDai(v.totalTokens - v.claimedTokens);
            uint128 newRewardsDai = newDebtDai - v.debtDai;

            pendingDai += newRewardsDai;
            v.debtDai = newDebtDai;

            unchecked {
                ++i;
            }
        }

        dai.transfer(user, uint(pendingDai));

        emit DaiHarvestedFromUnlock(user, pendingDai);
    }

    function _claimUnlockedTokens(address user, uint48 timestamp, uint[] memory ids) internal {
        uint128 claimed;

        _harvestFromUnlock(user, ids);

        for (uint i; i < ids.length; ) {
            UnlockSchedule storage v = unlockSchedules[user][ids[i]];
            uint128 amount = releasable(v, timestamp);

            v.claimedTokens += amount;
            v.debtDai = _currentDebtDai(v.totalTokens - v.claimedTokens);

            claimed += amount;

            unchecked {
                ++i;
            }
        }

        tokenBalance -= claimed;
        token.transfer(user, uint(claimed));

        emit TokensClaimed(user, ids, claimed);
    }

    //
    // Public/External interaction functions
    //

    function distributeRewardDai(uint amount) override external {
        dai.transferFrom(msg.sender, address(this), amount);

        if (tokenBalance > 0) {
            accDaiPerToken += uint128((amount * 1e18) / uint(tokenBalance));
        }

        emit DaiDistributed(amount);
    }

    function harvest() public {
        User storage u = users[msg.sender];

        uint128 newDebtDai = _currentDebtDai(u.stakedTokens);
        uint128 pendingDai = uint128(newDebtDai - u.debtDai);

        u.debtDai = newDebtDai;
        dai.transfer(msg.sender, uint(pendingDai));

        emit DaiHarvested(msg.sender, pendingDai);
    }

    function harvestFromUnlock(uint[] calldata ids) external {
        _harvestFromUnlock(msg.sender, ids);
    }

    function harvestAll(uint[] calldata ids) external {
        harvest();
        _harvestFromUnlock(msg.sender, ids);
    }

    function stakeTokens(uint128 amount) external {
        User storage u = users[msg.sender];

        token.transferFrom(msg.sender, address(this), uint(amount));

        harvest();

        u.stakedTokens += amount;
        u.debtDai = _currentDebtDai(u.stakedTokens);

        tokenBalance += amount;

        emit TokensStaked(msg.sender, amount);
    }

    function unstakeTokens(uint128 amount) external {
        User storage u = users[msg.sender];

        harvest();

        u.stakedTokens -= amount;
        u.debtDai = _currentDebtDai(u.stakedTokens);

        tokenBalance -= amount;

        token.transfer(msg.sender, uint(amount));

        emit TokensUnstaked(msg.sender, amount);
    }

    function claimUnlockedTokens(uint[] memory ids) external {
        _claimUnlockedTokens(msg.sender, uint48(block.timestamp), ids);
    }

    function createUnlockSchedule(
        UnlockScheduleInput memory input,
        address user
    ) external override onlyAuthorizedUnlockManager(user) {
        require(input.duration > 0 && input.duration <= MAX_UNLOCK_DURATION, "INCORRECT_DURATION");
        require(input.totalTokens >= MIN_UNLOCK_TOKEN_AMOUNT, "INCORRECT_AMOUNT");
        require(user != address(0), "ADDRESS_0");

        uint128 totalTokens = input.totalTokens;

        // Requester has to pay the token amount
        token.transferFrom(msg.sender, address(this), uint(totalTokens));

        uint48 timestamp = uint48(block.timestamp);

        UnlockSchedule memory vs = UnlockSchedule({
            totalTokens: totalTokens,
            claimedTokens: 0,
            debtDai: _currentDebtDai(totalTokens),
            start: input.start >= timestamp ? input.start : timestamp, // accept time in the future
            duration: input.duration,
            unlockType: input.unlockType,
            revocable: input.revocable,
            __placeholder: 0
        });

        tokenBalance += totalTokens;
        unlockSchedules[user].push(vs);

        emit UnlockScheduled(user, unlockSchedules[user].length - 1, vs);
    }

    function revokeUnlockSchedule(address user, uint id) external onlyGov {
        UnlockSchedule storage v = unlockSchedules[user][id];
        require(v.revocable, "NOT_REVOCABLE");

        uint48 timestamp = uint48(block.timestamp);

        uint[] memory ids;
        ids[0] = id;

        // claim unlocked tokens and harvests pending rewards
        _claimUnlockedTokens(user, timestamp, ids);

        uint128 lockedAmount = v.totalTokens - v.claimedTokens;

        // reset unlockSchedule so no more claims are possible.
        // set start to timestamp if start is in the future. prevents div by 0 in releasable calculations
        v.totalTokens = v.claimedTokens;
        v.duration = 0;
        v.start = v.start > timestamp ? v.start : timestamp;
        v.debtDai = _currentDebtDai(v.totalTokens);

        tokenBalance -= lockedAmount;

        token.transfer(govFund, uint(lockedAmount));

        emit UnlockScheduleRevoked(user, id);
    }

    //
    // External view functions
    //

    function pendingRewardDai(address user) external view returns (uint128) {
        User memory u = users[user];

        return _pendingDai(u.stakedTokens, u.debtDai);
    }

    function pendingRewardDaiFromUnlocks(address user) external view returns (uint128) {
        uint128 pending;
        UnlockSchedule[] memory userUnlocks = unlockSchedules[user];

        for (uint i; i < userUnlocks.length; ) {
            pending += _pendingDai(userUnlocks[i]);

            unchecked {
                ++i;
            }
        }

        return pending;
    }

    function pendingRewardDaiFromUnlocks(address user, uint[] memory ids) external view returns (uint128) {
        uint128 pending;

        for (uint i; i < ids.length; ) {
            pending += _pendingDai(unlockSchedules[user][ids[i]]);

            unchecked {
                ++i;
            }
        }

        return pending;
    }

    function totalTokensStaked(address user) external view returns (uint128) {
        uint128 totalGns = users[user].stakedTokens;
        UnlockSchedule[] memory userUnlocks = unlockSchedules[user];

        for (uint i; i < userUnlocks.length; ) {
            UnlockSchedule memory v = userUnlocks[i];
            totalGns += v.totalTokens - v.claimedTokens;

            unchecked {
                ++i;
            }
        }

        return totalGns;
    }

    function getUnlockSchedules(address user) external override view returns (UnlockSchedule[] memory) {
        return unlockSchedules[user];
    }
}