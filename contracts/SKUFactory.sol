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

        // Bump up SKU Type Count for Shop ID
        uint256 count = shopSKUTypeCount[_shopId];
        shopSKUTypeCount[_shopId] = count.add(1);

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
        uint256 skuId = skus.length; // TODO: make id unique

        // Create and store SKU Type
        skus.push(SKU(_shopId, skuId, _skuTypeId, _name, _desc, _consumable, _limited, _limit));

        // Map SKU to Shop
        skuToShop[skuId] = _shopId;

        // Bump up SKU count for Shop
        uint256 count = shopSKUCount[_shopId];
        shopSKUCount[_shopId] = count.add(1);

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
}