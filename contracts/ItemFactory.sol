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
        uint256 _skuId
    )
        public
        payable
        returns (uint256)
    {
        // Make sure the item can be minted
        require(canMintItem(_skuId) == true);

        // Make sure enough Ether has been sent
        require(msg.value == skus[_skuId].price);

        // TODO Split payment between franchise and shop owner

        // Get the item id
        uint256 itemId = items.length;

        // Get the owner address
        address owner = msg.sender;

        // Get the SKU Type
        uint256 skuTypeId = skus[_skuId].skuTypeId;

        // Create and store Item
        items.push(Item(owner, _shopId, itemId, skuTypeId, _skuId, false));

        // Map the Item ID to the Shop
        itemToShop[itemId] = _shopId;

        // Add the item to the Shop's list of Items minted
        shopItems[_shopId].push(itemId);

        // Add the item to the SKU's list of Items minted
        skuItems[_skuId].push(itemId);

        // Mint the token
        super._mint(owner, itemId);

        // Emit event with the name of the new Item
        emit NewItem(_shopId, itemId, getItemName(itemId));

        // Return the new Item ID
        return itemId;
    }

    function canMintItem(uint256 _skuId) public view returns (bool) {
        return (!skus[_skuId].limited || (getSKUItemCount(_skuId) < skus[_skuId].limit));
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

    /**
     * @notice Get the count of minted Items associated with a given Shop
     */
    function getShopItemCount(uint256 _shopId) public view returns (uint256) {
        return shopItems[_shopId].length;
    }

    /**
     * @notice Get the count of minted Items associated with a given SKU
     */
    function getSKUItemCount(uint256 _skuId) public view returns (uint256) {
        return skuItems[_skuId].length;
    }
}