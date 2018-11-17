import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import {Well, Form, FormGroup, FormControl, HelpBlock, Button} from 'react-bootstrap';
import { HollowDotsSpinner, AtomSpinner } from 'react-epic-spinners'

import {
    createNewShop,
    nameChanged,
    descChanged
} from "../store/shop/ShopActions";
import {PRO_SHOP} from "../constants/Contracts";

const FlexRow = styled.section`
  display: flex;
   @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;

const FlexChild = styled.div`
  margin: 25px;
`;

class SplashView extends Component {

    renderSplashContent = () => {
        return <FlexChild>
            <h1>In-App purchases for your Dapp made easy</h1>
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
        </FlexChild>;
    };

    renderNoAccountContent = () => {
        const {initialized} = this.props;
        return <FlexChild>
            {initialized
                ? <Well>
                    <h2>Connect an Ethereum Account</h2>
                    <p>In order to use this Dapp, you must use a browser plugin (e.g., Metamask) or an Ethereum-aware browser (e.g., Trust)</p>
                    <p>You'll need to configure your plugin or browser with one or more accounts that you'll use to maintain Shops, withdraw balances, and make test purchases.</p>
                    </Well>
                : <Well>
                    <h2>Connecting&nbsp;Ethereum</h2>
                    <AtomSpinner color='red'/>
                  </Well>
            }
        </FlexChild>;
    };

    renderNewShopForm = () => {

        const {
            drizzle,
            selectedAccount,
            name,
            description,
            createNewShop,
            nameChanged,
            descChanged,
            creatingShop
        } = this.props;

        const SUCCESS = 'success';
        const ERROR = 'error';

        const handleSubmit = () => {
            createNewShop(drizzle.contracts[PRO_SHOP], selectedAccount, name, description);
        };

        const getNameValidationState = () => {
            return (name.length === 0) ? null : (name.length > 5) ? SUCCESS : ERROR;
        };

        const getDescValidationState = () => {
            return (description.length === 0) ? null : (description.length > 10) ? SUCCESS : ERROR;
        };

        const isSubmitDisabled = () => {
            return (
                getNameValidationState() !== SUCCESS ||
                getDescValidationState() !== SUCCESS
            );
        };

        const handleNameChange = e => {
            nameChanged(e.target.value);
        };

        const handleDescChange = e => {
            descChanged(e.target.value);
        };

        return <FlexChild><Well><Form>
            <h2>Create&nbsp;a&nbsp;New&nbsp;Shop</h2>
            <FormGroup
                controlId='nameField'
                validationState={getNameValidationState()}>
                <FormControl
                    disabled={creatingShop}
                    type="text"
                    bsSize='large'
                    placeholder="Shop Name"
                    onChange={handleNameChange}
                />
                <FormControl.Feedback />
                {(getNameValidationState() === ERROR)
                    ? <HelpBlock>Enter at least 5 characters</HelpBlock>
                    : null}
            </FormGroup>
            <FormGroup
                controlId='descField'
                validationState={getDescValidationState()}>
                <FormControl
                    disabled={creatingShop}
                    componentClass="textarea"
                    bsSize='large'
                    placeholder="Description"
                    onChange={handleDescChange}
                />
                <FormControl.Feedback />
                {(getDescValidationState() === ERROR)
                    ? <HelpBlock>Enter at least 10 characters</HelpBlock>
                    : null}
            </FormGroup>

            {creatingShop
                ? <HollowDotsSpinner color='black'/>
                : <Button
                    bsSize='large'
                    disabled={isSubmitDisabled()}
                    onClick={handleSubmit}>Create</Button>}

        </Form></Well></FlexChild>;
    };

    render() {

        const {selectedAccount} = this.props;

        return  <FlexRow>
            {this.renderSplashContent()}
            {!selectedAccount
                ? this.renderNoAccountContent()
                : this.renderNewShopForm()
            }
        </FlexRow>
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    name: state.shopState.newShop.name,
    description: state.shopState.newShop.description,
    creatingShop: state.shopState.creatingShop
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    createNewShop: (contract, owner, name, description) => dispatch(createNewShop(contract, owner, name, description)),
    nameChanged: name => {dispatch(nameChanged(name))},
    descChanged: description => {dispatch(descChanged(description))},
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(SplashView);