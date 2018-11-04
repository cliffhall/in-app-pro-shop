// Service functions
import { fetchShopIds, fetchShops } from '../../services/ShopService';

// Shop related actions
export const IDS_REQUESTED    = 'shop/ids-requested';
export const IDS_FETCHED      = 'shop/ids-fetched';
export const SHOPS_REQUESTED  = 'shop/items-requested';
export const SHOPS_FETCHED    = 'shop/items-fetched';
export const SHOP_SELECTED    = 'shop/selected';
export const CREATING_SHOP    = 'shop/creating';

export const getShops = (contract, owner) => {

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
        let shops = [];
        if (ids && ids.length) {

            dispatch({
                type: SHOPS_REQUESTED,
                fetchingShops: true,
                shopsFetched: false
            });

            shops = await fetchShops(contract, ids);
        }

        dispatch({
            type: SHOPS_FETCHED,
            fetchingShops: false,
            shopsFetched: true,
            shops
        });

    }
};

export const selectShop = shopId => {

    return {
        type: SHOP_SELECTED,
        selectedShopId: shopId
    };

};

export const createShop = (owner, name, desc) => {
    return {
        type: CREATING_SHOP,
        creatingShop: true,
        owner,
        name,
        desc
    };
};
