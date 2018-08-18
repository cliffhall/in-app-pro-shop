const ProShopCore = artifacts.require("./ProShopCore.sol");

contract('ShopFactory', function(accounts) {

    let inst;
    const shopOwner = accounts[1];

    before(async () => {
        // Get the contract instance for this suite
        inst = await ProShopCore.deployed();
    });

    it("should allow anyone to create a shop", async function() {

        // Get the deployed contract instance
        const shopName = "Barely Legal Pawn";
        const shopDesc = "Great stuff, cheap!";

        // Invoke the function with 'call' to get the return value instead of the transaction
        // NOTE: this doesn't actually write the data
        const shopId = await inst.createShop.call(shopName, shopDesc, {from: shopOwner});
        assert.equal(shopId, 0, "Shop id wasn't returned");

        // Now call the function for real and write the data
        await inst.createShop(shopName, shopDesc, {from: shopOwner});

        // This is a view function, so it doesn't create a transaction, returns expected value
        const name = await inst.getShopName(shopId);
        assert.equal(name, shopName, "Shop name wasn't returned");

        // This is a view function, so it doesn't create a transaction, returns expected value
        const count = await inst.getShopCount(shopOwner);
        assert.equal(count.toNumber(), 1, "Shop count wasn't correct");

    });

    it("should allow an existing shop owner to create another shop", async function() {

        // Get the deployed contract instance
        const shopName = "Fairly Regal Pawn";
        const shopDesc = "Cheap stuff, pricey!";

        // Invoke the function with 'call' to get the return value instead of the transaction
        // NOTE: this doesn't actually write the data
        const shopId = await inst.createShop.call(shopName, shopDesc, {from: shopOwner});
        assert.equal(shopId, 1, "Shop id wasn't returned");

        // Now call the function for real and write the data
        await inst.createShop(shopName, shopDesc, {from: shopOwner});

        // This is a view function, so it doesn't create a transaction, returns expected value
        const name = await inst.getShopName(shopId);
        assert.equal(name, shopName, "Shop name wasn't returned");

        // This is a view function, so it doesn't create a transaction, returns expected value
        const count = await inst.getShopCount(shopOwner);
        assert.equal(count.toNumber(), 2, "Shop count wasn't correct");

    });

});
