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
        uint256 _skuId,
        bool _consumable
    )
        public
        returns (uint256)
    {
        // Get the item id
        uint256 itemId = items.length;

        // Get the owner address
        address owner = msg.sender;

        // Get the SKU Type
        uint256 skuTypeId = skus[_skuId].skuTypeId;

        // Create and store Item
        items.push(Item(owner, _shopId, itemId, skuTypeId, _skuId, _consumable, false));

        // Mint the associated token
        super._mint(owner, itemId);

        // Map the Item ID to the Shop
        itemToShop[itemId] = _shopId;

        // Emit event with the name of the new Item
        emit NewItem(_shopId, itemId, getItemName(itemId));

        // Return the new Item ID
        return itemId;
    }

    /**
     * @notice Get the SKU name associated with a given Item id
     */
    function getItemName(uint256 _itemId) public view returns (string) {
        return getSKUName(items[_itemId].skuId);
    }

    /**
     * @notice Get the SKU type name associated with a given Item id
     */
    function getItemType(uint256 _itemId) public view returns (string) {
        return getSKUTypeName(items[_itemId].skuTypeId);
    }
}