pragma solidity ^0.4.24;

import "./AccessControl.sol";
import "./FiatContractInterface.sol";


/**
 * @title StockRoomBase
 * @notice Defines collections, mappings, and structs for the StockRoom side of the In-game Pro Shop System
 */
contract StockRoomBase is AccessControl {

    FiatContractInterface internal fiatContract;

    /**
     * @dev modifier to scope access to owner of given shop
     */
    modifier onlyShopOwner(uint256 _shopId) {
        address owner = shopToOwner[_shopId];
        require(msg.sender == owner);
        _;
    }

    /**
     * @notice All of the Shops
     */
    Shop[] public shops;

    /**
     * @notice All of the SKU Types
     */
    SKUType[] public skuTypes;

    /**
     * @notice All of the SKUs
     */
    SKU[] public skus;

    /**
     * @dev Mapping of Shop ID to Owner Address
     */
    mapping (uint256 => address) public shopToOwner;

    /**
     * @dev Mapping of Owner Address to list of owned Shops
     */
    mapping (address => uint256[]) public ownedShops;

    /**
     * @dev Mapping of Shop ID to SKU Type list
     */
    mapping (uint256 => uint256[]) public shopSKUTypes;

    /**
     * @dev Mapping of SKU Type ID to SKU list
     */
    mapping (uint256 => uint256[]) public skuTypeSKUs;

    /**
     * @dev Mapping of Shop ID to SKU list
     */
    mapping (uint256 => uint256[]) public shopSKUs;

    /**
     * @notice Structure of a Pro Shop
     */
    struct Shop {

        // Owner of the item
        address owner;

        // The id of this shop
        uint256 shopId;

        // Name of the item
        string name;

        // Description of the shop
        string description;

        // Fiat currency for prices
        string fiat;
    }

    /**
     * @notice the attributes of an item
     */
    struct SKUType {

        // ID of the Shop this SKU Type belongs to
        uint256 shopId;

        // ID of the SKU Type
        uint256 skuTypeId;

        // Name of the SKU Type
        string name;

        // Description of the SKU Type (optional)
        string description;
    }

    /**
     * @notice Structure of a Pro Shop SKU (Shopkeeping Unit)
     */
    struct SKU {

        // The shop this SKU belongs to
        uint256 shopId;

        // The id of this SKU
        uint256 skuId;

        // Type of the SKU
        uint256 skuTypeId;

        // Price of the SKU
        uint256 price;

        // Name of the item
        string name;

        // Description of the SKU
        string description;

        // Can it be consumed (used up)
        bool consumable;

        // Is there a limit to the number of Items that can
        // be minted from this SKU?
        bool limited;

        // If limited, what is the maximum number that
        // can be created?
        uint256 limit;

    }

}
