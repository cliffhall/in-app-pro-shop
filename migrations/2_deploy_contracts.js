var Ownable = artifacts.require('openzeppelin-solidity/contracts/ownership/Ownable.sol');
var ItemFactory = artifacts.require("./ItemFactory.sol");
var ShopFactory = artifacts.require("./ShopFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, ItemFactory, ShopFactory);
  deployer.deploy(ItemFactory);
  deployer.deploy(ShopFactory);
};
