const StockRoom = artifacts.require("./StockRoom.sol");
const exceptions = require ("./util/Exceptions");

contract('SKUTypeFactory', function(accounts) {

    let contract, shopId, skuTypeId;
    const shopOwner = accounts[2];
    const notShopOwner = accounts[3];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const shopFiat = "USD";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";

    // Set up a shop for this test suite
    before(async () => {
        // Get the contract instance for this suite
        contract = await StockRoom.new();

        // Unpause the contracts
        await contract.unpause();

        // Get the Shop ID (using call, to avoid receiving a transaction)
        shopId = (await contract.createShop.call(shopName, shopDesc, shopFiat, {from: shopOwner}));

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

    });

    it("should not allow someone other than shop owner to create a SKU Type for a Shop", async function() {

        await exceptions.catchRevert(contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: notShopOwner}));

    });

    it("should allow a shop owner to create a SKU Type for their Shop", async function() {

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Listen for NewSKUType event (filter events by shopId)
        /* When Ganache 7.0 comes out we can move to web3 ^1.2.x and rework events. for now, tests are broken
        let event = contract.NewSKUType({shopId: shopId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId, shopId, "Shop ID was wrong");
            assert.equal(response.args.skuTypeId, skuTypeId, "SKU Type ID was wrong");
            assert.equal(response.args.name, skuTypeName, "SKU Type Name was wrong");
        });
        */

        // Now do it for real
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Get the count of SKUs for the Shop
        const skuTypeIds = await contract.getSKUTypeIds(shopId);
        assert.equal(skuTypeIds.length, 1, "Shop SKU Type count wasn't correct");

        // verify contents of SKUType
        const skuType = await contract.getSKUType(skuTypeId);
        assert.equal(Object.keys(skuType).length, 4, "SKU Type field count wasn't correct");
        assert.equal(skuType[0].toNumber(), shopId, "Shop ID field wasn't correct");
        assert.equal(skuType[1].toNumber(), skuTypeId, "SKU Type id field wasn't correct");
        assert.equal(skuType[2], skuTypeName, "SKU Type name field wasn't correct");
        assert.equal(skuType[3], skuTypeDesc, "SKU Type description field wasn't correct");

    });

});
