// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./IERC20.sol";

/**
 * @custom:version 7
 */
library CollateralUtils {
    struct CollateralConfig {
        uint128 precision;
        uint128 precisionDelta;
    }

    /**
     * @dev Calculates `precision` (10^decimals) and `precisionDelta` (precision difference
     * between 18 decimals and `token` decimals) of a given IERC20 `token`
     *
     * Notice: not compatible with tokens with more than 18 decimals
     */
    function getCollateralConfig(address _token) internal view returns (CollateralConfig memory _meta) {
        uint256 _decimals = uint256(IERC20(_token).decimals());

        _meta.precision = uint128(10 ** _decimals);
        _meta.precisionDelta = uint128(10 ** (18 - _decimals));
    }
}