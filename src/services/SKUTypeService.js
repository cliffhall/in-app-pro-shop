import { SKUType } from "../domain";
import { EVENTS } from "../constants";

export const fetchSKUTypeIds = async (contract, shopId) => {

    return await contract.methods.getSKUTypeIds(shopId).call();

};

export const fetchSKUTypes = async (contract, ids) => {

    const promises = ids.map(id => contract.methods.getSKUType(id).call());

    const skuTypeArrays = await Promise.all(promises);

    return skuTypeArrays.map( skuTypeArray => SKUType.fromArray(skuTypeArray) );

};

export const createSKUType = async (contract, owner, shopId, name, description, callback) => {

    contract.events[EVENTS.NEW_SKU_TYPE]({shopId: shopId}).once('data', callback);

    contract.methods.createSKUType(shopId, name, description).send({from: owner});

};