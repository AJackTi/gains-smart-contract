// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

/**
 * @custom:version 7
 */
interface IAddressStoreUtils {
    /**
     * Global
     */
    enum Role {
        ROLES_MANAGER, // timelock
        GOV,
        MANAGER,
        TRADING,
        CALLBACKS,
        AGGREGATOR
    }

    struct Addresses {
        address gns; // GNS token address
    }

    struct AddressStore {
        Addresses globalAddresses;
        mapping(address => mapping(Role => bool)) accessControl;
        uint256[48] __gap;
    }

    error WrongSlot();
    error InitError();
    error InvalidInputLength();
    error NotAllowed();
    error WrongAccess();

    event AddressesUpdated(Addresses addresses);
    event AccessControlUpdated(address target, Role role, bool access);

    function hasRole(address _account, Role _role) external view returns (bool);
}