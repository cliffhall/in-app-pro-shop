// Create mock SKUs
const FiatContract = artifacts.require("./FiatContract.sol");
const ProShop = artifacts.require("./ProShop.sol");

module.exports = async function(done){

    const itemOwner = '0xd36159EC25BF0b1239C0c524e2a3C578FEB5Dc8d';
    const shopIds = [0,1];

    const fiatPrices = [
        [1250, 500],
        [200, 400]
    ];

    const ethPrices = [
        [0,0],
        [0,0]
    ];

    const skus = [
        [0, 1],
        [2, 3]
    ];

    // Get the ETH prices
    let quotes = await FiatContract.deployed();
    let ethCent = await quotes.USD(0);
    shopIds.forEach( shop => {
        fiatPrices[shop].forEach( (price, idx) => {
            ethPrices[shop][idx] = ethCent * price;
        })
    });

    let contract = await ProShop.deployed();
    let sku, promises = [];
    shopIds.forEach( shop => {
        ethPrices[shop].forEach( (price, idx) => {
            for (let i =0; i<5; i++) {
                    sku = skus[shop][idx];
                    console.log(`SHOP: ${shop} SKU ${sku} PRICE ${price}`);
                    promises.push(contract.createItem(shop, sku, {from: itemOwner, value: price}));
            }
        })
    });

    try {
        await Promise.all(promises);
        console.log('Sales created.');
    } catch (error) {
        console.log(error.message);
    }
    done();

};