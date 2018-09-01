const ProShop = artifacts.require("./ProShop.sol");
const exceptions = require ('../util/exceptions');

contract('SKUFactory', function(accounts) {

    let contract, shopId, skuTypeId;
    const shopOwner = accounts[2];
    const notShopOwner = accounts[3];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";
    const skuName = "Magic Sword";
    const skuDesc = "Flaming. Kills Orcs.";
    const consumable = false;
    const limited = true;
    const limit = 5000;
    const price = web3.toWei(0.5, "ether");

    // Set up a shop for this test suite
    before(async () => {
        // Get the contract instance for this suite
        contract = await ProShop.deployed();

        // Get the Shop ID (using call, to avoid receiving a transaction)
        shopId = await contract.createShop.call(shopName, shopDesc, {from: shopOwner});

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

    });

    it("should not allow someone other than shop owner to create a SKU Type for a Shop", async function() {

        await exceptions.catchRevert(contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: notShopOwner}));

    });

    it("should allow a shop owner to create a SKU Type for their Shop", async function() {

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});
        assert.equal(skuTypeId, 0, "SKUTypeId id wasn't returned");

        // Now do it for real
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // This is a view function, so it doesn't create a transaction, returns expected value
        const name = await contract.getSKUTypeName(skuTypeId);
        assert.equal(name, skuTypeName, "SKU Type name wasn't returned");

        // This is a view function, so it doesn't create a transaction, returns expected value
        const skuTypeCount = await contract.getShopSKUTypeCount(shopId);
        assert.equal(skuTypeCount, 1, "Shop SKU Type count wasn't correct");

    });

    it("should not allow someone other than shop owner to create a SKU for a Shop", async function() {

        await exceptions.catchRevert(contract.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: notShopOwner}));

    });

    it("should allow a shop owner to create a SKU of an existing SKU Type for their Shop", async function() {

        // Verify that SKU Type from previous test in suite is still there
        const typeName = await contract.getSKUTypeName(skuTypeId);
        assert.equal(typeName, skuTypeName, "SKU Type name wasn't returned");

        // First, get the skuTypeID with a call so it doesn't return a transaction
        const skuId = await contract.createSKU.call(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});
        assert.equal(skuTypeId, 0, "SKUTypeId id wasn't returned");

        // Now do it for real
        await contract.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Get the name of the SKU
        const name = await contract.getSKUName(skuId);
        assert.equal(name, skuName, "SKU name wasn't returned");

        // Get the count of SKUs for the Shop
        const skuCount = await contract.getShopSKUCount(shopId);
        assert.equal(skuCount, 1, "Shop SKU count wasn't correct");

        // Get the SKU count for the SKU Type
        const skuTypeSKUCount = await contract.getSKUTypeSKUCount(skuTypeId);
        assert.equal(skuTypeSKUCount, 1, "SKU Type SKU count wasn't correct");

    });

});
