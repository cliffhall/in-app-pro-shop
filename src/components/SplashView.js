import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AtomSpinner} from 'react-epic-spinners'

import {
    AppSlidingWell,
    AppWell,
    FlexChild,
    FlexRow
} from '../styles';
import ShopForm from "./ShopForm";
import {createNewShop, nameChanged, descChanged, fiatChanged} from "../store/shop/ShopActions";

class SplashView extends Component {

    renderSplashContent = () => {
        return <FlexChild>
            <h1>Digital Goods for Your Dapp Made Easy</h1>

            <h3>
                Add in-app purchases without having to build a system from scratch.
            </h3>

            <ul>
                <li>Quickly create a Shop, defining and categorizing the items you will sell.</li>

                <li>Interact with the In-App Pro Shop smart contracts to allow users to purchase Items.</li>

                <li>Set prices in a stable fiat currency, get paid in Ether.</li>

            </ul>

            <p>
                Items are minted as <a href="http://erc721.org/" rel="noopener noreferrer" target="_blank">ERC-721 non-fungible tokens</a>, which users can trade, sell, or rent on the open market.
            </p>

            <p>
                Building your Shop is free, except for the gas price associated with each blockchain transaction.
            </p>

            <p>
                A small percentage (3%) of each sale goes to the franchise owner (<a href="http://futurescale.com" rel="noopener noreferrer" target="_blank">Futurescale, Inc.</a>),
                and the rest is immediately available for withdrawal by the Shop Owner.
            </p>
        </FlexChild>;
    };

    renderNoAccountContent = () => {
        const {initialized} = this.props;
        return <FlexChild>
            {initialized
                ? <AppSlidingWell>
                    <h2>Connect an Ethereum Account</h2>
                    <p>In order to use this Dapp, you must use a browser plugin (e.g., Metamask) or an Ethereum-aware browser (e.g., Trust)</p>
                    <p>You'll need to configure your plugin or browser with one or more accounts that you'll use to maintain Shops, withdraw balances, and make test purchases.</p>
                    <p>If you have an appropriate browser / plugin with configured accounts, be sure you're signed in.</p>
                  </AppSlidingWell>
                : <AppWell>
                    <h2>Connect&nbsp;to&nbsp;Ether&nbsp;...&nbsp;</h2>
                    <AtomSpinner color='red'/>
                  </AppWell>
            }
        </FlexChild>;
    };

    render() {

        const {selectedAccount} = this.props;

        return  <FlexRow>
            {this.renderSplashContent()}
            {!selectedAccount
                ? this.renderNoAccountContent()
                : <ShopForm {...this.props}/>
            }
        </FlexRow>
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    name: state.shopState.newShop.name,
    description: state.shopState.newShop.description,
    fiat: state.shopState.newShop.fiat,
    creatingShop: state.shopState.creatingShop
});

const mapDispatchToProps = (dispatch) => ({
    createNewShop: (contract, owner, name, description, fiat) => dispatch(createNewShop(contract, owner, name, description, fiat)),
    nameChanged: name => {dispatch(nameChanged(name))},
    descChanged: description => {dispatch(descChanged(description))},
    fiatChanged: fiat => {dispatch(fiatChanged(fiat))},
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashView);