pragma solidity ^0.4.24;

import "./ItemFactory.sol";


/**
 * @title ProShop
 * @notice Main contract for sales side of the In-game Pro Shop System
 */
contract ProShop is ItemFactory {

    /**
     * @notice emitted upon the withdrawal of a Shop's balance
     */
    event ShopBalanceWithdrawn(uint256 shopId, uint256 amount);

    /**
     * @notice emitted upon the withdrawal of the franchise's balance
     */
    event FranchiseBalanceWithdrawn(uint256 amount);

    constructor() public {
        franchiseFeePercent = 3; // Percentage of each sale going to the franchise owner
    }

    /**
     * @notice Set the address of the StockRoom contract
     */
    function setStockRoomContractAddress(address _address) external onlySysAdmin {
        StockRoomInterface candidateContract = StockRoomInterface(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isStockRoom());

        // Set the new contract address
        stockRoom = candidateContract;
    }

    /**
     * @notice Allow a shop owner to withdraw the accumulated balance of their shop, if any
     */
    function withdrawShopBalance(uint256 _shopId)
        external
        whenNotPaused
        onlyShopOwner(_shopId)
    {
        uint256 amount = shopBalances[_shopId];
        require(address(this).balance >= amount);
        shopBalances[_shopId] = 0;
        msg.sender.transfer(amount);
        emit ShopBalanceWithdrawn(_shopId, amount);
    }

    /**
     * @notice Allow the franchise owner to withdraw their accumulated balance, if any
     */
    function withdrawFranchiseBalance()
        external
        whenNotPaused
        onlyFranchiseOwner
    {
        require(address(this).balance >= franchiseBalance);
        uint256 amount = franchiseBalance;
        franchiseBalance = 0;
        msg.sender.transfer(amount);
        emit FranchiseBalanceWithdrawn(amount);
    }

    /**
     * @notice Allow a shop owner to check the accumulated balance of their shop in Ether or Shop fiat
     */
    function checkShopBalance(uint256 _shopId, bool _inFiat) external view onlyShopOwner(_shopId) returns(uint256) {
        uint256 balance = shopBalances[_shopId];
        return (balance > 0 && _inFiat) ? stockRoom.convertEtherToShopFiat(_shopId, balance) : balance;
    }

    /**
     * @notice Allow the franchise owner to check their accumulated balance in Ether or franchise fiat
     */
    function checkFranchiseBalance(bool _inFiat) external view onlyFranchiseOwner() returns(uint256) {
        return (franchiseBalance > 0 && _inFiat) ? stockRoom.convertEtherToFranchiseFiat(franchiseBalance) : franchiseBalance;
    }

    // @notice Get the list of Item Ids associated with a given Owner
    function getItemIds(address _owner) external view returns (uint[] memory) {
        return ownedItems[_owner];
    }

    /**
     * @notice Get the count of minted Items associated with a given Shop
     */
    function getShopItemCount(uint256 _shopId) external view returns (uint256) {
        return shopItems[_shopId].length;
    }

    /**
     * @notice Get the count of minted Items associated with a given SKU
     */
    function getSKUItemCount(uint256 _skuId) external view returns (uint256) {
        return skuItems[_skuId].length;
    }

    /**
     * @notice Get the count of Items associated with a given Owner
     */
    function getOwnerItemCount(address _owner) external view returns (uint256) {
        return ownedItems[_owner].length;
    }

}