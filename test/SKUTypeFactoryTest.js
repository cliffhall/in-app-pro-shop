const ProShop = artifacts.require("./ProShop.sol");
const exceptions = require ('./util/Exceptions');

contract('SKUTypeFactory', function(accounts) {

    let contract, shopId, skuTypeId;
    const shopOwner = accounts[2];
    const notShopOwner = accounts[3];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";

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

        // Listen for NewSKUType event (filter events by shopId)
        let event = contract.NewSKUType({shopId: shopId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId);
            assert.equal(response.args.skuTypeId.toNumber(), skuTypeId);
            assert.equal(response.args.name, skuTypeName);
            event.stopWatching();
        });

        // Now do it for real
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // This is a view function, so it doesn't create a transaction, returns expected value
        const skuTypeIds = await contract.getSKUTypeIds(shopId);
        assert.equal(skuTypeIds.length, 1, "Shop SKU Type count wasn't correct");

    });

});
