import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import shopReducer from './shop/shop.reducer';
//import skuReducer from './sku/reducer';
//import userReducer from './user/reducer';
//import walletReducer from './wallet/reducer';
import web3Reducer from './web3/web3.reducer';

const loggerMiddleware = createLogger();

// Root reducer
const rootReducer = combineReducers({
    shopState: shopReducer,
    //skuState: skuReducer,
    //userState: userReducer,
    //walletState: walletReducer,
    web3State: web3Reducer
});


// Store
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;
