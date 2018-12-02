import { SKU } from "../domain";
import EVENTS from "../constants/Events";

export const fetchSKUIds = async (contract, shopId) => {

    return await contract.methods.getSKUIds(shopId).call();
};

export const fetchSKUs = async (contract, ids) => {

    const promises = ids.map(id => contract.methods.getSKU(id).call());

    const skuArrays = await Promise.all(promises);

    return skuArrays.map( skuArray => SKU.fromArray(skuArray) );

};

export const createSKU = async (contract, owner, shopId, skuTypeId, price, name, description, consumable, limited, limit, callback) => {

    contract.events[EVENTS.NEW_SKU]({shopId: shopId}).once('data', callback);

    contract.methods.createSKU(shopId, skuTypeId, price, name, description, consumable, limited, limit).send({from: owner});

};