const ProShop = artifacts.require("./ProShop.sol");
const exceptions = require ('./util/Exceptions');

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

        // Get the Shop ID to be created
        shopId = (await contract.createShop.call(shopName, shopDesc, {from: shopOwner})).toNumber();

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

        // Get the SKUType to be created
        skuTypeId = (await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner})).toNumber();

        // Create a SKUType
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

    });


    it("should not allow someone other than shop owner to create a SKU for a Shop", async function() {

        await exceptions.catchRevert(contract.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: notShopOwner}));

    });

    it("should allow a shop owner to create a SKU of an existing SKU Type for their Shop", async function() {

        // First, get the skuTypeID with a call so it doesn't return a transaction
        const skuId = await contract.createSKU.call(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Listen for NewSKU event (filter events by shopId)
        let event = contract.NewSKU({shopId: shopId});
        contract.NewSKU().watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId, "Shop ID wasn't correct");
            assert.equal(response.args.skuId.toNumber(), skuId, "SKU ID wasn't correct");
            assert.equal(response.args.name, skuName, "SKU Name wasn't correct");
            event.stopWatching();
        });

        // Now do it for real
        await contract.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Get the count of SKUs for the Shop
        const skuIds = await contract.getSKUIds(shopId);
        assert.equal(skuIds.length, 1, "Shop SKU count wasn't correct");

        // verify contents of SKU
        const item = await contract.getSKU(skuId);
        assert.equal(item.length, 8, "SKU field count wasn't correct");
        assert.equal(item[0].toNumber(), shopId, "Shop ID field wasn't correct");
        assert.equal(item[1].toNumber(), skuTypeId, "SKU Type id field wasn't correct");
        assert.equal(item[2], price, "price field wasn't correct");
        assert.equal(item[3], skuName, "SKU name field wasn't correct");
        assert.equal(item[4], skuDesc, "SKU description field wasn't correct");
        assert.equal(item[5], consumable, "consumable field wasn't correct");
        assert.equal(item[6], limited, "limited field wasn't correct");
        assert.equal(item[7], limit, "limit field wasn't correct");
    });

});
