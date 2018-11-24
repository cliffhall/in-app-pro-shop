import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectAccount } from '../store/account/AccountActions';
import { selectShop } from '../store/shop/ShopActions';

class NavigationBar extends Component {

    // Open the selected account on etherscan.io
    viewAccountOnEtherscan(selectedAccount) {
        window.open(`https://etherscan.io/address/${selectedAccount}`);
    };

    // Render the accounts menu
    renderAccountsMenu() {
        const {initialized, accounts, selectedAccount, selectAccount, creatingShop} = this.props;
        return initialized && accounts
            ? <NavDropdown
                disabled={creatingShop}
                title={`Accounts (${accounts.length})`}
                id='account-dropdown'>
                {accounts.map(
                    account => <MenuItem
                        key={account}
                        eventKey={account}
                        disabled={account === selectedAccount}
                        onSelect={() => selectAccount(account)}
                    >{account}</MenuItem>)}
                <MenuItem divider/>
                <MenuItem disabled={!selectedAccount}
                          onClick={() => this.viewAccountOnEtherscan(selectedAccount)}>View Selected Account on Etherscan</MenuItem>
            </NavDropdown>
            : initialized ? <NavDropdown title='Accounts' id='account-dropdown'>
                <MenuItem disabled={true}>No Accounts</MenuItem>
            </NavDropdown> : null;
    };

    // Render the shops menu
    renderShopsMenu() {
        const {accounts, shops, selectShop, selectedShopId, creatingShop} = this.props;
        return accounts
            ? <NavDropdown
                disabled={creatingShop}
                title={`Shops (${shops.length})`}
                id='shop-dropdown'>
                {shops.length
                    ? shops.map(
                        shop => <MenuItem
                            key={shop.shopId}
                            eventKey={shop.shopId}
                            active={shop.shopId === selectedShopId}
                            onSelect={() => selectShop(shop.shopId)}
                        >{shop.name}</MenuItem>)
                    : <MenuItem disabled={true}>No Shops</MenuItem>}
                <MenuItem divider/>
                {selectedShopId
                    ? <MenuItem onClick={() => selectShop(null)}>Create Shop</MenuItem>
                    : <MenuItem disabled>Create Shop</MenuItem>}
            </NavDropdown>
            : null;
    };

    // Render the Navbar
    render() {

        return <Navbar fixedTop={true} collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Glyphicon glyph="tower"/>
                    &nbsp;
                    In-App Pro Shop
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                {this.renderShopsMenu()}
                {this.renderAccountsMenu()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>;
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