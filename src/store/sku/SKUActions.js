import {SKU} from "../../domain";
import { fetchSKUIds, fetchSKUs,createSKU } from '../../services/SKUService';

export const IDS_REQUESTED      = 'sku/ids-requested';
export const IDS_FETCHED        = 'sku/ids-fetched';
export const SKUS_REQUESTED     = 'sku/items-requested';
export const SKUS_FETCHED       = 'sku/items-fetched';
export const TOGGLE_FORM        = 'sku/toggle-form';
export const PRICE_CHANGED      = 'sku/price-changed';
export const NAME_CHANGED       = 'sku/name-changed';
export const DESC_CHANGED       = 'sku/description-changed';
export const CONSUMABLE_CHANGED = 'sku/consumable-changed';
export const LIMITED_CHANGED    = 'sku/limited-changed';
export const LIMIT_CHANGED      = 'sku/limit-changed';
export const CREATING_SKU       = 'sku/creating';
export const SKU_CREATED        = 'sku/created';

export const getSKUs = (contract, shopId) => {

    return async function(dispatch) {

        dispatch({
            type: IDS_REQUESTED,
            fetchingIds: true,
            idsFetched: false
        });

        // Get the SKU ids
        const ids = await fetchSKUIds(contract, shopId);

        dispatch({
            type: IDS_FETCHED,
            fetchingIds: false,
            idsFetched: true,
            ids
        });

        // Get the SKUs
        let skus = [];
        if (ids && ids.length) {

            dispatch({
                type: SKUS_REQUESTED,
                fetchingSKUs: true,
                skusFetched: false
            });

            skus = await fetchSKUs(contract, ids);
        }

        dispatch({
            type: SKUS_FETCHED,
            fetchingSKUs: false,
            skusFetched: true,
            skus
        });

    }
};

export const toggleForm = () => {

    return {
        type: TOGGLE_FORM
    };

};

export const createNewSKU = (contract, owner, shopId, skuTypeId, price, name, description, consumable, limited, limit) => {

    return async function(dispatch) {

        dispatch({
            type: CREATING_SKU,
            creatingSKU: true,
            shopId,
            skuTypeId,
            price,
            name,
            description,
            consumable,
            limited,
            limit
        });

        await createSKU(contract, owner, shopId, skuTypeId, price, name, description, consumable, limited, limit, event => {

                const skuId = event.returnValues[1];
                const sku = new SKU(shopId, skuId, skuTypeId, price, name, description, consumable, limited, limit);
                dispatch({
                    type: SKU_CREATED,
                    sku,
                    creatingSKU: false,
                    skuFormDisplayed: false
                });
            }
        );
    };

};


export const priceChanged = price => {

    return {
        type: PRICE_CHANGED,
        price
    };

};

export const nameChanged = name => {

    return {
        type: NAME_CHANGED,
        name
    };

};

export const descChanged = description => {

    return {
        type: DESC_CHANGED,
        description
    };

};

export const consumableChanged = consumable => {

    return {
        type: CONSUMABLE_CHANGED,
        consumable
    };

};

export const limitedChanged = limited => {

    return {
        type: LIMITED_CHANGED,
        limited
    };

};

export const limitChanged = limit => {

    return {
        type: LIMIT_CHANGED,
        limit
    };

};