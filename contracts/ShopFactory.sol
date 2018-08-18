pragma solidity ^0.4.24;

import "./AccessControl.sol";


/**
 * Functionality related to maintaining shops
 */
contract ShopFactory is AccessControl {

    /**
     * @dev emitted upon creation of a shop
     * @return uint256 shopId
     */
    event NewShop(uint256 shopId, string name);

    /**
     * @notice Create a Shop
     */
    function createShop(
        string _name,
        string _desc
    )
        public
        returns (uint256)
    {
        // Get Shop ID and owner address
        uint256 shopId = shops.length;
        address owner = msg.sender;

        // Create and store Shop
        shops.push(Shop(owner, shopId, _name, _desc));

        // Map Shop ID to owner address
        shopToOwner[shopId] = owner;

        // Add Shop ID to Owner's Shops list
        ownedShops[owner].push(shopId);

        // Give the owner the ROLE_SHOP_OWNER role
        addRole(owner, ROLE_SHOP_OWNER);

        // Send an event with the name of the new shop
        emit NewShop(shopId, _name);

        // Return the new Shop ID
        return shopId;
    }

    /**
     * @notice Get the Shop name associated with a given Shop id
     */
    function getShopName(uint256 _shopId) public view returns (string) {
        return shops[_shopId].name;
    }

    /**
     * @notice Get the count of Shops associated with a given Owner
     */
    function getShopCount(address _owner) public view returns (uint256) {
        return ownedShops[_owner].length;
    }
}