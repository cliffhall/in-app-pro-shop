pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

import "./AccessControl.sol";


/**
 * @title ProShopBase
 * @notice Defines structs for the In-game Pro Shop System
 */
contract ProShopBase is AccessControl, ERC721Token {


    constructor() ERC721Token(TOKEN_NAME, TOKEN_SYMBOL) {
    }

    /**
     * @notice Name of the non fungible token
     */
    string public constant TOKEN_NAME = "InGameProShopItem";

    /**
     * @notice Symbol of the non fungible token
     */
    string public constant TOKEN_SYMBOL = "IGPSI";

    /**
     * @notice All of the Shops
     */
    Shop[] public shops;

    /**
     * @notice All of the Items
     */
    Item[] public items;

    /**
     * @dev Mapping of Shop ID to Owner Address
     */
    mapping (uint => address) public shopToOwner;

    /**
     * @dev Mapping of Item ID to Owner Address
     */
    mapping (uint => address) public itemToOwner;

    /**
     * @dev Mapping of Item ID to Shop ID
     */
    mapping (uint => uint) public itemToShop;

    /**
     * @dev Mapping of Owner Address to Item Count
     */
    mapping (address => uint) public ownerItemCount;

    /**
     * @notice the attributes of an item
     */
    struct Attribute {

        // Name of the attribute
        string name;

        // Description of the attribute (optional)
        string description;

        // Value of the attribute (optional)
        uint value;
    }

    /**
     * @notice Structure of a Pro Shop Item
     */
    struct Item {

        // Owner of the item owner, _shopId, itemId, _itemType, _name, _desc, _consumable, false
        address owner;

        // The shop this item belongs to
        uint shopId;

        // The id of this item
        uint itemId;

        // Type of the item
        string itemType;

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
        // mapping(uint => Attribute) attributes;
    }

    /**
     * @notice Structure of a Pro Shop
     */
    struct Shop {

        // Owner of the item
        address owner;

        // The id of this shop
        uint shopId;

        // Name of the item
        string name;

        // Description of the shop
        string description;

    }


}
