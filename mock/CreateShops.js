// Create mock shops
const StockRoom = artifacts.require("./StockRoom.sol");

module.exports = async function(done){

    const shopOwner = '0x377Ee1E0E98E6AF5Ea8A5D1c5a730bdFB058C5Bc';
    const names = ["Barely Legal Pawn", "Fairly Regal Pawn"];
    const descs = ["Great stuff, cheap!", "Cheap stuff, pricey!"];
    const fiat = 'USD';
    let contract = await StockRoom.deployed();
    let promises = names.map( (name,idx) => contract.createShop(name, descs[idx], fiat, {from: shopOwner}) );
    try {
        await Promise.all(promises);
        console.log('Shops created.');
    } catch (error) {
        console.log(error.message);
    }
    done();

};