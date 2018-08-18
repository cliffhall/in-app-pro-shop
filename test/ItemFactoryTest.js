const ProShopCore = artifacts.require("./ProShopCore.sol");

contract('ItemFactory', function(accounts) {

    let inst, shopId, skuTypeId, skuId;
    const shopOwner = accounts[2];
    const itemOwner = accounts[3];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";
    const skuName = "Magic Sword";
    const skuDesc = "Flaming. Kills Orcs.";
    const consumable = false;
    const limited = true;
    const limit = 5000;

    // Set up a shop with a SKU Type and SKU for this test suite
    before(async () => {
        // Get the contract instance for this suite
        inst = await ProShopCore.deployed();

        // Invoke the function with 'call' to get the return value instead of the transaction
        // NOTE: this doesn't actually write the data
        shopId = await inst.createShop.call(shopName, shopDesc, {from: shopOwner});

        // Now call the function for real and write the data
        await inst.createShop(shopName, shopDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await inst.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Now do it for real
        await inst.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuId = await inst.createSKU.call(shopId, skuTypeId, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Now do it for real
        await inst.createSKU(shopId, skuTypeId, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

    });

    it("should allow a user to create an Item", async function() {

        // Get the item id
        const itemId = await inst.createItem.call(shopId, skuId, consumable, {from: itemOwner});
        assert.equal(itemId, 0, "Item id wasn't returned");

        // Create the item
        await inst.createItem(shopId, skuId, consumable, {from: itemOwner});

        // Check the name matches the SKU name
        const name = await inst.getItemName(itemId);
        assert.equal(name, skuName, "Item name wasn't returned");

        // Check the type matches the SKU Type name
        const type = await inst.getItemType(itemId);
        assert.equal(type, skuTypeName, "Item type wasn't returned");

        const supply = await inst.totalSupply();
        assert.equal(supply, 1, "Total supply not incremented");

        const ownerTokens = await inst.balanceOf(itemOwner);
        assert.equal(ownerTokens, 1, "Owner token count not incremented");

    });

});
