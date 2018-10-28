// Create mock shops
const ProShop = artifacts.require("./ProShop.sol");

module.exports = function(done){

    const shopOwner = '0x8b7bb2c31bc7e02d84060ca87e8218cb3b57678d';
    ProShop.deployed()
        .then(function(contract){

            // The name and description of the new shop
            const shopName = "Barely Legal Pawn";
            const shopDesc = "Great stuff, cheap!";

            // Now call the function for real and write the data
            contract.createShop(shopName, shopDesc, {from: shopOwner})
                .then(function(tx){
                    console.log(`Created Shop ${shopName}`);
                    done();
            });
        })
        .catch(function(error) {
            console.log(error.message);
            done();
        });

};