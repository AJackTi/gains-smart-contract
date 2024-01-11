// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IGnsToken {
    function burn(address to, uint amount) external;

    function mint(address from, uint amount) external;
}