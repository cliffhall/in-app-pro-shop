import SKUType from "../domain/entity/SKUType";

export const fetchSKUTypeIds = async (contract, shopId) => {

    const ids = await contract.methods.getSKUTypeIds(shopId).call();

    return ids;
};

export const fetchSKUTypes = async (contract, ids) => {

    const promises = ids.map(id => contract.methods.getSKUType(id).call());

    const skuTypeArrays = await Promise.all(promises);

    const skuTypes = skuTypeArrays.map( skuTypeArray => SKUType.fromArray(skuTypeArray) );

    return skuTypes;

};

export const createSKUType = async (contract, owner, shopId, name, description) => {

    const skuTypeId = await contract.methods.createSKUType(shopId, name, description).send({from: owner});

    let skuType = new SKUType(shopId, skuTypeId, name, description);

    return skuType;

};