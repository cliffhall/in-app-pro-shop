pragma solidity ^0.4.24;

import "./ItemFactory.sol";


/**
 * @title ProShop
 * @notice Main contract for the In-game Pro Shop System
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
        // Percentage of each sale going to the franchise owner
        franchiseFeePercent = 10;
    }

    /**
     * @notice Allow a shop owner to check the accumulated balance of their shop
     */
    function checkShopBalance(uint256 _shopId) public view onlyShopOwner(_shopId) returns(uint256) {
        return shopBalances[_shopId];
    }

    /**
     * @notice Allow a shop owner to withdraw the accumulated balance of their shop, if any
     */
    function withdrawShopBalance(uint256 _shopId) public onlyShopOwner(_shopId) {
        uint256 amount = shopBalances[_shopId];
        require(address(this).balance >= amount);
        shopBalances[_shopId] = 0;
        msg.sender.transfer(amount);
        emit ShopBalanceWithdrawn(_shopId, amount);
    }

    /**
     * @notice Allow the franchise owner to check their accumulated balance
     */
    function checkFranchiseBalance() public view onlyFranchiseOwner() returns(uint256) {
        return franchiseBalance;
    }

    /**
     * @notice Allow the franchise owner to withdraw their accumulated balance, if any
     */
    function withdrawFranchiseBalance() public onlyFranchiseOwner() {
        require(address(this).balance >= franchiseBalance);
        uint256 amount = franchiseBalance;
        franchiseBalance = 0;
        msg.sender.transfer(amount);
        emit FranchiseBalanceWithdrawn(amount);
    }
}