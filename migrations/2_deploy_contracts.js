let ProShop = artifacts.require("./ProShop.sol");
let StockRoom = artifacts.require("./StockRoom.sol");
let FiatContract = artifacts.require("./FiatContract.sol");

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy the third-party FiatContract Contract
        const fiatContract = await deployer.deploy(FiatContract);

        // Deploy the StockRoom Contract
        const stockRoom = await deployer.deploy(StockRoom);

        // Deploy the ProShop Contract
        const proShop = await deployer.deploy(ProShop);

        console.log('Setting FiatContact address');
        await stockRoom.setFiatContractAddress(fiatContract.address);

        console.log('Setting StockRoom Contract address');
        await proShop.setStockRoomContractAddress(stockRoom.address);

        // Unpause the ProShop contract
        await proShop.unpause();
    });
};
