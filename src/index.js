import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './components/App'
//import store from './store';

function render() {
    ReactDOM.render(
        //<Provider store={store}>
            <App/>,
        //</Provider>,
        document.getElementById('app')
    )
}
render();