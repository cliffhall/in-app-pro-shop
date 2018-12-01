const ProShop = artifacts.require("./ProShop.sol");
const exceptions = require ('./util/Exceptions');
const accounting = require('./util/Accounting');

contract('ProShop', function(accounts) {

    let contract, shopId, skuTypeId, skuId;
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
        // Get the contract contractance for this suite
        contract = await ProShop.new();

        // Invoke the function with 'call' to get the return value contractead of the transaction
        // NOTE: this doesn't actually write the data
        shopId = (await contract.createShop.call(shopName, shopDesc, {from: shopOwner})).toNumber();

        // Now call the function for real and write the data
        await contract.createShop(shopName, shopDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuTypeId = (await contract.createSKUType.call(shopId, skuTypeName, skuTypeDesc, {from: shopOwner})).toNumber();

        // Now do it for real
        await contract.createSKUType(shopId, skuTypeName, skuTypeDesc, {from: shopOwner});

        // First, get the skuTypeID with a call so it doesn't return a transaction
        skuId = (await contract.createSKU.call(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner})).toNumber();

        // Now do it for real
        await contract.createSKU(shopId, skuTypeId, price, skuName, skuDesc, consumable, limited, limit, {from: shopOwner});

        // Purchase an item
        await contract.createItem(shopId, skuId, {from: customer, value: price});

        // Purchase a second item
        await contract.createItem(shopId, skuId, {from: customer, value: price});

    });

    it("should allow the franchise owner to check their balance", async function() {

        // Calculate expected balance
        const expected = web3.toBigNumber(accounting.calcFee(price * 2, franchiseFeePercent));

        // Get franchise balance
        const balance = await contract.checkFranchiseBalance({from: franchiseOwner});
        assert.equal(balance.toNumber(), expected.toNumber(), "Balance wasn't correct");

    });

    it("should not allow anyone else to check the franchise balance", async function() {

        // Try to let shop owner check franchise balance
        await exceptions.catchRevert(contract.checkFranchiseBalance({from: shopOwner}));

    });

    it("should allow the franchise owner to withdraw their balance", async function() {

        // Get amount to withdraw from the contract
        const withdrawal = web3.toBigNumber(accounting.calcFee(price * 2, franchiseFeePercent));

        // Listen for FranchiseBalanceWithdrawn event
        contract.FranchiseBalanceWithdrawn().watch((err,response) => {
            assert.equal(response.args.amount.toNumber(), withdrawal.toNumber());
        });

        // Get the franchise owner's balance before the withdrawal
        const initial = await web3.eth.getBalance(franchiseOwner);

        // Withdraw and get receipt
        const receipt = await contract.withdrawFranchiseBalance({from: franchiseOwner});

        // Calculate the cost of the transaction
        const gasUsed = receipt.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(receipt.tx);
        const txCost = web3.toBigNumber(tx.gasPrice * gasUsed);

        // Get the franchise owner's balance after the withdrawal
        const final = await web3.eth.getBalance(franchiseOwner);

        // Franchise owner's balance should be increased by the amount withdrawn less the transaction cost
        assert.equal(initial.plus(withdrawal).minus(txCost).toNumber(), final.toNumber(), "Amount incorrect");
    });


    it("should allow the shop owner to check their balance", async function() {

        // Calc expected balance
        const expected = web3.toBigNumber(accounting.calcNet(price * 2, franchiseFeePercent));

        // Get the shop balance
        const balance = await contract.checkShopBalance(shopId, {from: shopOwner});
        assert.equal(balance.toNumber(), expected.toNumber(), "Balance wasn't correct");

    });

    it("should allow the shop owner to withdraw their balance", async function() {

        // Get amount to withdraw from the contract
        const withdrawal = web3.toBigNumber(accounting.calcNet(price * 2, franchiseFeePercent));

        // Listen for ShopBalanceWithdrawn event
        contract.ShopBalanceWithdrawn().watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId);
            assert.equal(response.args.amount.toNumber(), withdrawal.toNumber());
        });

        // Get the shop owner's balance before the withdrawal
        const initial = await web3.eth.getBalance(shopOwner);

        // Withdraw and get receipt
        const receipt = await contract.withdrawShopBalance(shopId, {from: shopOwner});

        // Calculate the cost of the transaction
        const gasUsed = receipt.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(receipt.tx);
        const txCost = web3.toBigNumber(tx.gasPrice * gasUsed);

        // Get the shop owner's balance after the withdrawal
        const final = await web3.eth.getBalance(shopOwner);

        // Shop owner's balance should be increased by the amount withdrawn less the transaction cost
        assert.equal(initial.plus(withdrawal).minus(txCost).toNumber(), final.toNumber(), "Amount incorrect");
    });

    it("should not allow anyone else to check the shop balance", async function() {

        // Try to let customer check shop balance
        await exceptions.catchRevert(contract.checkShopBalance(shopId, {from: customer}));

    });
});
