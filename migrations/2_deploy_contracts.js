var ProShop = artifacts.require("./ProShop.sol");

module.exports = deployer => {
    deployer.then(async () => {

        const proShopCore = await deployer.deploy(ProShop);

        // Deploy any sibling contracts...

        await proShopCore.unpause();
    });
};
