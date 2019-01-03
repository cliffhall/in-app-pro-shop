const ProShop = artifacts.require("./ProShop.sol");
const StockRoom = artifacts.require("./StockRoom.sol");
const FiatContract = artifacts.require('./FiatContract.sol');
const exceptions = require('./util/Exceptions');
const accounting = require('./util/Accounting');

contract('ItemFactory', function(accounts) {

    let contract, stockRoom, fiatContract, shopId, skuTypeId, skuId;
    const franchiseOwner = accounts[0];
    const shopOwner = accounts[1];
    const itemOwner = accounts[2];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const shopFiat = "USD";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";
    const skuName = "Magic Sword";
    const skuDesc = "Flaming. Kills Orcs.";
    const consumable = false;
    const limited = true;
    const limit = 1;
    const franchiseFeePercent = 3;
    const ethQuote = 1000000000000000000;
    const usdQuote = 33652131190000;
    const eurQuote = 40154176530000;
    const gbpQuote = 44664290720000;
    const skuPrice = 500;
    const itemAmount = skuPrice * usdQuote;

    // Set up a shop with a SKU Type and SKU for this test suite
    before(async () => {

        fiatContract = await FiatContract.deployed();
        await fiatContract.update(0, "ETH", ethQuote, usdQuote, eurQuote, gbpQuote, {from: franchiseOwner});

        // Get the StockRoom contract for this suite
        stockRoom = await StockRoom.new();
        await stockRoom.setFiatContractAddress(fiatContract.address);

        // Get the ProShop contract for this suite
        contract = await ProShop.new();
        await contract.setStockRoomContractAddress(stockRoom.address);

        // Invoke the function with 'call' to get the return value of the transaction
        // NOTE: this doesn't actually write the data
        shopId = await stockRoom.createShop.call(shopName, shopDesc, shopFiat, {from: shopOwner});

        // Now call the function for real and write the data
        await stockRoom.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await stockRoom.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Now do it for real
        await stockRoom.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuId = await stockRoom.createSKU.call(shopId, skuTypeId, skuPrice, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Now do it for real
        await stockRoom.createSKU(shopId, skuTypeId, skuPrice, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

    });

    it("should not allow a user to create an Item if the SKU price is not sent", async function() {

        await exceptions.catchRevert(contract.createItem(shopId, skuId, {from: itemOwner, value: skuPrice/2}));

    });

    it("should calculate the right Item price in ether", async function() {

        // Get the price in ether
        const priceInEther = await stockRoom.getPriceInEther.call(skuId, {from: itemOwner});
        assert.equal(priceInEther.toNumber(), itemAmount, "Item price wasn't correct");

    });

    it("should allow a user to create an Item", async function() {

        // Calculate fee
        const fee = accounting.calcFee(itemAmount, franchiseFeePercent);

        // Calc net for shop owner
        const net = accounting.calcNet(itemAmount, franchiseFeePercent);

        // Make sure canMint function responds properly
        const canMint = await stockRoom.canMintItem(skuId, 0);
        assert.equal(canMint, true, "Can Mint wasn't correct");

        // Get the item id
        const itemId = await contract.createItem.call(shopId, skuId, {from: itemOwner, value: itemAmount});
        assert.equal(itemId.toNumber(), 0, "Item id wasn't returned");

        // Listen for ShopBalanceWithdrawn event
        let event = contract.NewItem({shopId: shopId, skuId: skuId});
        event.watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId);
            assert.equal(response.args.skuId.toNumber(), skuId);
            assert.equal(response.args.itemId.toNumber(), itemId);
            assert.equal(response.args.amount.toNumber(), itemAmount);
            assert.equal(response.args.fee.toNumber(), fee);
            assert.equal(response.args.net.toNumber(), net);
            event.stopWatching();
        });

        // Create the item
        await contract.createItem(shopId, skuId, {from: itemOwner, value: itemAmount});

        // Get the total supply of tokens
        const supply = await contract.totalSupply();
        assert.equal(supply.toNumber(), 1, "Total supply not incremented");

        // Get the count of Items owned by item owner
        const ownerTokens = await contract.balanceOf(itemOwner);
        assert.equal(ownerTokens.toNumber(), 1, "Owner token count not incremented");

        // Get the count of Items for the shop
        const shopItemCount = await contract.getShopItemCount(shopId);
        assert.equal(shopItemCount.toNumber(), 1, "Shop Item count wasn't correct");

    });

    it("should not allow a user to create a limited Item when limit has been reached", async function() {

        // Get the count of Items for the shop
        const skuItemCount = await contract.getSKUItemCount(skuId);
        assert.equal(skuItemCount.toNumber(), 1, "SKUItem count was wrong");

        // Make sure canMint function responds properly
        const canMintAnother = await stockRoom.canMintItem(skuId, skuItemCount.toNumber());
        assert.equal(canMintAnother, false, "Can Mint wasn't correct");

        // Make sure the createItem function doesn't allow minting another Item of this SKU
        await exceptions.catchRevert(contract.createItem(shopId, skuId, {from: itemOwner}));

    });

    it("should allow a user to retrieve a count of their items", async function() {

        // Make sure the owner's Shop count is correct
        const count = await contract.getOwnerItemCount(itemOwner);
        assert.equal(count.toNumber(), 1, "Item count was wrong");

    });

    it("should allow a user to retrieve a list of their items", async function() {

        // Make sure the owner's Shop count is correct
        const count = await contract.getOwnerItemCount(itemOwner);

        // Get the list of ItemIDs for the owner
        const itemIds = await contract.getItemIds(itemOwner);
        assert.equal(itemIds.length, count, "Item list length was wrong");

    });

});
