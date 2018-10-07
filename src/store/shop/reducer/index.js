// Action type constants
import {
    CREATING_SHOP,
//    IDS_REQUESTED,
//    SHOP_REQUESTED
} from '../actions';

// Initial state
const INITIAL_STATE = {
    newShop: {
        shopId: null,
        shopName: null,
        creatingShop: false
    },
    shopIds:[]
};

// Shop reducer
function shopReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
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