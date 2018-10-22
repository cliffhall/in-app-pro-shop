import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import shopReducer from './shop/shop.reducer';
//import skuReducer from './sku/reducer';
import accountReducer from './account/account.reducer';

const loggerMiddleware = createLogger();

// Root reducer
const rootReducer = combineReducers({
    shopState: shopReducer,
    //skuState: skuReducer,
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
