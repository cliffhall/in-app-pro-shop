import {Shop} from '../domain';

/**
 * Fetch the Shop Ids for the given owner account
 * @param contract
 * @param owner
 * @returns {number[]}
 */
export const fetchShopIds = async (contract, owner) => {

    let ids = await contract.methods.getShopIds(owner).call();

    return ids;
};

/**
 * Fetch the Shops for the given list of Shop Ids
 * @param contract
 * @param ids
 * @returns {Shop[]}
 */
export const fetchShops = async (contract, ids) => {

    let promises = ids.map(id => contract.methods.getShop(id).call());

    let shopArrays = await Promise.all(promises);

    let shops = shopArrays.map( shopArray => Shop.fromArray(shopArray) );

    return shops;

};

/**
 * Create a new Shop
 * @param contract
 * @param name
 * @param description
 * @param owner
 * @returns {Shop}
 */
export const createShop = async (contract, owner, name, description) => {

    const shopId = await contract.methods.createShop(name, description).send({from: owner});

    let shop = new Shop(owner, shopId, name, description);

    return shop;

};