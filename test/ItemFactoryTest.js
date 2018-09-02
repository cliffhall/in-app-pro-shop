const ProShop = artifacts.require("./ProShop.sol");
const exceptions = require('../util/exceptions');
const accounting = require('../util/accounting');

contract('ItemFactory', function(accounts) {

    let contract, shopId, skuTypeId, skuId;
    const shopOwner = accounts[2];
    const itemOwner = accounts[3];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";
    const skuName = "Magic Sword";
    const skuDesc = "Flaming. Kills Orcs.";
    const consumable = false;
    const limited = true;
    const limit = 1;
    const price = web3.toWei(0.5, "ether");
    const franchiseFeePercent = .10;

    // Set up a shop with a SKU Type and SKU for this test suite
    before(async () => {
        // Get the contract contractance for this suite
        contract = await ProShop.deployed();

        // Invoke the function with 'call' to get the return value contractead of the transaction
        // NOTE: this doesn't actually write the data
        shopId = await contract.createShop.call(shopName, shopDesc, {from: shopOwner});

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Now do it for real
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuId = await contract.createSKU.call(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Now do it for real
        await contract.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

    });

    it("should not allow a user to create an Item if the SKU price is not sent", async function() {

        await exceptions.catchRevert(contract.createItem(shopId, skuId, {from: itemOwner, value: price/2}));

    });

    it("should allow a user to create an Item", async function() {

        // Calculate fee
        const fee = accounting.calcFee(price, franchiseFeePercent);

        // Calc net for shop owner
        const net = accounting.calcNet(price, franchiseFeePercent)

        // Get the item id
        const itemId = await contract.createItem.call(shopId, skuId, {from: itemOwner, value: price});
        assert.equal(itemId, 0, "Item id wasn't returned");

        // Listen for ShopBalanceWithdrawn event
        let event = contract.NewItem({shopId: shopId, skuTypeId: skuTypeId, skuId: skuId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId);
            assert.equal(response.args.skuTypeId.toNumber(), skuTypeId);
            assert.equal(response.args.skuId.toNumber(), skuId);
            assert.equal(response.args.itemId.toNumber(), itemId);
            assert.equal(response.args.price.toNumber(), price);
            assert.equal(response.args.fee.toNumber(), fee);
            assert.equal(response.args.net.toNumber(), net);
            event.stopWatching();
        });

        // Create the item
        await contract.createItem(shopId, skuId, {from: itemOwner, value: price});

        // Check the name matches the SKU name
        const name = await contract.getItemName(itemId);
        assert.equal(name, skuName, "Item name wasn't returned");

        // Check the type matches the SKU Type name
        const type = await contract.getItemType(itemId);
        assert.equal(type, skuTypeName, "Item type wasn't returned");

        // Get the total supply of tokens
        const supply = await contract.totalSupply();
        assert.equal(supply, 1, "Total supply not incremented");

        // Get the count of Items owned by item owner
        const ownerTokens = await contract.balanceOf(itemOwner);
        assert.equal(ownerTokens, 1, "Owner token count not incremented");

        // Get the count of Items for the shop
        const shopItemCount = await contract.getShopItemCount(shopId);
        assert.equal(shopItemCount, 1, "Shop Item count wasn't correct");

    });

    it("should not allow a user to create a limited Item when limit has been reached", async function() {

        // Make sure canMint function responds properly
        const canMintAnother = await contract.canMintItem(skuId);
        assert.equal(canMintAnother, false, "Can Mint wasn't correct");

        // Make sure the createItem function doesn't allow minting another Item of this SKU
        await exceptions.catchRevert(contract.createItem(shopId, skuId, {from: itemOwner}));

    });
});
