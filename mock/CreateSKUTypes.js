// Create mock SKU Types
const ProShop = artifacts.require("./ProShop.sol");

module.exports = async function(done){

    const shopOwner = '0x8b7bb2c31bc7e02d84060ca87e8218cb3b57678d';
    const shopIds = [0,1];
    const names  = [
        ["Weapons", "Spells"],
        ["Avatars", "Clothing"]
    ];
    const descs = [
        ["Defend, attack, do what you need to do.", "Strong magic to heal what ails ya."],
        ["Be whoever you want. On the internet, no one knows you're a potato.", "Dress your best, shame all the rest!"]
    ];

    let contract = await ProShop.deployed();
    let promises = [];
    shopIds.forEach( (shopId, x) => {
        names[x].forEach( (name, y) => {
                promises.push(contract.createSKUType(shopIds[x], name[y], descs[x][y], {from: shopOwner}));
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