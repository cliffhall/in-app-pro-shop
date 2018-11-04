import {
    IDS_REQUESTED,
    IDS_FETCHED,
    SKU_TYPES_REQUESTED,
    SKU_TYPES_FETCHED,
    SKU_TYPE_SELECTED,
    //SKU_TYPE_CREATED
} from './SKUTypeActions';

import {
    ACCOUNT_SELECTED
} from "../account/AccountActions";

const INITIAL_STATE = {
    newSKU: {
        skuId: null,
        skuName: null,
        creatingSKU: false
    },
    fetchingIds: false,
    idsFetched: false,
    ids:[],

    fetchingSKUTypes: false,
    skuTypesFetched: false,
    skuTypes: [],

    selectedSKUTypeId: null
};

function SKUTypeReducer(state=INITIAL_STATE, action) {
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

        case SKU_TYPES_REQUESTED:
            reduced = {
                ...state,
                fetchingSKUTypes: action.fetchingSKUTypes,
                skuTypesFetched: action.skuTypesFetched,
            };
            break;

        case SKU_TYPES_FETCHED:
            reduced = {
                ...state,
                fetchingSKUTypes: action.fetchingSKUTypes,
                skuTypesFetched: action.skuTypesFetched,
                skuTypes: action.skuTypes
            };
            break;

        case SKU_TYPE_SELECTED:
            reduced = {
                ...state,
                selectedSKUTypeId: action.selectedSKUTypeId
            };
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default SKUTypeReducer;