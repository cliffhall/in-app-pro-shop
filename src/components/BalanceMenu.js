import React from "react";
import {Glyphicon} from "react-bootstrap";
import {AppMenuItem, AppMonoMenuItem, AppNavDropdown} from "../styles";
import {CURRENCIES} from "../constants";

export default function BalanceMenu(props) {

    // Get the salient props
    const {
        shop,
        selectedShopId,
        shopBalanceFetched,
        selectedShopBalance
    } = props;

    const handleWithdrawShopBalance = () => {

    };

    // Render the menu
    return <AppNavDropdown
        title={`Balance`}
        id='shop-dropdown'>
        <AppMonoMenuItem header>AVAILABLE: <Glyphicon glyph={CURRENCIES[shop.fiat].icon}/>{selectedShopBalance}</AppMonoMenuItem>
        <AppMenuItem divider/>
        <AppMenuItem onClick={() => handleWithdrawShopBalance()}
                     disabled={
                         !selectedShopId ||
                         !shopBalanceFetched ||
                         !(selectedShopBalance > 0)
                     }>Withdraw Shop Balance</AppMenuItem>
    </AppNavDropdown>;
};
