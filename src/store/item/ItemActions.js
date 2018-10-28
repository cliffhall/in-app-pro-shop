import { fetchSKUIds, fetchSKU } from '../../services/SKUService';

export const IDS_REQUESTED  = 'sku/ids-requested';
export const IDS_FETCHED    = 'sku/ids-fetched';
export const SKU_REQUESTED  = 'sku/sku-requested';
export const SKU_FETCHED    = 'sku/sku-fetched';
export const CREATING_SKU   = 'sku/creating';
export const SKU_CREATED    = 'sku/created';

export const getSKUIds = shopId => {

    return async function(dispatch) {

        dispatch({
            type: IDS_REQUESTED,
            fetchingSKUIds: true,
            skuIdsFetched: false
        });

        // Get the SKU ids
        const ids = await fetchSKUIds(shopId);

        dispatch({
            type: IDS_FETCHED,
            fetchingIds: false,
            idsFetched: true,
            ids
        });

        // Fetch the SKUs
        if(ids && ids.length) {
            dispatch(getSKUs(ids))
        }
    }
};

export const getSKUs = ids => {
    return async function(dispatch) {



    }
};
