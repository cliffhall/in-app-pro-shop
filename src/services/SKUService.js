
export const fetchSKUIds = async (contract, shopId) => {

    const ids = await contract.methods.getSKUIds(shopId).call();

    return ids;
};

export const fetchSKU = id => {

};