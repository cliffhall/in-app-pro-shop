pragma solidity ^0.4.24;

import "./ShopFactory.sol";


contract SKUFactory is ShopFactory {

    /**
     * @notice emitted upon the creation of a SKU
     */
    event NewSKU(uint256 shopId, uint256 skuId, string name);

    /**
     * @notice emitted upon the creation of a SKU Type
     */
    event NewSKUType(uint256 shopId, uint256 skuTypeId, string name);

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
        uint256 skuTypeId = skuTypes.length; // TODO: make id unique

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
     * @notice Create an SKU (Shopkeeping Unit) for a Shop
     * @dev Can only be run by shop owner
     */
    function createSKU(
        uint256 _shopId,
        uint256 _skuTypeId,
        uint256 _price,
        string _name,
        string _desc,
        bool _consumable,
        bool _limited,
        uint256 _limit
    )
        public
        onlyShopOwner(_shopId)
        returns(uint256)
    {
        // Get SKU ID
        uint256 skuId = skus.length;

        // Create and store SKU Type
        skus.push(SKU(_shopId, skuId, _skuTypeId, _price, _name, _desc, _consumable, _limited, _limit));

        // Map SKU to Shop
        skuToShop[skuId] = _shopId;

        // Add SKU to Shop's SKU list
        shopSKUs[_shopId].push(skuId);

        // Add SKU ID to SKU Type's SKU list
        skuTypeSKUs[_skuTypeId].push(skuId);

        // Emit Event with name of the new SKU
        emit NewSKU(_shopId, skuId, _name);

        // Return the new SKU ID
        return skuId;
    }

    /**
     * @notice Get the SKU Type name associated with a given SKU Type ID
     */
    function getSKUTypeName(uint256 _skuTypeId) public view returns (string) {
        return skuTypes[_skuTypeId].name;
    }

    /**
     * @notice Get the SKU name associated with a given SKU ID
     */
    function getSKUName(uint256 _skuId) public view returns (string) {
        return skus[_skuId].name;
    }

    /**
     * @notice Get the count of SKU Types associated with a given Shop
     */
    function getShopSKUTypeCount(uint256 _shopId) public view returns (uint256) {
        return shopSKUTypes[_shopId].length;
    }

    /**
     * @notice Get the count of SKUs associated with a given Shop
     */
    function getShopSKUCount(uint256 _shopId) public view returns (uint256) {
        return shopSKUs[_shopId].length;
    }

    /**
     * @notice Get the count of SKUs associated with a given SKU Type
     */
    function getSKUTypeSKUCount(uint256 _skuTypeId) public view returns (uint256) {
        return skuTypeSKUs[_skuTypeId].length;
    }

}