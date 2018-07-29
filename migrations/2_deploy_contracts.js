var Ownable = artifacts.require("./Ownable.sol");
var ItemFactory = artifacts.require("./ItemFactory.sol");
var ShopFactory = artifacts.require("./ShopFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, ItemFactory);
  deployer.deploy(ItemFactory);
  deployer.link(Ownable, ShopFactory);
  deployer.deploy(ShopFactory);
};
