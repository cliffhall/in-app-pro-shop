pragma solidity ^0.4.24;

import "./ProShopBase.sol";


contract ItemFactory is ProShopBase {

    event NewItem(uint shopId, uint itemId, string name);

    Item[] public items;
    mapping (uint => address) public itemToOwner;
    mapping (address => uint) public ownerItemCount;

    function createItem(address _owner,
                        uint _shopId,
                        string _itemType,
                        string _name,
                        string _desc,
                        bool _consumable ) public {
        uint itemId = items.length;
        Item memory item = Item(_owner, _shopId, itemId, _itemType, _name, _desc, _consumable, false);
        items.push(item);
        addTokenTo(msg.sender, itemId);
        itemToOwner[itemId] = msg.sender;
        ownerItemCount[msg.sender]++;
        emit NewItem(_shopId, itemId, _name);
    }

    function getItemName(uint _itemId) public view returns (string) {
        return items[_itemId].name;
    }

}