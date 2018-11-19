import React, { Component } from 'react';
import { Navbar, Nav,NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import { accountsFetched, selectAccount } from '../store/account/AccountActions';
import { getShops, selectShop } from '../store/shop/ShopActions';
import { getSKUTypes } from '../store/sku_type/SKUTypeActions';
import { PRO_SHOP } from "../constants/Contracts";

class NavigationBar extends Component {

    componentDidUpdate(prevProps) {
        const {
            accountsFetched,
            selectAccount,
            getShops,
            selectedAccount,
            selectedShopId,
            getSKUTypes,
            drizzleState,
            drizzle,
            initialized,
            accounts
        } = this.props;

        // Store the accounts when drizzle initializes
        if (initialized && !prevProps.initialized) {
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

    render() {
        const {
            selectedAccount,
            selectedShopId,
            initialized
        } = this.props;

        // Open the selected account on etherscan.io
        const viewAccountOnEtherscan = () => {
          window.open(`https://etherscan.io/address/${selectedAccount}`);
        };

        // Render the accounts menu
        const renderAccountsMenu = () => {
            const {accounts, selectAccount, creatingShop} = this.props;
            return accounts
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
                                  onClick={viewAccountOnEtherscan}>View Selected Account on Etherscan</MenuItem>
                    </NavDropdown>
                : <NavDropdown title='Accounts' id='account-dropdown'>
                    <MenuItem disabled={true}>No Accounts</MenuItem>
                </NavDropdown>;
        };

        // Render the shops menu
        const renderShopsMenu = () => {
            const {shops, selectShop, accounts, creatingShop} = this.props;
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
                {renderShopsMenu()}
                {initialized
                    ? renderAccountsMenu()
                    : <NavItem>Connecting...</NavItem>
                }
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
    shopsFetched: state.shopState.shopsFetched,
    selectedSKUTypeId: state.skuTypeState.selectedSKUTypeId,
    skuTypesFetched: state.skuTypeState.skuTypesFetched,
    creatingShop: state.shopState.creatingShop
});

const mapDispatchToProps = (dispatch) => ({
    accountsFetched: accounts => dispatch(accountsFetched(accounts)),
    selectAccount: account => dispatch(selectAccount(account)),
    getShops: (contract, account) => dispatch(getShops(contract, account)),
    selectShop: shopId => dispatch(selectShop(shopId)),
    getSKUTypes: (contract, shopId) => dispatch(getSKUTypes(contract, shopId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);