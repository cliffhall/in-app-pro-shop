import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Glyphicon} from 'react-bootstrap';
import { AppNavbar, AppNavbarHeader, AppNav, AppNavbarBrand, AppNavDropdown, AppMenuItem, AppMonoMenuItem} from '../styles';
import { selectShop } from '../store/shop/ShopActions';
import { selectAccount } from '../store/account/AccountActions';

class NavigationBar extends Component {

    // Open the selected account on etherscan.io
    viewAccountOnEtherscan(selectedAccount) {
        window.open(`https://etherscan.io/address/${selectedAccount}`);
    };

    // Render the accounts menu
    renderAccountsMenu() {
        const {initialized, accounts, selectedAccount, selectAccount, creatingShop} = this.props;
        return initialized && accounts
            ? <AppNavDropdown
                disabled={creatingShop}
                title={`Accounts (${accounts.length})`}
                id='account-dropdown'>
                {accounts.map(
                    account => <AppMonoMenuItem
                        key={account}
                        active={account === selectedAccount}
                        onSelect={() => {if (account !== selectedAccount) selectAccount(account)}}
                    >{account}</AppMonoMenuItem>)}
                <AppMenuItem divider/>
                <AppMenuItem disabled={!selectedAccount}
                          onClick={() => this.viewAccountOnEtherscan(selectedAccount)}>View Selected Account on Etherscan</AppMenuItem>
            </AppNavDropdown>
            : initialized ? <AppNavDropdown title='Accounts' id='account-dropdown'>
                <AppMenuItem disabled={true}>No Accounts</AppMenuItem>
            </AppNavDropdown> : null;
    };

    // Render the shops menu
    renderShopsMenu() {
        const {accounts, shops, selectShop, selectedShopId, creatingShop} = this.props;
        return accounts
            ? <AppNavDropdown
                disabled={creatingShop}
                title={`Shops (${shops.length})`}
                id='shop-dropdown'>
                {shops.length
                    ? shops.map(
                        shop => <AppMenuItem
                            key={shop.shopId}
                            active={shop.shopId === selectedShopId}
                            onSelect={() => selectShop(shop.shopId)}
                        >{shop.name}</AppMenuItem>)
                    : <AppMenuItem disabled={true}>No Shops</AppMenuItem>}
                    <AppMenuItem divider/>
                    <AppMenuItem onClick={() => selectShop(null)} disabled={!selectedShopId}>Create Shop</AppMenuItem>
            </AppNavDropdown>
            : null;
    };

    // Render the Navbar
    render() {

        return <AppNavbar fixedTop={true} collapseOnSelect>
            <AppNavbarHeader>
                <AppNavbarBrand>
                    <Glyphicon glyph="tower"/>
                    &nbsp;
                    In-App Pro Shop
                </AppNavbarBrand>
                <Navbar.Toggle/>
            </AppNavbarHeader>
            <Navbar.Collapse>
                <AppNav pullRight>
                {this.renderShopsMenu()}
                {this.renderAccountsMenu()}
                </AppNav>
            </Navbar.Collapse>
        </AppNavbar>;
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    shops: state.shopState.shops,
    selectedShopId: state.shopState.selectedShopId,
    creatingShop: state.shopState.creatingShop
});

const mapDispatchToProps = (dispatch) => ({
    selectAccount: account => dispatch(selectAccount(account)),
    selectShop: shopId => dispatch(selectShop(shopId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);