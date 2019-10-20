const StockRoom = artifacts.require("./StockRoom.sol");
const truffleAssert = require('truffle-assertions');
const BN = require('bn.js');

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
        const shopId = 0;

        // Now call the function for real and write the data
        const result = await contract.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewShop', (event) => {
            return (
                event.owner === shopOwner &&
                event.name === shopName &&
                event.shopId.toNumber() === shopId
            );
        }, 'NewShop event should be emitted with correct info');

        // Make sure the shop count for this owner is correct
        const shopIds = await contract.getShopIds(shopOwner);
        assert.equal(shopIds.length, 1, "Shop count wasn't correct");

    });

    it("should allow an existing shop owner to create another shop", async function() {

        // The name and description of the new shop
        const shopName = "Fairly Regal Pawn";
        const shopDesc = "Cheap stuff, pricey!";
        const shopFiat = "USD";
        const shopId = 1;

        // Now call the function for real and write the data
        const result = await contract.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewShop', (event) => {
            return (
                event.owner === shopOwner &&
                event.name === shopName &&
                event.shopId.toNumber() === shopId
            );
        }, 'NewShop event should be emitted with correct info');

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

        assert.equal(Object.keys(shop).length, 5, "Shop field count wasn't correct");
        assert.equal(shop[0], shopOwner, "Shop owner address was wrong");
        assert.equal(shop[1], shopId,    "Shop ID was wrong");
        assert.equal(shop[2], shopName,  "Shop name was wrong");
        assert.equal(shop[3], shopDesc,  "Shop description was wrong");
        assert.equal(shop[4], shopFiat,  "Shop fiat currency was wrong");

    });

});
