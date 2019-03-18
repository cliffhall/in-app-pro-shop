const StockRoom = artifacts.require("./StockRoom.sol");

contract('ShopFactory', function(accounts) {

    let contract ;
    const shopOwner = accounts[1];

    before(async () => {
        // Get the contract instance for this suite
        contract  = await StockRoom.new();

        // Unpause the contract
        await contract.unpause();

    });

    it("should allow anyone to create a shop", async function() {

        // The name and description of the new shop
        const shopName = "Barely Legal Pawn";
        const shopDesc = "Great stuff, cheap!";
        const shopFiat = "USD";

        // Get the Shop ID (using call, to avoid receiving a transaction)
        const shopId = (await contract.createShop.call(shopName, shopDesc, shopFiat, {from: shopOwner})).toNumber();
        assert.equal(shopId, 0, "Shop id wasn't returned");

        // Listen for NewShop event (owner is indexed)
        let event = contract.NewShop({owner: shopOwner, name: shopName});
        event.watch((err,response) => {
            assert.equal(response.args.owner, shopOwner, "Shop owner was wrong");
            assert.equal(response.args.shopId, shopId, "Shop ID was wrong");
            assert.equal(response.args.name, shopName, "Shop Name was wrong");
            event.stopWatching();
        });

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

        // Make sure the shop count for this owner is correct
        const shopIds = await contract.getShopIds(shopOwner);
        assert.equal(shopIds.length, 1, "Shop count wasn't correct");

    });

    it("should allow an existing shop owner to create another shop", async function() {

        // The name and description of the new shop
        const shopName = "Fairly Regal Pawn";
        const shopDesc = "Cheap stuff, pricey!";
        const shopFiat = "USD";

        // Get the Shop ID (using call, to avoid receiving a transaction)
        const shopId = (await contract.createShop.call(shopName, shopDesc, shopFiat, {from: shopOwner})).toNumber();
        assert.equal(shopId, 1, "Shop id wasn't returned");

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

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
        const shopFiat = "USD";
        const shopId = 0;

        // Make sure the owner's Shop count is correct
        const shop = await contract.getShop(shopId);

        assert.equal(shop[0], shopOwner, "Shop owner address was wrong");
        assert.equal(shop[1].toNumber(), shopId,    "Shop ID was wrong");
        assert.equal(shop[2], shopName,  "Shop name was wrong");
        assert.equal(shop[3], shopDesc,  "Shop description was wrong");
        assert.equal(shop[4], shopFiat,  "Shop fiat currency was wrong");

    });


});
