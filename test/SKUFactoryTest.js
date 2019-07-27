const StockRoom = artifacts.require("./StockRoom.sol");
const FiatContract = artifacts.require("./FiatContract.sol");
const exceptions = require ("./util/Exceptions");

contract('SKUFactory', function(accounts) {

    let contract, fiatContract, shopId, skuTypeId;
    const franchiseOwner = accounts[0];
    const shopOwner = accounts[1];
    const notShopOwner = accounts[2];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const shopFiat = "USD";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";
    const skuName = "Magic Sword";
    const skuDesc = "Flaming. Kills Orcs.";
    const consumable = false;
    const limited = true;
    const limit = 5000;
    const ethQuote = 10000000000000;
    const usdQuote = 33652131190000;
    const eurQuote = 40154176530000;
    const gbpQuote = 44664290720000;
    const skuPrice = 5;
    const itemAmount = skuPrice * usdQuote;

    // Set up a shop for this test suite
    before(async () => {

        fiatContract = await FiatContract.deployed();
        await fiatContract.update(0, "ETH", ethQuote, usdQuote, eurQuote, gbpQuote, {from: franchiseOwner});

        // Get the contract instance for this suite
        contract = await StockRoom.new();
        await contract.setFiatContractAddress(fiatContract.address);

        // Unpause the contracts
        await contract.unpause();

        // Get the Shop ID to be created
        shopId = (await contract.createShop.call(shopName, shopDesc, shopFiat, {from: shopOwner}));

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, shopFiat, {from: shopOwner});

        // Get the SKUType to be created
        skuTypeId = (await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner}));

        // Create a SKUType
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

    });

    it("should not allow someone other than shop owner to create a SKU for a Shop", async function() {

        await exceptions.catchRevert(contract.createSKU(shopId, skuTypeId, skuPrice, skuName, skuDesc, consumable, limited, limit, {from: notShopOwner}));

    });

    it("should allow a shop owner to create a SKU of an existing SKU Type for their Shop", async function() {

        // First, get the skuTypeID with a call so it doesn't return a transaction
        const skuId = await contract.createSKU.call(shopId, skuTypeId, skuPrice, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Listen for NewSKU event (filter events by shopId)
        /* When Ganache 7.0 comes out we can move to web3 ^1.2.x and rework events. for now, tests are broken
        let event = contract.NewSKU({shopId: shopId});
        contract.NewSKU().watch((err,response) => {
            assert.equal(response.args.shopId, shopId, "Shop ID wasn't correct");
            assert.equal(response.args.skuId, skuId, "SKU ID wasn't correct");
            assert.equal(response.args.name, skuName, "SKU Name wasn't correct");
        });
        */
        // Now do it for real
        await contract.createSKU(shopId, skuTypeId, skuPrice, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Get the count of SKUs for the Shop
        const skuIds = await contract.getSKUIds(shopId);
        assert.equal(skuIds.length, 1, "Shop SKU count wasn't correct");

        // verify contents of SKU
        const item = await contract.getSKU(skuId);

        assert.equal(Object.keys(item).length, 9, "SKU field count wasn't correct");
        assert.equal(item[0].toNumber(), shopId, "Shop ID field wasn't correct");
        assert.equal(item[1].toNumber(), skuId, "SKU ID field wasn't correct");
        assert.equal(item[2].toNumber(), skuTypeId, "SKU Type id field wasn't correct");
        assert.equal(item[3].toNumber(), skuPrice, "SKU price field wasn't correct");
        assert.equal(item[4], skuName, "SKU name field wasn't correct");
        assert.equal(item[5], skuDesc, "SKU description field wasn't correct");
        assert.equal(item[6], consumable, "consumable field wasn't correct");
        assert.equal(item[7], limited, "limited field wasn't correct");
        assert.equal(item[8].toNumber(), limit, "limit field wasn't correct");

        // verify that price in Ether is correct
        const priceInEther = await contract.getPriceInEther(skuId);
        assert.equal(priceInEther, itemAmount, "Item amount wasn't correct");
    });

});
