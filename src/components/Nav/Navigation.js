import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import { connect } from 'react-redux';

import { initWeb3, selectAccount } from '../../store/web3/web3.actions'

class Navigation extends Component {

    render() {
        const {
            initialized,
            initializing,
            accounts,
            selectedAccount
        } = this.props;

        // Open the selected account on etherscan.io
        const viewAccountOnEtherscan = () => {
          window.open(`https://etherscan.io/address/${selectedAccount}`);
        };

        // Render the connect button
        const renderConnectButton = () => {
            return <Nav pullRight>
                <NavItem disabled={initializing}
                         onClick={() => this.props.initWeb3()}>{initializing?'Connecting...':'Connect'}</NavItem>
            </Nav>
        };

        // Render the accounts menu
        const renderAccountsMenu = () => {
            return accounts
                ? <NavDropdown title='Accounts' id='account-dropdown'>
                        {accounts.map(
                            account => <MenuItem
                                key={account}
                                eventKey={account}
                                active={account === selectedAccount}
                                onSelect={() => this.props.selectAccount(account)}
                            >{account}</MenuItem>)}
                        <MenuItem divider/>
                        <MenuItem disabled={!selectedAccount}
                                  onClick={viewAccountOnEtherscan}>View Selected Account on Etherscan</MenuItem>
                    </NavDropdown>
                : null;
        };

        // Render the Navbar
        return <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>In-App Pro Shop</Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
            {initialized
                ? <Nav pullRight>
                    {renderAccountsMenu()}
                  </Nav>
                : renderConnectButton()
            }
            </Navbar.Collapse>
        </Navbar>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    initialized: state.web3State.initialized,
    initializing: state.web3State.initializing,
    accounts: state.web3State.accounts,
    selectedAccount: state.web3State.selectedAccount
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    initWeb3: () => dispatch(initWeb3()),
    selectAccount: account => dispatch(selectAccount(account))
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);