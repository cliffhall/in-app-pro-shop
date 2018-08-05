pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol";


contract ShopFactory is ERC721BasicToken {

    event NewShop(uint shopId, string name);

    struct Shop {
        uint id;
        string name;
    }

    Shop[] public shops;
    mapping (uint => address) public shopToOwner;

    function createShop(string _name) public {
        uint id = shops.length;
        shops.push(Shop(id, _name));
        addTokenTo(msg.sender, id);
        shopToOwner[id] = msg.sender;
        emit NewShop(id, _name);
    }

    function getShopName(uint _id) public view returns (string) {
        return shops[_id].name;
    }
}