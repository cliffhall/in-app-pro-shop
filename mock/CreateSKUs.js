// Create mock SKUs
const StockRoom = artifacts.require("./StockRoom.sol");

module.exports = async function(done){

    const shopOwner = '0x377Ee1E0E98E6AF5Ea8A5D1c5a730bdFB058C5Bc';
    const shopIds = [0,1];
    const skuTypeIds = [
        [0,1],
        [2,3]
    ];

    const prices  = [
        [1250, 500],
        [200, 400]
    ];

    const consumable  = [
        [false, true],
        [false, false]
    ];

    const limited = [
        [true, false],
        [false, false]
    ];

    const limit = [
        [500, 0],
        [0, 0]
    ];

    const names  = [
        ["Sword of Destiny", "Invisibility Spell"],
        ["Wizard", "Purple Velvet Robe"]
    ];
    const descs = [
        ["You were meant to wield this blade, you just know it.", "Hide your bad self in plain sight!"],
        ["Cast spells, turn your enemies into frogs, whatever.", "Aww hells, yes. Pimp don't do it justice."]
    ];

    let contract = await StockRoom.deployed();
    let promises = [];
    shopIds.forEach( (shopId, x) => {
        skuTypeIds[x].forEach( (id, y) => {
                promises.push(contract.createSKU(
                    shopIds[x],
                    skuTypeIds[x][y],
                    prices[x][y],
                    names[x][y],
                    descs[x][y],
                    consumable[x][y],
                    limited[x][y],
                    limit[x][y],
                    {from: shopOwner}
                    )
                );
            }
        )
    } );
    try {
        await Promise.all(promises);
        console.log('SKUs created.');
    } catch (error) {
        console.log(error.message);
    }
    done();

};