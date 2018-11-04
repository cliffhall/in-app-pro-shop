import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import shopReducer from './shop/ShopReducer';
import skuTypeReducer from './sku_type/SKUTypeReducer';
import accountReducer from './account/AccountReducer';

const loggerMiddleware = createLogger();

// Root reducer
const rootReducer = combineReducers({
    shopState: shopReducer,
    skuTypeState: skuTypeReducer,
    accountState: accountReducer
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
