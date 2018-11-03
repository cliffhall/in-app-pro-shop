const ProShop = artifacts.require("./ProShop.sol");

contract('ShopFactory', function(accounts) {

    let contract ;
    const shopOwner = accounts[1];

    before(async () => {
        // Get the contract instance for this suite
        contract  = await ProShop.deployed();
    });

    it("should allow anyone to create a shop", async function() {

        // The name and description of the new shop
        const shopName = "Barely Legal Pawn";
        const shopDesc = "Great stuff, cheap!";

        // Get the Shop ID (using call, to avoid receiving a transaction)
        const shopId = await contract.createShop.call(shopName, shopDesc, {from: shopOwner});
        assert.equal(shopId, 0, "Shop id wasn't returned");

        // Listen for NewShop event (shopId is indexed)
        let event = contract.NewShop({shopId: shopId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId.toNumber());
            assert.equal(response.args.name, shopName);
            event.stopWatching();
        });

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

        // Make sure the shop count for this owner is correct
        const shopIds = await contract.getShopIds(shopOwner);
        assert.equal(shopIds.length, 1, "Shop count wasn't correct");

    });

    it("should allow an existing shop owner to create another shop", async function() {

        // The name and description of the new shop
        const shopName = "Fairly Regal Pawn";
        const shopDesc = "Cheap stuff, pricey!";

        // Get the Shop ID (using call, to avoid receiving a transaction)
        const shopId = await contract.createShop.call(shopName, shopDesc, {from: shopOwner});
        assert.equal(shopId, 1, "Shop id wasn't returned");

        // Listen for NewShop event (shopId is indexed)
        let event = contract.NewShop({shopId: shopId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId.toNumber());
            assert.equal(response.args.name, shopName);
            event.stopWatching();
        });

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

        // Make sure the owner's Shop count is correct
        const shopIds = await contract.getShopIds(shopOwner);
        assert.equal(shopIds.length, 2, "Shop count wasn't correct");

    });

    it("should allow shop owner retrieve a list of their shops", async function() {

        // Get the list of ShopIDs for the owner
        const shopIds = await contract.getShopIds(shopOwner);
        assert.equal(shopIds.length, 2, "Shop list length was wrong");

    });

    it("should allow shop owner retrieve a shop by id", async function() {

        // The name and description of the new shop
        const shopName = "Barely Legal Pawn";
        const shopDesc = "Great stuff, cheap!";
        const shopId = 0;

        // Make sure the owner's Shop count is correct
        const shop = await contract.getShop(shopId);

        assert.equal(shop[0], shopOwner, "Shop owner address was wrong");
        assert.equal(shop[1], shopId,    "Shop ID was wrong");
        assert.equal(shop[2], shopName,  "Shop name was wrong");
        assert.equal(shop[3], shopDesc,  "Shop description was wrong");

    });


});
