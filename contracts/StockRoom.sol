pragma solidity ^0.5.0;

import "./SKUFactory.sol";


/**
 * @title StockRoom
 * @notice Main contract for reference data side of the In-game Pro Shop System
 */
contract StockRoom is SKUFactory {

    /**
     * @notice Set the address of the FiatContract contract
     */
    function setFiatContractAddress(address _address) external whenPaused onlySysAdmin {
        FiatContractInterface candidateContract = FiatContractInterface(_address);

        // Verify that we have the appropriate address
        require(candidateContract.updatedAt(0) >= 0);

        // Set the new contract address
        fiatContract = candidateContract;
    }

    // @notice confirm this is a StockRoom contract
    function isStockRoom() external pure returns (bool) {
        return true;
    }

    // @notice get an item's price in Ether
    function getPriceInEther(uint256 _skuId) external view returns (uint256) {
        SKU memory sku = skus[_skuId];
        uint256 quote = getQuote(shops[sku.shopId].fiat);
        return quote * sku.price;
    }

    // @notice convert an Ether amount to a Shop's fiat currency
    function convertEtherToShopFiat(uint256 _shopId, uint256 _amount) external view returns (uint256) {
        uint256 quote = getQuote(shops[_shopId].fiat);
        return _amount.div(quote);
    }

    // @notice convert an Ether amount to the Franchise's fiat currency
    function convertEtherToFranchiseFiat(uint256 _amount) external view returns (uint256) {
        uint256 quote = getQuote("USD");
        return _amount.div(quote);
    }

    // @notice get a quote for Ether in the given fiat currency
    function getQuote(string memory _fiat) private view returns (uint256) {
        bytes32 fiat = keccak256(abi.encodePacked(_fiat));
        uint256 quote;
        if (fiat == keccak256("USD")) {
            quote = fiatContract.USD(0);
        } else if (fiat == keccak256("EUR")) {
            quote = fiatContract.EUR(0);
        } else if (fiat == keccak256("GBP")) {
            quote = fiatContract.GBP(0);
        } else {
            quote = fiatContract.USD(0); // franchise
        }
        return quote;
    }

    // @notice confirm whether an item can be minted based on limit and current item count
    function canMintItem(uint256 _skuId, uint256 _itemCount) external view returns (bool) {
        return (!skus[_skuId].limited || (_itemCount < skus[_skuId].limit));
    }

    // @notice Get the list of SKU Ids associated with a given SKUType
    function getSKUTypeSKUIds(uint256 _skuTypeId) external view returns (uint[] memory) {
        return skuTypeSKUs[_skuTypeId];
    }

    // @notice Get the list of SKU Ids associated with a given Shop
    function getSKUIds(uint256 _shopId) external view returns (uint[] memory) {
        return shopSKUs[_shopId];
    }

    // @notice Get a SKU's properties by ID
    function getSKU(uint256 _skuId) external view returns (uint256, uint256, uint256, uint256, string memory, string memory, bool, bool, uint256)
    {
        require(_skuId < skus.length);
        SKU memory sku = skus[_skuId];
        return (
            sku.shopId,
            sku.skuId,
            sku.skuTypeId,
            sku.price,
            sku.name,
            sku.description,
            sku.consumable,
            sku.limited,
            sku.limit
        );
    }

    // @notice Get the list of SKU Type Ids associated with a given Shop
    function getSKUTypeIds(uint256 _shopId) external view returns (uint[] memory) {
        return shopSKUTypes[_shopId];
    }

    // @notice Get a SKUTypes properties by ID
    function getSKUType(uint256 _skuTypeId) external view returns (uint256, uint256, string memory, string memory) {
        require(_skuTypeId < skuTypes.length);
        SKUType memory skuType = skuTypes[_skuTypeId];
        return (
            skuType.shopId,
            skuType.skuTypeId,
            skuType.name,
            skuType.description
        );
    }

    // @notice Get the list of Shop Ids associated with a given Owner
    function getShopIds(address _owner) external view returns (uint[] memory) {
        return ownedShops[_owner];
    }

    // @notice Get a Shop's properties by ID
    function getShop(uint256 _shopId) external view returns (address, uint256, string memory, string memory, string memory) {
        require(_shopId < shops.length);
        Shop memory shop = shops[_shopId];
        return (
            shop.owner,
            shop.shopId,
            shop.name,
            shop.description,
            shop.fiat
        );
    }

    // @notice Get a Shop's owner
    function getShopOwner(uint256 _shopId) external view returns (address) {
        require(_shopId < shops.length);
        return shops[_shopId].owner;
    }

}