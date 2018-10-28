// Action type constants
import {
    IDS_REQUESTED,
    IDS_FETCHED,
    SHOPS_REQUESTED,
    SHOPS_FETCHED,
    CREATING_SHOP,
//    SHOP_REQUESTED
} from './ShopActions';

import {
    ACCOUNT_SELECTED
} from "../account/AccountActions";

// Initial state
const INITIAL_STATE = {
    newShop: {
        shopId: null,
        shopName: null,
        creatingShop: false
    },

    fetchingIds: false,
    idsFetched: false,
    ids:[],

    fetchingShops: false,
    shopsFetched: false,
    shops:[]
};

// Shop reducer
function shopReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case ACCOUNT_SELECTED:
            reduced = INITIAL_STATE;
            break;

        case IDS_REQUESTED:
            reduced = {
                ...state,
                fetchingIds: action.fetchingIds,
                idsFetched: action.idsFetched
            };
            break;

        case IDS_FETCHED:
            reduced = {
                ...state,
                fetchingIds: action.fetchingIds,
                idsFetched: action.idsFetched,
                shopIds: action.ids
            };
            break;

        case SHOPS_REQUESTED:
            reduced = {
                ...state,
                fetchingShops: action.fetchingShops,
                shopsFetched: action.shopsFetched,
            };
            break;

        case SHOPS_FETCHED:
            reduced = {
                ...state,
                fetchingShops: action.fetchingShops,
                shopsFetched: action.shopsFetched,
                shops: action.shops
            };
            break;



        case CREATING_SHOP:
            reduced = {
                ...state,
                newShop: {
                    creatingShop: action.creatingShop,
                    shopName: action.shopName
                }
            };
            break;


        default:
            reduced = state;
    }
    return reduced;
}

export default shopReducer;