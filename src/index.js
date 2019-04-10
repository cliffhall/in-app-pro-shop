import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from "drizzle";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import ProShop from './abi/ProShop.json';
import StockRoom from './abi/StockRoom.json';
import App from './components/App'
import store from './store';

const drizzleOptions = {
    contracts: [
        ProShop,
        StockRoom
    ],
    events: {
        ProShop: [
            'NewItem',
            'ShopBalanceWithdrawn',
            'FranchiseBalanceWithdrawn'
        ],
        StockRoom: [
            'NewShop',
            'NewSKUType',
            'NewSKU'
        ]
    },
    web3:{
        fallback: {
            type: 'ws',
            url: 'wss://127.0.0.1:7545'
        }
    }
};
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

function render() {
    ReactDOM.render(
        <DrizzleContext.Provider drizzle={drizzle}>
            <Provider store={store}>
                <DrizzleContext.Consumer>
                    {drizzleContext => {
                        return  <App drizzleContext={drizzleContext}/>
                    }}
                </DrizzleContext.Consumer>
            </Provider>
        </DrizzleContext.Provider>,
        document.getElementById('app')
    )
}

render();