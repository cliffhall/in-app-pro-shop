pragma solidity ^0.4.24;

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
        string _name,
        string _desc
    )
        public
        onlyShopOwner(_shopId)
        returns(uint256)
    {
        // Get SKU Type ID
        uint256 skuTypeId = skuTypes.length;

        // Create and store SKU Type
        skuTypes.push(SKUType(_shopId, skuTypeId, _name, _desc));

        // Map SKU Type to Shop ID
        skuTypeToShop[skuTypeId] = _shopId;

        // Add SKU Type to Shop's SKU Type list
        shopSKUTypes[_shopId].push(skuTypeId);

        // Emit Event with name of the new SKU Type
        emit NewSKUType(_shopId, skuTypeId, _name);

        // Return the new SKU Type ID
        return skuTypeId;
    }

    /**
     * @notice Get the count of SKUs associated with a given SKU Type
     */
    function getSKUTypeSKUCount(uint256 _skuTypeId) public view returns (uint256) {
        return skuTypeSKUs[_skuTypeId].length;
    }

    // @notice Get the list of SKU Type Ids associated with a given Shop
    function getSKUTypeIds(uint256 _shopId) public view returns (uint[] memory) {
        return shopSKUTypes[_shopId];
    }

    // @notice Get a SKUTypes properties by ID
    function getSKUType(uint256 _skuTypeId) public view returns (uint256, uint256, string, string) {
        require(_skuTypeId <= skuTypes.length);
        SKUType memory skuType = skuTypes[_skuTypeId];
        return (
            skuType.shopId,
            skuType.skuTypeId,
            skuType.name,
            skuType.description
        );
    }
}