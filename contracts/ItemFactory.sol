pragma solidity ^0.4.24;

import "./ProShopBase.sol";


contract ItemFactory is ProShopBase {

    /**
     * @notice emitted upon the creation of an Item
     */
    event NewItem(uint shopId, uint itemId, string name);

    /**
     * @notice Create an Item
     */
    function createItem(uint _shopId,
                        string _itemType,
                        string _name,
                        string _desc,
                        bool _consumable ) public {
        uint itemId = items.length; // TODO: make id unique
        address owner = msg.sender;
        items.push(Item(owner, _shopId, itemId, _itemType, _name, _desc, _consumable, false));
        addTokenTo(owner, itemId);
        itemToShop[itemId] = _shopId;
        itemToOwner[itemId] = owner;
        ownerItemCount[owner]++; // TODO: use SafeMath
        emit NewItem(_shopId, itemId, _name);
    }

    /**
     * @notice Get the Item name associated with a given Item id
     */
    function getItemName(uint _itemId) public view returns (string) {
        return items[_itemId].name;
    }

}