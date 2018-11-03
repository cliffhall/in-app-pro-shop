import {Shop} from '../domain';
export const fetchShopIds = async (contract, owner) => {

    let ids = [];

    ids = await contract.methods.getShopIds(owner).call();

    return ids;
};

export const fetchShops = async (contract, ids) => {

    let promises = ids.map(id => contract.methods.getShop(id).call());

    let shopArrays = await Promise.all(promises);

    let shops = shopArrays.map( shopArray => Shop.fromArray(shopArray) );

    return shops;

};