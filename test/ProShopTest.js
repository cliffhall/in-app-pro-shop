const ProShop = artifacts.require("./ProShop.sol");
const catchRevert = require ('../util/exceptions').catchRevert;
const calcNet = require('../util/accounting').calcNet;
const calcFee = require('../util/accounting').calcFee;

contract('ProShop', function(accounts) {

    let inst, shopId, skuTypeId, skuId;
    const franchiseOwner = accounts[0];
    const shopOwner = accounts[1];
    const customer = accounts[2];
    const shopName = "Rarely Beagle Pawn";
    const shopDesc = "Great mutts, cheap!";
    const skuTypeName = "Weapons";
    const skuTypeDesc = "Things that make you go ouch!";
    const skuName = "Magic Sword";
    const skuDesc = "Flaming. Kills Orcs.";
    const consumable = false;
    const limited = true;
    const limit = 5000;
    const price = web3.toWei(.25, "ether");
    const franchiseFeePercent = .10;

    // Set up a shop with a SKU Type and SKU for this test suite
    before(async () => {
        // Get the contract instance for this suite
        inst = await ProShop.deployed();

        // Invoke the function with 'call' to get the return value instead of the transaction
        // NOTE: this doesn't actually write the data
        shopId = await inst.createShop.call(shopName, shopDesc, {from: shopOwner});

        // Now call the function for real and write the data
        await inst.createShop(shopName, shopDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = await inst.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // Now do it for real
        await inst.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuId = await inst.createSKU.call(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Now do it for real
        await inst.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Purchase an item
        await inst.createItem(shopId, skuId, {from: customer, value: price});

        // Purchase a second item
        await inst.createItem(shopId, skuId, {from: customer, value: price});

    });

    it("should allow the franchise owner to check their balance", async function() {

        // Get franchise balance
        const balance = (await inst.checkFranchiseBalance({from: franchiseOwner})).toNumber();
        assert.equal(balance, calcFee(price * 2, franchiseFeePercent), "Balance wasn't correct");

    });

    it("should not allow anyone else to check the franchise balance", async function() {

        // Try to let shop owner check franchise balance
        await catchRevert(inst.checkFranchiseBalance({from: shopOwner}));

    });

    it("should allow the franchise owner to withdraw their balance", async function() {

        // TODO: Why is this failing??
        // Get franchise balance
        const initialBalance = web3.eth.getBalance(franchiseOwner).toNumber();
        const withdrawalAmount = calcFee(price * 2, franchiseFeePercent);
        const expectedResult = initialBalance + withdrawalAmount;
        await inst.withdrawFranchiseBalance({from: franchiseOwner});
        const result = web3.eth.getBalance(franchiseOwner).toNumber();
        assert.equal(result, expectedResult, "Balance wasn't correct");

    });


    it("should allow the shop owner to check their balance", async function() {

        // Get the shop balance
        const balance = (await inst.checkShopBalance(shopId, {from: shopOwner})).toNumber();
        assert.equal(balance, calcNet(price * 2, franchiseFeePercent), "Balance wasn't correct");

    });

    it("should not allow anyone else to check the shop balance", async function() {

        // Try to let customer check shop balance
        await catchRevert(inst.checkShopBalance(shopId, {from: customer}));

    });
});
