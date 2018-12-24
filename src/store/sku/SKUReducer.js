import {
    IDS_FETCHED,
    IDS_REQUESTED,
    SKUS_REQUESTED,
    SKUS_FETCHED,
    PRICE_CHANGED,
    NAME_CHANGED,
    DESC_CHANGED,
    CONSUMABLE_CHANGED,
    LIMITED_CHANGED,
    LIMIT_CHANGED,
    TOGGLE_FORM,
    SKU_CREATED
} from "../sku/SKUActions";

import { ACCOUNT_SELECTED } from "../account/AccountActions";
import { SHOP_SELECTED } from "../shop/ShopActions";

const INITIAL_STATE = {
    newSKU: {
        shopId: null,
        skuId: null,
        skuTypeId: null,
        price: 0,
        name: "",
        description: "",
        consumable: false,
        limited: false,
        limit: 0
    },
    skuFormDisplayed: false,
    creatingSKU: false,

    fetchingIds: false,
    idsFetched: false,
    ids:[],

    fetchingSKUs: false,
    skusFetched: false,
    skus: [],

    selectedSKU: null

};

function skuReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case ACCOUNT_SELECTED:
        case SHOP_SELECTED:
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

        case SKUS_REQUESTED:
            reduced = {
                ...state,
                fetchingSKUs: action.fetchingSKUs,
                skusFetched: action.skusFetched,
            };
            break;

        case SKUS_FETCHED:
            reduced = {
                ...state,
                fetchingSKUs: action.fetchingSKUs,
                skusFetched: action.skusFetched,
                skus: action.skus
            };
            break;

        case TOGGLE_FORM:
            reduced = {
                ...state,
                skuFormDisplayed: !state.skuFormDisplayed,
                newSKU: INITIAL_STATE.newSKU
            };
            break;

        case PRICE_CHANGED:
            reduced = {
                ...state,
                newSKU: {
                    ...state.newSKU,
                    price: action.price,
                }
            };
            break;

        case NAME_CHANGED:
            reduced = {
                ...state,
                newSKU: {
                    ...state.newSKU,
                    name: action.name,
                }
            };
            break;

        case DESC_CHANGED:
            reduced = {
                ...state,
                newSKU: {
                    ...state.newSKU,
                    description: action.description,
                }
            };
            break;

        case CONSUMABLE_CHANGED:
            reduced = {
                ...state,
                newSKU: {
                    ...state.newSKU,
                    consumable: action.consumable,
                }
            };
            break;

        case LIMITED_CHANGED:
            reduced = {
                ...state,
                newSKU: {
                    ...state.newSKU,
                    limited: action.limited,
                }
            };
            break;

        case LIMIT_CHANGED:
            reduced = {
                ...state,
                newSKU: {
                    ...state.newSKU,
                    limit: action.limit,
                }
            };
            break;

        case SKU_CREATED:
            reduced = {
                ...state,
                ids: state.ids.concat([action.sku.skuId]),
                skus: state.skus.concat([action.sku]),
                creatingSKU: action.creatingSKU,
                newSKU: INITIAL_STATE.newSKU,
                skuFormDisplayed: action.skuFormDisplayed
            };
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default skuReducer;