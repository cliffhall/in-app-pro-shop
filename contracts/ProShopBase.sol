pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./AccessControl.sol";


/**
 * @title ProShopBase
 * @notice Defines structs for the In-game Pro Shop System
 */
contract ProShopBase is ERC721Token {

    using SafeMath for uint256;

    constructor() public ERC721Token(TOKEN_NAME, TOKEN_SYMBOL) {
    }

    /**
     * @notice Name of the non fungible token
     */
    string public constant TOKEN_NAME = "InAppProShopItem";

    /**
     * @notice Symbol of the non fungible token
     */
    string public constant TOKEN_SYMBOL = "IAPS";

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
     * @notice All of the Items
     */
    Item[] public items;

    /**
     * @dev Mapping of Shop ID to Owner Address
     */
    mapping (uint256 => address) public shopToOwner;

    /**
     * @dev Mapping of Owner Address to Shop Count
     */
    mapping (address => uint256) public ownerShopCount;

    /**
     * @dev Mapping of SKU Type ID to Shop ID
     */
    mapping (uint256 => uint256) public skuTypeToShop;

    /**
     * @dev Mapping of Shop ID to SKU Type Count
     */
    mapping (uint256 => uint256) public shopTypeCount;

    /**
     * @dev Mapping of SKU ID to Shop ID
     */
    mapping (uint256 => uint256) public skuToShop;

    /**
     * @dev Mapping of Shop ID to SKU Type Count
     */
    mapping (uint256 => uint256) public shopSKUTypeCount;

    /**
     * @dev Mapping of Shop ID to SKU Count
     */
    mapping (uint256 => uint256) public shopSKUCount;

    /**
     * @dev Mapping of Item ID to Owner Address
     */
    mapping (uint256 => address) public itemToOwner;

    /**
     * @dev Mapping of Item ID to Shop ID
     */
    mapping (uint256 => uint256) public itemToShop;

    /**
     * @dev Mapping of Owner Address to Item Count
     */
    mapping (address => uint256) public ownerItemCount;

    /**
     * @notice the attributes of an item
     */
    struct Attribute {

        // Name of the attribute
        string name;

        // Description of the attribute (optional)
        string description;

        // Value of the attribute (optional)
        uint256 value;
    }

    /**
     * @notice Structure of a Pro Shop Item
     */
    struct Item {

        // Owner of the item
        address owner;

        // The shop this item belongs to
        uint256 shopId;

        // The id of this item
        uint256 itemId;

        // Id of SKU Type of this item
        uint256 skuTypeId;

        // Name of the item
        string name;

        // Description of the item
        string description;

        // Can it be consumed (used up)
        bool consumable;

        // Has the item been consumed?
        bool consumed;

        // The attributes of the item
        // TODO: Why can't this be an array
        // mapping(uint256 => Attribute) attributes;
    }

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

        // Name of the item
        string name;

        // Description of the SKU
        string description;

        // Can it be consumed (used up)
        bool consumable;

        // Is there a limit to the number of Items that can
        // be created from this SKU?
        bool isLimited;

        // If limited, what is the maximum number that
        // can be created?
        uint256 limit;

        // The attributes of the item
        // TODO: Why can't this be an array
        // mapping(uint256 => Attribute) attributes;
    }

}
