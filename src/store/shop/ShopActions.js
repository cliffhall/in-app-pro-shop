// Service functions
import { fetchShopIds, fetchShops } from '../../services/ShopService';

// Shop related actions
export const IDS_REQUESTED    = 'shop/ids-requested';
export const IDS_FETCHED      = 'shop/ids-fetched';

export const SHOPS_REQUESTED  = 'shop/shops-requested';
export const SHOPS_FETCHED    = 'shop/shops-fetched';

export const CREATING_SHOP    = 'shop/creating';

// Get Ethereum accounts controlled by client
export const getShopIds = (contract, owner) => {

    return async function(dispatch) {

        dispatch({
            type: IDS_REQUESTED,
            fetchingIds: true,
            idsFetched: false
        });

        // Get the shop ids
        const ids = await fetchShopIds(contract, owner);

        dispatch({
            type: IDS_FETCHED,
            fetchingIds: false,
            idsFetched: true,
            ids
        });

        // Fetch the shops
        if(ids && ids.length) {
            dispatch(getShops(contract, ids))
        }
    }
};

export const getShops = (contract, ids) => {
    return async function(dispatch) {

        dispatch({
            type: SHOPS_REQUESTED,
            fetchingShops: true,
            shopsFetched: false
        });

        // Get the shop ids
        const shops = await fetchShops(contract, ids);

        dispatch({
            type: SHOPS_FETCHED,
            fetchingShops: false,
            shopsFetched: true,
            shops
        });

    }
};


// Create a shop
export const createShop = (owner, name, desc) => {
    return {
        type: CREATING_SHOP,
        creatingShop: true,
        owner,
        name,
        desc
    };
};
