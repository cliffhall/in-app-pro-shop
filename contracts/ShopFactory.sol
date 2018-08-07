pragma solidity ^0.4.24;

import "./ProShopBase.sol";


/**
 * Functionality related to maintaining shops
 */
contract ShopFactory is ProShopBase {

    /**
     * @dev emitted upon creation of a shop
     */
    event NewShop(uint shopId, string name);

    /**
     * @notice Create a Shop
     */
    function createShop(string _name, string _desc) public {
        uint shopId = shops.length;
        address owner = msg.sender;
        shops.push(Shop(owner, shopId, _name, _desc));
        shopToOwner[shopId] = owner;
        emit NewShop(shopId, _name);
    }

    /**
     * Get the Shop name associated with a given Shop id
     */
    function getShopName(uint _shopId) public view returns (string) {
        return shops[_shopId].name;
    }



}