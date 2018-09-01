const ProShop = artifacts.require("./ProShop.sol");
const exceptions = require ('../util/exceptions');
const accounting = require('../util/accounting');

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

        // Purchase an item
        await contract.createItem(shopId, skuId, {from: customer, value: price});

        // Purchase a second item
        await contract.createItem(shopId, skuId, {from: customer, value: price});

    });

    it("should allow the franchise owner to check their balance", async function() {

        // Calculate expected balance
        const expected = accounting.calcFee(web3.fromWei(price * 2), franchiseFeePercent);

        // Get franchise balance
        const balance = (await contract.checkFranchiseBalance({from: franchiseOwner})).toNumber();
        assert.equal(web3.fromWei(balance), expected, "Balance wasn't correct");

    });

    it("should not allow anyone else to check the franchise balance", async function() {

        // Try to let shop owner check franchise balance
        await exceptions.catchRevert(contract.checkFranchiseBalance({from: shopOwner}));

    });

    it("should allow the franchise owner to withdraw their balance", async function() {

        // Get amount to withdraw from the contract
        const withdrawal = accounting.calcFee(web3.fromWei(price * 2), franchiseFeePercent);

        // Listen for FranchiseBalanceWithdrawn event
        contract.FranchiseBalanceWithdrawn().watch((err,response) => {
            assert.equal(web3.fromWei(response.args.amount), withdrawal);
        });

        // Get the franchise owner's balance before the withdrawal
        const initial = web3.fromWei(await web3.eth.getBalance(franchiseOwner)).toNumber();

        // Withdraw and get receipt
        const receipt = await contract.withdrawFranchiseBalance({from: franchiseOwner});

        // Calculate the cost of the transaction
        const gasUsed = receipt.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(receipt.tx);
        const txCost = tx.gasPrice * web3.fromWei(gasUsed);

        // Get the franchise owner's balance after the withdrawal
        const final = web3.fromWei(await web3.eth.getBalance(franchiseOwner)).toNumber();

        // Franchise owner's balance should be increased by the amount withdrawn less the transaction cost
        assert.equal(accounting.calcBalance(initial, withdrawal, txCost), final, "Amount incorrect");
    });


    it("should allow the shop owner to check their balance", async function() {

        // Calc expected balance
        const expected = accounting.calcNet(web3.fromWei(price * 2), franchiseFeePercent);

        // Get the shop balance
        const balance = (await contract.checkShopBalance(shopId, {from: shopOwner})).toNumber();
        assert.equal(web3.fromWei(balance), expected, "Balance wasn't correct");

    });

    it("should allow the shop owner to withdraw their balance", async function() {

        // Get amount to withdraw from the contract
        const withdrawal = accounting.calcNet(web3.fromWei(price * 2), franchiseFeePercent);

        // Listen for ShopBalanceWithdrawn event
        contract.ShopBalanceWithdrawn().watch((err,response) => {
            assert.equal(response.args.shopId.toNumber(), shopId);
            assert.equal(web3.fromWei(response.args.amount), withdrawal);
        });

        // Get the shop owner's balance before the withdrawal
        const initial = web3.fromWei(await web3.eth.getBalance(shopOwner)).toNumber();

        // Withdraw and get receipt
        const receipt = await contract.withdrawShopBalance(shopId, {from: shopOwner});

        // Calculate the cost of the transaction
        const gasUsed = receipt.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(receipt.tx);
        const txCost = tx.gasPrice * web3.fromWei(gasUsed);

        // Get the shop owner's balance after the withdrawal
        const final = web3.fromWei(await web3.eth.getBalance(shopOwner)).toNumber();

        // Shop owner's balance should be increased by the amount withdrawn less the transaction cost
        assert.equal(accounting.calcBalance(initial, withdrawal, txCost), final, "Amount incorrect");
    });

    it("should not allow anyone else to check the shop balance", async function() {

        // Try to let customer check shop balance
        await exceptions.catchRevert(contract.checkShopBalance(shopId, {from: customer}));

    });
});
