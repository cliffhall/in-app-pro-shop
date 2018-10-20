let ProShop = artifacts.require("./ProShop.sol");

module.exports = deployer => {
    deployer.then(async () => {

        const proShop = await deployer.deploy(ProShop);
        await proShop.unpause();
    });
};
