// Service functions
import { fetchShopIds } from '../../services/shop.service';

// Shop related actions
export const IDS_REQUESTED  = 'shop/ids-requested';
export const IDS_FETCHED    = 'shop/ids-fetched';
export const SHOP_REQUESTED = 'shop/shop-requested';
export const SHOP_FETCHED   = 'shop/shop-fetched';
export const CREATING_SHOP  = 'shop/creating';

// Get Ethereum accounts controlled by client
export const getShopIds = owner => {

    return async function(dispatch) {

        dispatch({
            type: IDS_REQUESTED,
            fetchingIds: true,
            idsFetched: false
        });

        // Get the shop ids
        const ids = await fetchShopIds(owner);

        dispatch({
            type: IDS_FETCHED,
            fetchingIds: false,
            idsFetched: true,
            ids
        });

        // Fetch the shops
        if(ids && ids.length) {
            dispatch(getShops(ids))
        }
    }
};

export const getShops = ids => {

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
