import React from "react";
import {Glyphicon} from "react-bootstrap";
import {AppMenuItem, AppMonoMenuItem, AppNavDropdown} from "../styles";
import {CURRENCIES, CONTRACTS} from "../constants";

export default function BalanceMenu(props) {

    // Get the salient props
    const {
        drizzle,
        shop,
        selectedShopId,
        shopBalanceFetched,
        selectedShopBalance,
        selectedAccount,
        transferShopBalance
    } = props;

    const handleWithdrawShopBalance = () => {
        transferShopBalance(drizzle.contracts[CONTRACTS.PRO_SHOP], selectedAccount, selectedShopId);
    };

    const canWithdraw = () => {
        return selectedShopId && shopBalanceFetched && selectedShopBalance > 0;
    };

    // Render the menu
    return <AppNavDropdown
        title={`Balance`}
        id='shop-dropdown'>
        <AppMonoMenuItem header>AVAILABLE: <Glyphicon glyph={CURRENCIES[shop.fiat].icon}/>{selectedShopBalance}</AppMonoMenuItem>
        {canWithdraw()
            ? <><AppMenuItem divider/><AppMenuItem onClick={() => handleWithdrawShopBalance()}>Withdraw Shop Balance</AppMenuItem></>
            : null}
    </AppNavDropdown>;
};
