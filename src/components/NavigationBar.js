import React, {Component} from "react";
import {connect} from "react-redux";
import {Navbar, Glyphicon} from "react-bootstrap";

import ShopsMenu from "./ShopsMenu";
import BalanceMenu from "./BalanceMenu";
import AccountsMenu from "./AccountsMenu";
import {selectAccount} from "../store/account/AccountActions";
import {selectShop, transferShopBalance} from "../store/shop/ShopActions";
import {KitNavbar, KitNavbarHeader, KitNav, KitNavbarBrand} from "./theme";

class NavigationBar extends Component {

    // Render the Navbar
    render() {

        const {initialized, shops, selectedShopBalance} = this.props;

        return <KitNavbar fixedTop={true} collapseOnSelect>
            <KitNavbarHeader>
                <KitNavbarBrand>
                    <Glyphicon glyph="tower"/>
                    &nbsp;
                    In-App Pro Shop
                </KitNavbarBrand>
                <Navbar.Toggle/>
            </KitNavbarHeader>
            <Navbar.Collapse>
                <KitNav pullRight>
                {selectedShopBalance ? <BalanceMenu {...this.props}/> : null}
                {(shops && shops.length) ? <ShopsMenu {...this.props}/> : null}
                {initialized ? <AccountsMenu {...this.props}/> : null}
                </KitNav>
            </Navbar.Collapse>
        </KitNavbar>;
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    shops: state.shopState.shops,
    shop: state.shopState.shops ? state.shopState.shops.find(shop => shop.shopId === state.shopState.selectedShopId) : null,
    selectedShopId: state.shopState.selectedShopId,
    creatingShop: state.shopState.creatingShop,
    shopBalanceFetched: state.shopState.shopBalanceFetched,
    selectedShopBalance: state.shopState.selectedShopBalance,
});

const mapDispatchToProps = (dispatch) => ({
    selectAccount: account => dispatch(selectAccount(account)),
    selectShop: shopId => dispatch(selectShop(shopId)),
    transferShopBalance: (contract, owner, shopId) => dispatch(transferShopBalance(contract, owner, shopId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);