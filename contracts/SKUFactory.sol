pragma solidity ^0.4.24;

import "./ShopFactory.sol";


contract SKUFactory is ShopFactory {

    /**
     * @notice emitted upon the creation of an Item
     */
    event NewSKU(uint shopId, uint skuId, string name);

    /**
     * @notice Create an SKU (Shopkeeping Unit)
     */
    function createSKU(uint _shopId,
                        string _itemType,
                        string _name,
                        string _desc,
                        bool _consumable,
                        bool _limited,
                        uint _limit) public {
        uint skuId = items.length; // TODO: make id unique
        skus.push(SKU(_shopId, skuId, _itemType, _name, _desc, _consumable, _limited, _limit));
        skuToShop[skuId] = _shopId;
        shopSKUCount[_shopId]++; // TODO: use SafeMath
        emit NewSKU(_shopId, skuId, _name);
    }

    /**
     * @notice Get the SKU name associated with a given SKU ID
     */
    function getSKUName(uint _skuId) public view returns (string) {
        return skus[_skuId].name;
    }

}