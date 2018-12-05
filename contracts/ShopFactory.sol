pragma solidity ^0.4.24;

import "./AccessControl.sol";


/**
 * @title ShopFactory
 * @notice Defines functions and events related to management of Shops
 */
contract ShopFactory is AccessControl {

    /**
     * @dev emitted upon creation of a shop
     * @return uint256 shopId
     */
    event NewShop(address indexed owner, uint256 shopId, string name);

    /**
     * @notice Create a Shop
     */
    function createShop(
        string _name,
        string _desc,
        string _fiat
    )
        public
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

        // Give the owner the ROLE_SHOP_OWNER role
        addRole(owner, ROLE_SHOP_OWNER);

        // Send an event with the name of the new shop
        emit NewShop(owner, shopId, _name);

        // Return the new Shop ID
        return shopId;
    }


    // @notice Get the list of Shop Ids associated with a given Owner
    function getShopIds(address _owner) public view returns (uint[] memory) {
        return ownedShops[_owner];
    }

    // @notice Get a Shop's properties by ID
    function getShop(uint256 _shopId) public view returns (address, uint256, string, string, string) {
        require(_shopId <= shops.length);
        return (shops[_shopId].owner, shops[_shopId].shopId, shops[_shopId].name, shops[_shopId].description, shops[_shopId].fiat );
    }

}