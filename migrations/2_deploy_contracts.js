var ProShopCore = artifacts.require("./ProShopCore.sol");

module.exports = deployer => {
    deployer.then(async () => {

        const proShopCore = await deployer.deploy(ProShopCore);

        // Deploy any sibling contracts...

        await proShopCore.unpause();
    });
};
