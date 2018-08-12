pragma solidity ^0.4.24;

import "./SKUFactory.sol";


contract ItemFactory is SKUFactory {

    /**
     * @notice emitted upon the creation of an Item
     */
    event NewItem(uint256 shopId, uint256 itemId, string name);

    /**
     * @notice Create an Item
     */
    function createItem(
        uint256 _shopId,
        uint256 _skuTypeId,
        string _name,
        string _desc,
        bool _consumable
    )
        public
    {
        uint256 itemId = items.length; // TODO: make id unique
        address owner = msg.sender;
        items.push(Item(owner, _shopId, itemId, _skuTypeId, _name, _desc, _consumable, false));
        addTokenTo(owner, itemId);
        itemToShop[itemId] = _shopId;
        itemToOwner[itemId] = owner;
        ownerItemCount[owner]++; // TODO: use SafeMath
        emit NewItem(_shopId, itemId, _name);
    }

    /**
     * @notice Get the Item name associated with a given Item id
     */
    function getItemName(uint256 _itemId) public view returns (string) {
        return items[_itemId].name;
    }

}