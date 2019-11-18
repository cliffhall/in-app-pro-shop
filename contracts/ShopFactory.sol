pragma solidity ^0.5.13;

import "./StockRoomBase.sol";


/**
 * @title ShopFactory
 * @notice Defines functions and events related to management of Shops
 */
contract ShopFactory is StockRoomBase {

    /**
     * @dev emitted upon creation of a shop
     * @return uint256 shopId
     */
    event NewShop(address indexed owner, uint256 shopId, string name);

    /**
     * @notice Create a Shop
     */
    function createShop(
        string calldata _name,
        string calldata _desc,
        string calldata _fiat
    )
        external
        whenNotPaused
        returns (uint256)
    {
        // Get Shop ID and owner address
        uint256 shopId = shops.length;
        address owner = msg.sender;

        // Create and store Shop
        shops.push(Shop(owner, shopId, _name, _desc, _fiat));

        // Map Shop ID to owner address
        shopToOwner[shopId] = owner;

        // Add Shop ID to Owner's Shops list
        ownedShops[owner].push(shopId);

        // Give the shopOwners role to the owner
        if (!shopOwners.has(owner))shopOwners.add(owner);

        // Send an event with the name of the new shop
        emit NewShop(owner, shopId, _name);

        // Return the new Shop ID
        return shopId;
    }

}