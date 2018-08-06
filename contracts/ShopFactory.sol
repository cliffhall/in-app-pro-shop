pragma solidity ^0.4.24;

import "./ItemFactory.sol";

contract ShopFactory is ItemFactory {

    event NewShop(uint shopId, string name);

    Shop[] public shops;
    mapping (uint => address) public shopToOwner;

    function createShop(address _owner,
                        string _name,
                        string _desc) public {
        uint shopId = shops.length;
        shops.push(Shop(_owner, shopId, _name, _desc));
        addTokenTo(msg.sender, shopId);
        shopToOwner[shopId] = msg.sender;
        emit NewShop(shopId, _name);
    }

    function getShopName(uint _shopId) public view returns (string) {
        return shops[_shopId].name;
    }
}