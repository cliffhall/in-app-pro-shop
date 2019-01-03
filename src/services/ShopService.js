import { Shop } from '../domain';
import { EVENTS } from '../constants';

/**
 * Fetch the Shop Ids for the given owner account
 * @param contract
 * @param owner
 * @returns {number[]}
 */
export const fetchShopIds = async (contract, owner) => {

    return await contract.methods.getShopIds(owner).call();
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

    return shopArrays.map( shopArray => Shop.fromArray(shopArray) );

};

/**
 * Create a new Shop
 * @param contract
 * @param name
 * @param description
 * @param fiat
 * @param owner
 */
export const createShop = async (contract, owner, name, description, fiat, callback) => {

    contract.events[EVENTS.NEW_SHOP]({owner: owner}).once('data', callback);

    contract.methods.createShop(name, description, fiat).send({from: owner});

};

/**
 * Fetch the fiat balance for the given Shop
 * @param contract
 * @param owner
 * @param shopId
 * @returns {number[]}
 */
export const fetchShopBalance = async (contract, owner, shopId) => {

    const fiatBalance = await contract.methods.checkShopBalance(shopId, true).call({from: owner});
    return (fiatBalance / 100).toFixed(2);
};
