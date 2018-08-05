pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol";


contract ItemFactory is ERC721BasicToken {

    event NewItem(uint itemId, string name);

    struct Item {
        uint id;
        string name;
    }

    Item[] public items;
    mapping (uint => address) public itemToOwner;
    mapping (address => uint) public ownerItemCount;

    function createItem(string _name) public {
        uint id = items.length;
        items.push(Item(id, _name));
        addTokenTo(msg.sender, id);
        itemToOwner[id] = msg.sender;
        ownerItemCount[msg.sender]++;
        emit NewItem(id, _name);
    }

    function getItemName(uint _id) public view returns (string) {
        return items[_id].name;
    }

}