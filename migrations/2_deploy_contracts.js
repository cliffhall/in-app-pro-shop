var ShopFactory = artifacts.require("./ShopFactory.sol");

module.exports = deployer => {
    deployer.then(async () => {

        const shopFactory = await deployer.deploy(ShopFactory);

        // Deploy any sibling contracts...

        await shopFactory.unpause();
    });
};
