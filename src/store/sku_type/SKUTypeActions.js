import { SKUType } from "../../domain";
import { fetchSKUTypeIds, fetchSKUTypes, createSKUType } from '../../services/SKUTypeService';

export const IDS_REQUESTED        = 'sku-type/ids-requested';
export const IDS_FETCHED          = 'sku-type/ids-fetched';
export const SKU_TYPES_REQUESTED  = 'sku-type/items-requested';
export const SKU_TYPES_FETCHED    = 'sku-type/items-fetched';
export const TOGGLE_FORM          = 'sku-type/toggle-form';
export const NAME_CHANGED         = 'sku-type/name-changed';
export const DESC_CHANGED         = 'sku-type/description-changed';
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

export const toggleTypeForm = () => {

    return {
        type: TOGGLE_FORM
    };

};

export const createNewSKUType = (contract, owner, shopId, name, description) => {

    return async function(dispatch) {

        dispatch({
            type: CREATING_SKU_TYPE,
            creatingSKUType: true,
            shopId,
            name,
            description
        });

        await createSKUType(contract, owner, shopId, name, description, event => {

                const skuTypeId = event.returnValues[1];
                const skuType = new SKUType(shopId, skuTypeId, name, description);
                dispatch({
                    type: SKU_TYPE_CREATED,
                    skuType,
                    creatingSKUType: false,
                    skuTypeFormDisplayed: false
                });
            }
        );
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