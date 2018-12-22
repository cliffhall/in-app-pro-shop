import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ThemeProvider} from "styled-components";

import NavigationBar from './NavigationBar';
import SplashView from './SplashView';
import ShopView from './ShopView';
import theme from "../styles/theme";

import { CONTRACTS } from "../constants";
import { getShops } from "../store/shop/ShopActions";
import { getSKUs } from "../store/sku/SKUActions";
import { getSKUTypes } from "../store/sku_type/SKUTypeActions";
import { accountsFetched, selectAccount } from "../store/account/AccountActions";

import {AppWrapper} from "../styles";

class App extends Component {

    componentDidUpdate(prevProps) {
        const {
            accountsFetched,
            selectAccount,
            getShops,
            selectedAccount,
            selectedShopId,
            getSKUTypes,
            getSKUs,
            accounts
        } = this.props;

        const {drizzleState, drizzle, initialized} = this.props.drizzleContext;

        // Store the accounts when drizzle initializes
        if (initialized && !prevProps.drizzleContext.initialized) {
            if (Object.keys(drizzleState.accounts).length) {
                accountsFetched(Object.values(drizzleState.accounts));
            }
        }

        // Select the first account when the accounts are fetched
        if (accounts && accounts.length && !prevProps.accounts) {
            selectAccount(accounts[0]);
        }

        // Get Shops when account is selected
        if (selectedAccount && selectedAccount !== prevProps.selectedAccount) {
            getShops(drizzle.contracts[CONTRACTS.STOCK_ROOM], selectedAccount);
        }

        // Get SKUs & SKUTypes when Shop is selected
        if (selectedShopId && selectedShopId !== prevProps.selectedShopId) {
            getSKUTypes(drizzle.contracts[CONTRACTS.STOCK_ROOM], selectedShopId);
            getSKUs(drizzle.contracts[CONTRACTS.STOCK_ROOM], selectedShopId);
        }

    }

    renderNavigation = () => {
        const {drizzle, drizzleState, initialized} = this.props.drizzleContext;
        return <NavigationBar drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>;
    };

    renderAppContent = () => {
        const {drizzle, drizzleState, initialized} =  this.props.drizzleContext;
        return this.props.selectedShopId
            ? <ShopView drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>
            : <SplashView drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>;
    };

    render() { return <ThemeProvider theme={this.props.theme}>
        <AppWrapper>
            {this.renderNavigation()}
            {this.renderAppContent()}
        </AppWrapper>
    </ThemeProvider>;
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    selectedShopId: state.shopState.selectedShopId,
    theme: theme.appTheme
});

const mapDispatchToProps = (dispatch) => ({
    accountsFetched: accounts => dispatch(accountsFetched(accounts)),
    selectAccount: account => dispatch(selectAccount(account)),
    getShops: (contract, account) => dispatch(getShops(contract, account)),
    getSKUs: (contract, shopId) => dispatch(getSKUs(contract, shopId)),
    getSKUTypes: (contract, shopId) => dispatch(getSKUTypes(contract, shopId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);