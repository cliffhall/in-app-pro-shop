import React, { Component } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';
import SplashView from './SplashView';
import ShopView from './ShopView';
import {PRO_SHOP} from "../constants/Contracts";
import { accountsFetched, selectAccount } from "../store/account/AccountActions";
import { getShops } from "../store/shop/ShopActions";
import { getSKUTypes } from "../store/sku_type/SKUTypeActions";

const Wrapper = styled.section`
  padding: 5em;
`;

class App extends Component {

    componentDidUpdate(prevProps) {
        const {
            accountsFetched,
            selectAccount,
            getShops,
            selectedAccount,
            selectedShopId,
            getSKUTypes,
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
            getShops(drizzle.contracts[PRO_SHOP], selectedAccount);
        }

        // Get SKUTypes when Shop is selected
        if (selectedShopId && selectedShopId !== prevProps.selectedShopId) {
            getSKUTypes(drizzle.contracts[PRO_SHOP], selectedShopId);
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

    render() { return <Wrapper>
            {this.renderNavigation()}
            {this.renderAppContent()}
        </Wrapper>;
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    selectedShopId: state.shopState.selectedShopId,
});

const mapDispatchToProps = (dispatch) => ({
    accountsFetched: accounts => dispatch(accountsFetched(accounts)),
    selectAccount: account => dispatch(selectAccount(account)),
    getShops: (contract, account) => dispatch(getShops(contract, account)),
    getSKUTypes: (contract, shopId) => dispatch(getSKUTypes(contract, shopId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);