import { combineReducers } from 'redux';
import { createStore } from 'redux';

// REDUCERS
//import shopReducer from './shop/reducer';
//import skuReducer from './sku/reducer';
//import userReducer from './user/reducer';
//import walletReducer from './wallet/reducer';

// Root reducer
const rootReducer = combineReducers({
    //shopState: shopReducer,
    //skuState: skuReducer,
    //userState: userReducer,
    //walletState: walletReducer,
});

// Store
const store = createStore(rootReducer);

export default store;
