pragma solidity ^0.5.0;

import "./ShopFactory.sol";


/**
 * @title SKUTypeFactory
 * @notice Defines functions and events related to management of SKU Types
 */
contract SKUTypeFactory is ShopFactory {

    /**
     * @notice emitted upon the creation of a SKU Type
     */
    event NewSKUType(uint256 indexed shopId, uint256 skuTypeId, string name);

    /**
     * @notice Create an SKU (Shopkeeping Unit) Type for a Shop
     * @dev Can only be run by the shop owner
     */
    function createSKUType(
        uint256 _shopId,
        string calldata _name,
        string calldata _desc
    )
        external
        whenNotPaused
        onlyShopOwner(_shopId)
        returns(uint256)
    {
        // Get SKU Type ID
        uint256 skuTypeId = skuTypes.length;

        // Create and store SKU Type
        skuTypes.push(SKUType(_shopId, skuTypeId, _name, _desc));

        // Add SKU Type to Shop's SKU Type list
        shopSKUTypes[_shopId].push(skuTypeId);

        // Emit Event with name of the new SKU Type
        emit NewSKUType(_shopId, skuTypeId, _name);

        // Return the new SKU Type ID
        return skuTypeId;
    }

}