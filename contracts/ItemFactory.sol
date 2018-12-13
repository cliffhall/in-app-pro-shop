pragma solidity ^0.4.24;

import "./ProShopBase.sol";


/**
 * @title ItemFactory
 * @notice Defines factory and events related to saleable Items (ERC721 tokens)
 */
contract ItemFactory is ProShopBase {

    /**
     * @notice emitted upon the creation of an Item
     */
    event NewItem(
        uint256 indexed shopId,
        uint256 indexed skuId,
        uint256 itemId,
        uint256 amount,
        uint256 fee,
        uint256 net
    );

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
        require(stockRoom.canMintItem(_skuId, skuItems[_skuId].length) == true);

        // Make sure enough Ether has been sent
        require(msg.value == stockRoom.getItemPriceInEther(_skuId));

        // Calculate and store the franchise fee
        uint256 franchiseFee = msg.value.div(franchiseFeePercent);
        franchiseBalance = franchiseBalance.add(franchiseFee);

        // Calculate and store the Shop's net sale amount
        uint256 shopNetSale = msg.value.sub(franchiseFee);
        shopBalances[_shopId] = shopBalances[_shopId].add(shopNetSale);

        // Get the item id
        uint256 itemId = items.length;

        // Get the owner address
        address owner = msg.sender;

        // Create and store Item
        items.push(Item(owner, _shopId, itemId, _skuId, false));

        // Add Item ID to Owner's Items list
        ownedItems[owner].push(itemId);

        // Add the item to the Shop's list of Items minted
        shopItems[_shopId].push(itemId);

        // Add the item to the SKU's list of Items minted
        skuItems[_skuId].push(itemId);

        // Mint the token
        super._mint(owner, itemId);

        // Emit event with the name of the new Item
        emit NewItem(_shopId, _skuId, itemId, msg.value, franchiseFee, shopNetSale);

        // Return the new Item ID
        return itemId;
    }

}