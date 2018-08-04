pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract ItemFactory is Ownable {

    event NewItem(bytes32 itemId, string name);

    struct Item {
        bytes32 itemId;
        string name;
    }

    Item[] public items;
    mapping (bytes32 => address) public itemToOwner;
    mapping (address => uint) public ownerItemCount;

    function createItem(string _name) public {
        bytes32 id = keccak256(abi.encodePacked(_name, items.length, now));
        items.push(Item(id, _name));
        itemToOwner[id] = msg.sender;
        ownerItemCount[msg.sender]++;
        emit NewItem(id, _name);
    }
}