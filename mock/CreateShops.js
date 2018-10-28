// Create mock shops
const ProShop = artifacts.require("./ProShop.sol");

module.exports = async function(done){

    const shopOwner = '0x8b7bb2c31bc7e02d84060ca87e8218cb3b57678d';
    const names = ["Barely Legal Pawn", "Fairly Regal Pawn"];
    const descs = ["Great stuff, cheap!", "Cheap stuff, pricey!"];
    let contract = await ProShop.deployed();
    let promises = names.map( (name,idx) => contract.createShop(name, descs[idx], {from: shopOwner}) );
    try {
        await Promise.all(promises);
        console.log('Shops created.');
    } catch (error) {
        console.log(error.message);
    }
    done();

};