import React, { Component } from 'react';
import { Navbar, Nav,NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { accountsFetched, selectAccount } from '../../store/account/account.actions';
import { getShopIds } from '../../store/shop/shop.actions';
import { PRO_SHOP } from "../../constants/contracts";

class Navigation extends Component {

    componentDidUpdate(prevProps) {
        const {
            accountsFetched,
            selectAccount,
            getShopIds,
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
            getShopIds(drizzle.contracts[PRO_SHOP], selectedAccount);
        }
    }

    render() {
        const {
            selectedAccount,
            drizzleState,
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
                    <MenuItem disabled={true}>No accounts</MenuItem>
                </NavDropdown>;
        };

        // Render the Navbar
        return <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>In-App Pro Shop</Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                {initialized
                    ? renderAccountsMenu(drizzleState.accounts)
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
    selectedAccount: state.accountState.selectedAccount
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    accountsFetched: accounts => dispatch(accountsFetched(accounts)),
    selectAccount: account => dispatch(selectAccount(account)),
    getShopIds: (contract, account) => dispatch(getShopIds(contract, account))
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);