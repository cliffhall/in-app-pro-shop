pragma solidity ^0.5.13;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title AccessControl
 * @notice Role-based access control and related functions, function modifiers, and events
 */
contract AccessControl {

    using SafeMath for uint256;
    using Roles for Roles.Role;

    Roles.Role internal admins;
    Roles.Role internal franchise;
    Roles.Role internal shopOwners;

    /**
     * @dev constructor. Sets msg.sender as system admin by default
     */
    constructor() public {
        paused = true; // Start paused. un-paused after full migration
        admins.add(msg.sender);
        franchise.add(msg.sender);
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
     * dev state variable indicating whether the contract has been upgraded
     */
    bool public upgraded = false;

    /**
     * @dev state variable indicating whether the contract is paused
     */
    bool public paused = false;

    /**
     * Set in case the contract is broken and an upgrade is required
     */
    address public newContractAddress;

    /**
     * @dev modifier to scope access to system administrator
     */
    modifier onlySysAdmin() {
        require(admins.has(msg.sender));
    _;
    }

    /**
     * @dev modifier to scope access to franchise owner
     */
    modifier onlyFranchiseOwner() {
        require(franchise.has(msg.sender));
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
     * @dev Modifier to make a function callable only when the contract not upgraded.
     */
    modifier whenNotUpgraded() {
        require(!upgraded);
        _;
    }

    /**
     * @dev called by a system administrator to  mark the smart contract as upgraded,
     *      in case there is a serious breaking bug. This method stores the new contract
     *      address and emits an event to that effect. Clients of the contract should
     *      update to the new contract address upon receiving this event.
     *
     *      This contract will remain paused indefinitely after such an upgrade.
     *
     * @param _newAddress address of new contract
     */
    function upgradeContract(address _newAddress) external onlySysAdmin whenPaused whenNotUpgraded {
        upgraded = true;
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
    function unpause() public onlySysAdmin whenPaused whenNotUpgraded {
        paused = false;
        emit ContractUnpaused();
    }

}