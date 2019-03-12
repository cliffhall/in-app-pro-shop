let ProShop = artifacts.require("./ProShop.sol");
let StockRoom = artifacts.require("./StockRoom.sol");
let FiatContract = artifacts.require("./FiatContract.sol");

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy and initialize the third-party FiatContract with currency quotes
        const fiatContract = await deployer.deploy(FiatContract);
        const ethQuote = 1000000000000000000;
        const usdQuote = 33652131190000;
        const eurQuote = 40154176530000;
        const gbpQuote = 44664290720000;
        await fiatContract.update(0, "ETH", ethQuote, usdQuote, eurQuote, gbpQuote);

        // Deploy the StockRoom Contract
        const stockRoom = await deployer.deploy(StockRoom);

        // Deploy the ProShop Contract
        const proShop = await deployer.deploy(ProShop);

        console.log('Setting FiatContact address');
        await stockRoom.setFiatContractAddress(fiatContract.address);

        console.log('Setting StockRoom Contract address');
        await proShop.setStockRoomContractAddress(stockRoom.address);

        // Unpause the contracts
        await proShop.unpause();
        await stockRoom.unpause();
    });
};
