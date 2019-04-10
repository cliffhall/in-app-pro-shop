import {
    IDS_REQUESTED,
    IDS_FETCHED,
    SHOPS_REQUESTED,
    SHOPS_FETCHED,
    SHOP_SELECTED,
    NAME_CHANGED,
    DESC_CHANGED,
    FIAT_CHANGED,
    CREATING_SHOP,
    SHOP_CREATED,
    BALANCE_REQUESTED,
    BALANCE_FETCHED,
    BALANCE_WITHDRAWING,
    BALANCE_WITHDRAWN
} from './ShopActions';

import {
    ACCOUNT_SELECTED
} from "../account/AccountActions";

const INITIAL_STATE = {
    newShop: {
        owner: null,
        name: "",
        description: "",
        fiat: "USD"
    },
    creatingShop: false,

    fetchingIds: false,
    idsFetched: false,
    ids: null,

    fetchingShops: false,
    shopsFetched: false,
    shops: [],

    selectedShopId: null,
    fetchingShopBalance: false,
    shopBalanceFetched: false,
    selectedShopBalance: 0,
    withdrawingBalance: false,
    balanceWithdrawn: false

};

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
                ids: action.ids
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
                shops: action.shops ? action.shops : []
            };
            break;

        case SHOP_SELECTED:
            reduced = {
                ...state,
                selectedShopId: action.selectedShopId,
                fetchingShopBalance: INITIAL_STATE.fetchingShopBalance,
                shopBalanceFetched: INITIAL_STATE.shopBalanceFetched,
                selectedShopBalance: INITIAL_STATE.selectedShopBalance,
                withdrawingBalance: INITIAL_STATE.withdrawingBalance,
                balanceWithdrawn: INITIAL_STATE.balanceWithdrawn

            };
            break;

        case BALANCE_REQUESTED:
            reduced = {
                ...state,
                fetchingShopBalance: action.fetchingShopBalance,
                shopBalanceFetched: action.shopBalanceFetched
            };
            break;

        case BALANCE_FETCHED:
            reduced = {
                ...state,
                fetchingShopBalance: action.fetchingShopBalance,
                shopBalanceFetched: action.shopBalanceFetched,
                selectedShopBalance: action.selectedShopBalance
            };
            break;

        case BALANCE_WITHDRAWING:
        case BALANCE_WITHDRAWN:
            reduced = {
                ...state,
                withdrawingBalance: action.withdrawingBalance,
                balanceWithdrawn: action.balanceWithdrawn
            };
            break;

        case NAME_CHANGED:
            reduced = {
                ...state,
                newShop: {
                    ...state.newShop,
                    name: action.name,
                }
            };
            break;

        case DESC_CHANGED:
            reduced = {
                ...state,
                newShop: {
                    ...state.newShop,
                    description: action.description,
                }
            };
            break;

        case FIAT_CHANGED:
            reduced = {
                ...state,
                newShop: {
                    ...state.newShop,
                    fiat: action.fiat,
                }
            };
            break;

        case CREATING_SHOP:
            reduced = {
                ...state,
                creatingShop: action.creatingShop,
                newShop: {
                    owner: action.owner,
                    name: action.name,
                    description: action.description,
                    fiat: action.fiat
                }
            };
            break;

        case SHOP_CREATED:
            reduced = {
                ...state,
                ids: state.ids.concat([action.shop.shopId]),
                shops: state.shops.concat([action.shop]),
                creatingShop: action.creatingShop,
                newShop: INITIAL_STATE.newShop
            };
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default shopReducer;