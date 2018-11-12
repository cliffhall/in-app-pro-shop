import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import {Well} from 'react-bootstrap';
const FlexRow = styled.section`
  display: flex;
`;

const FlexChild = styled.div`
  margin: 25px;
`;

class SplashView extends Component {
    // Render the component
    render() {

        const {selectedAccount} = this.props;

        return  <FlexRow>
            <FlexChild>
            <h1>Create a Shop for your App</h1>
                    <p>
                        The goal of In-App Pro Shop is to allow Ethereum developers to add in-app purchases quickly
                        and to make it easy to support assets from other apps, if you so choose.
                    </p>

                    <p>
                        Using smart contracts that live on the blockchain and a web-based maintenance
                        application, it implements a franchise system, whereby you can create a Shop,
                        define and categorize the <a href="https://en.wikipedia.org/wiki/Stock_keeping_unit"  rel="noopener noreferrer" target="_blank">SKU</a>s
                        that identify the products they will sell, and integrate that Shop into their application.
                    </p>

                    <p>
                        Your application can then interact with the In-App Pro Shop smart contracts
                        to allow users to purchase items, which are minted as <a href="http://erc721.org/" rel="noopener noreferrer" target="_blank">ERC-721 non-fungible tokens</a>.
                    </p>

                    <p>
                        A small percentage of each sale goes to the franchise owner (<a href="http://futurescale.com" rel="noopener noreferrer" target="_blank">Futurescale, Inc.</a>),
                        and the rest is immediately available for withdrawal by the Shop Owner.
                    </p>
            </FlexChild>
            {!selectedAccount
                ? <FlexChild><Well>
                        <h2>Connect an Ethereum Account</h2>
                        <p>In order to use this Dapp, you must use a browser plugin (e.g., Metamask) or an Ethereum-aware browser (e.g., Trust)</p>
                        <p>You'll need to configure your plugin or browser with one or more accounts that you'll use to maintain Shops, withdraw balances, and make test purchases.</p>
                    </Well></FlexChild>
                : null
            }
        </FlexRow>
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    //dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(SplashView);