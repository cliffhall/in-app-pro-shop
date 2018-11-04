import { fetchSKUTypeIds, fetchSKUTypes } from '../../services/SKUTypeService';

export const IDS_REQUESTED        = 'sku-type/ids-requested';
export const IDS_FETCHED          = 'sku-type/ids-fetched';
export const SKU_TYPES_REQUESTED  = 'sku-type/items-requested';
export const SKU_TYPES_FETCHED    = 'sku-type/items-fetched';
export const SKU_TYPE_SELECTED    = 'sku-type/selected';
export const CREATING_SKU_TYPE    = 'sku-type/creating';
export const SKU_TYPE_CREATED     = 'sku-type/created';

export const getSKUTypes = (contract, shopId) => {

    return async function(dispatch) {

        dispatch({
            type: IDS_REQUESTED,
            fetchingIds: true,
            idsFetched: false
        });

        // Get the SKU ids
        const ids = await fetchSKUTypeIds(contract, shopId);

        dispatch({
            type: IDS_FETCHED,
            fetchingIds: false,
            idsFetched: true,
            ids
        });

        // Get the SKUTypes
        let skuTypes = [];
        if (ids && ids.length) {

            dispatch({
                type: SKU_TYPES_REQUESTED,
                fetchingSKUTypes: true,
                skuTypesFetched: false
            });

            skuTypes = await fetchSKUTypes(contract, ids);
        }

        dispatch({
            type: SKU_TYPES_FETCHED,
            fetchingSKUTypes: false,
            skuTypesFetched: true,
            skuTypes
        });


    }
};

export const selectSKUType = skuTypeId => {

    return {
        type: SKU_TYPE_SELECTED,
        selectedSKUTypeId: skuTypeId
    };

};