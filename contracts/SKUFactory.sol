pragma solidity ^0.5.13;

import "./SKUTypeFactory.sol";


/**
 * @title SKUFactory
 * @notice Defines functions and events related to management of SKUs
 */
contract SKUFactory is SKUTypeFactory {

    /**
     * @notice emitted upon the creation of a SKU
     */
    event NewSKU(uint256 indexed shopId, uint256 skuId, string name);

    /**
     * @notice Create an SKU (Shopkeeping Unit) for a Shop
     * @dev Can only be run by shop owner
     */
    function createSKU(
        uint256 _shopId,
        uint256 _skuTypeId,
        uint256 _price,
        string memory _name,
        string memory _desc,
        bool _consumable,
        bool _limited,
        uint256 _limit
    )
        public
        whenNotPaused
        onlyShopOwner(_shopId)
        returns(uint256)
    {
        // SKUs must have a non-zero price
        require(_price > 0);

        // Get SKU ID
        uint256 skuId = skus.length;

        // Create and store SKU Type
        skus.push(SKU(_shopId, skuId, _skuTypeId, _price, _name, _desc, _consumable, _limited, _limit));

        // Add SKU to Shop's SKU list
        shopSKUs[_shopId].push(skuId);

        // Add SKU ID to SKU Type's SKU list
        skuTypeSKUs[_skuTypeId].push(skuId);

        // Emit Event with name of the new SKU
        emit NewSKU(_shopId, skuId, _name);

        // Return the new SKU ID
        return skuId;
    }

}