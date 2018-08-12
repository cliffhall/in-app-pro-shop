const ProShopCore = artifacts.require("./ProShopCore.sol");

contract('SKUFactory', function(accounts) {

    it("should allow a shop owner to create a SKU Type for their Shop", async function() {

        // Get the deployed contract instance
        const inst = await ProShopCore.deployed();
        const shopOwner = accounts[2];
        const shopName = "Rarely Beagle Pawn";
        const shopDesc = "Great mutts, cheap!";
        const skuTypeName = "Weapons";
        const skuTypeDesc = "Things that make you go ouch!";

        // Invoke the function with 'call' to get the return value instead of the transaction
        // NOTE: this doesn't actually write the data
        const shopId = await inst.createShop.call(shopName, shopDesc, {from: shopOwner});

        // Now call the function for real and write the data
        await inst.createShop(shopName, shopDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        const skuTypeId = await inst.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});
        assert.equal(skuTypeId, 0, "SKUTypeId id wasn't returned");

        // Now do it for real
        await inst.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // This is a view function, so it doesn't create a transaction, returns expected value
        const name = await inst.getSKUTypeName(skuTypeId);
        assert.equal(name, skuTypeName, "SKU Type name wasn't returned");

    });

    it("should allow a shop owner to create a SKU for their Shop", async function() {

        // Get the deployed contract instance
        const inst = await ProShopCore.deployed();
        const shopOwner = accounts[2];

        const shopId = 0;
        const skuTypeId = 0;
        const skuTypeName = "Weapons";
        const skuName = "Magic Sword";
        const skuDesc = "Flaming. Kills Orcs.";
        const consumable = false;
        const limited = true;
        const limit = 5000;

        // Verify that SKU Type from previous test in suite is still there
        const typeName = await inst.getSKUTypeName(skuTypeId);
        assert.equal(typeName, skuTypeName, "SKU Type name wasn't returned");

        // First, get the skuTypeID with a call so it doesn't return a transaction
        const skuId = await inst.createSKU.call(shopId, skuTypeId, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});
        assert.equal(skuTypeId, 0, "SKUTypeId id wasn't returned");

        // Now do it for real
        await inst.createSKU(shopId, skuTypeId, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // This is a view function, so it doesn't create a transaction, returns expected value
        const name = await inst.getSKUName(skuId);
        assert.equal(name, skuName, "SKU name wasn't returned");

    });

});
