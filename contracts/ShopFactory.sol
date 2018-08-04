pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract ShopFactory is Ownable {

    event NewShop(bytes32 shopId, string name);

    struct Shop {
        bytes32 shopId;
        string name;
    }

    Shop[] public shops;
    mapping (bytes32 => address) public shopToOwner;

    function createShop(string _name) public {
        bytes32 id = keccak256(abi.encodePacked(_name, now));
        shops.push(Shop(id, _name));
        shopToOwner[id] = msg.sender;
        emit NewShop(id, _name);
    }
}