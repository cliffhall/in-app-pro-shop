pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/RBAC/RBAC.sol";
import "./ProShopBase.sol";


/**
 * @title AccessControl
 * @notice Role-based access control and related functions, function modifiers, and events
 */
contract AccessControl is RBAC, ProShopBase {

    /**
     * @dev constructor. Sets msg.sender as system admin by default
     */
    constructor() public {
        paused = true; // Start paused. un-paused after full migration
        addRole(msg.sender, ROLE_SYS_ADMIN);
    }

    /**
     * @dev event emitted when contract is upgraded
     */
    event ContractUpgrade(address newContract);

    /**
     * @dev event emitted when contract is paused
     */
    event ContractPaused();

    /**
     * @dev event emitted when contract is un-npaused
     */
    event ContractUnpaused();

    /**
     * @dev state variable indicating whether the contract is paused
     */
    bool public paused = false;

    /**
     * Set in case the contract is broken and an upgrade is required
     */
    address public newContractAddress;

    /**
     * Role name for administrator of entire system
     */
    string public constant ROLE_SYS_ADMIN = "role/system-admin";

    /**
     * Role name for shop owners.
     */
    string public constant ROLE_SHOP_OWNER = "role/shop-owner";

    /**
     * @dev modifier to scope access to system administrator
     */
    modifier onlySysAdmin() {
        checkRole(msg.sender, ROLE_SYS_ADMIN);
        _;
    }

    /**
     * @dev modifier to scope access to owner of given shop
     */
    modifier onlyShopOwner(uint256 _shopId) {
        checkRole(msg.sender, ROLE_SHOP_OWNER);
        address owner = shopToOwner[_shopId];
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(paused);
        _;
    }

    /**
     * @dev Used to mark the smart contract as upgraded, in case there is a serious
     *      breaking bug. This method only keeps track of the new contract and emits
     *      a message indicating that the new address is set. It's up to clients of
     *      contract to update to the new contract address in that case.
     *      This contract will be paused indefinitely if such an upgrade takes place.
     *
     * @param _newAddress address of new contract
     */
    function setNewAddress(address _newAddress) external onlySysAdmin whenPaused {
        newContractAddress = _newAddress;
        emit ContractUpgrade(_newAddress);
    }

    /**
     * @dev called by the system administrator to pause, triggers stopped state
     */
    function pause() public onlySysAdmin whenNotPaused {
        paused = true;
        emit ContractPaused();
    }

    /**
     * @dev called by the ystem administrator to un-pause, returns to normal state
     */
    function unpause() public onlySysAdmin whenPaused {
        paused = false;
        emit ContractUnpaused();
    }

}