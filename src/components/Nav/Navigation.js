import React, { Component } from 'react';
import { Navbar, Nav,NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { accountsFetched, selectAccount } from '../../store/account/AccountActions';
import { getShops, selectShop } from '../../store/shop/ShopActions';
import { PRO_SHOP } from "../../constants/Contracts";

class Navigation extends Component {

    componentDidUpdate(prevProps) {
        const {
            accountsFetched,
            selectAccount,
            getShops,
            selectedAccount,
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

        // Get shopIds when account is selected
        if (selectedAccount && selectedAccount !== prevProps.selectedAccount) {
            getShops(drizzle.contracts[PRO_SHOP], selectedAccount);
        }

    }

    render() {
        const {
            selectedAccount,
            selectedShopId,
            shopsFetched,
            initialized
        } = this.props;

        // Open the selected account on etherscan.io
        const viewAccountOnEtherscan = () => {
          window.open(`https://etherscan.io/address/${selectedAccount}`);
        };

        // Render the accounts menu
        const renderAccountsMenu = () => {
            const {accounts, selectAccount} = this.props;
            return accounts
                ? <NavDropdown title='Accounts' id='account-dropdown'>
                        {accounts.map(
                            account => <MenuItem
                                key={account}
                                eventKey={account}
                                active={account === selectedAccount}
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
            const {shops, selectShop} = this.props;
            return <NavDropdown title='Shops' id='shop-dropdown'>
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
                <MenuItem>Create Shop</MenuItem>
            </NavDropdown>;
        };

        // Render the Navbar
        return <Navbar fixedTop={true} collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>In-App Pro Shop</Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                {shopsFetched
                    ? renderShopsMenu()
                    : <NavItem>Loading Shops...</NavItem>
                }
                {initialized
                    ? renderAccountsMenu()
                    : <NavItem>Connecting...</NavItem>
                }
                </Nav>
            </Navbar.Collapse>
        </Navbar>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    shops: state.shopState.shops,
    selectedShopId: state.shopState.selectedShopId,
    shopsFetched: state.shopState.shopsFetched
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    accountsFetched: accounts => dispatch(accountsFetched(accounts)),
    selectAccount: account => dispatch(selectAccount(account)),
    getShops: (contract, account) => dispatch(getShops(contract, account)),
    selectShop: shopId => dispatch(selectShop(shopId))
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);