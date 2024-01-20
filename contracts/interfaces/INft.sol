// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

pragma solidity 0.8.7;

interface INft is IERC721 {
    function mint(address to, uint tokenId) external;

    function burn(uint tokenId) external;
}