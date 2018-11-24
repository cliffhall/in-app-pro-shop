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
        shopId = (await contract.createShop.call(shopName, shopDesc, {from: shopOwner})).toNumber();

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

    });

    it("should not allow someone other than shop owner to create a SKU Type for a Shop", async function() {

        await exceptions.catchRevert(contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: notShopOwner}));

    });

    it("should allow a shop owner to create a SKU Type for their Shop", async function() {

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Listen for NewSKUType event (filter events by shopId)
        let event = contract.NewSKUType({shopId: shopId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId, "Shop ID was wrong");
            assert.equal(response.args.skuTypeId.toNumber(), skuTypeId, "SKU Type ID was wrong");
            assert.equal(response.args.name, skuTypeName, "SKU Type Name was wrong");
            event.stopWatching();
        });

        // Now do it for real
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Get the count of SKUs for the Shop
        const skuTypeIds = await contract.getSKUTypeIds(shopId);
        assert.equal(skuTypeIds.length, 1, "Shop SKU Type count wasn't correct");

        // verify contents of SKUType
        const item = await contract.getSKUType(skuTypeId);
        assert.equal(item.length, 4, "SKU Type field count wasn't correct");
        assert.equal(item[0].toNumber(), shopId, "Shop ID field wasn't correct");
        assert.equal(item[1].toNumber(), skuTypeId, "SKU Type id field wasn't correct");
        assert.equal(item[2], skuTypeName, "SKU Type name field wasn't correct");
        assert.equal(item[3], skuTypeDesc, "SKU Type description field wasn't correct");

    });

});
