pragma solidity ^0.5.13;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "./AccessControl.sol";
import "./StockRoomInterface.sol";


/**
 * @title ProShopBase
 * @notice Defines collections, mappings, and structs for the sales side of the In-game Pro Shop System
 */
contract ProShopBase is ERC721Full, AccessControl {

    constructor() public ERC721Full(TOKEN_NAME, TOKEN_SYMBOL) {}

    StockRoomInterface internal stockRoom;

    /**
     * @dev modifier to scope access to owner of given shop
     */
    modifier onlyShopOwner(uint256 _shopId) {
        address owner = stockRoom.getShopOwner(_shopId);
        require(msg.sender == owner);
        _;
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
     * @notice All of the Items
     */
    Item[] public items;

    /**
     * @dev Mapping of SKU id to Item list
     */
    mapping (uint256 => uint256[]) public skuItems;

    /**
     * @dev Mapping of Shop ID to SKU list
     */
    mapping (uint256 => uint256[]) public shopItems;

    /**
     * @dev Mapping of Owner Address to list of owned Items
     */
    mapping (address => uint256[]) public ownedItems;

    /**
     * @dev Mapping of Shop ID to its available Ether balance
     */
    mapping (uint256 => uint256) public shopBalances;

    /**
     * @notice The franchise owner's available balance
     */
    uint256 public franchiseBalance;

    /**
     * @notice The percentage of each transaction taken by the franchise
     * Must be between 0 and 100
     */
    uint256 public franchiseFeePercent;

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

        // Id of SKU of this item
        uint256 skuId;

        // Has the item been consumed?
        bool consumed;
    }

}
