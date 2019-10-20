// Create mock SKU Types
const StockRoom = artifacts.require("./StockRoom.sol");

module.exports = async function(done){

    const shopOwner = '0x377Ee1E0E98E6AF5Ea8A5D1c5a730bdFB058C5Bc';
    const shopIds = [0,1];
    const names  = [
        ["Weapons", "Spells"],
        ["Avatars", "Clothing"]
    ];
    const descs = [
        ["Defend, attack, do what you need to do.", "Strong magic to heal what ails ya."],
        ["Be whoever you want. On the internet, no one knows you're a potato.", "Dress your best, shame all the rest!"]
    ];

    let contract = await StockRoom.deployed();
    let promises = [];
    shopIds.forEach( (shopId, x) => {
        names[x].forEach( (nameSet, y) => {
                promises.push(contract.createSKUType(shopIds[x], names[x][y], descs[x][y], {from: shopOwner}));
            }
        )
    } );
    try {
        await Promise.all(promises);
        console.log('SKU Types created.');
    } catch (error) {
        console.log(error.message);
    }
    done();

};