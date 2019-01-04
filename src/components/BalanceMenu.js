import React from "react";
import {Glyphicon} from "react-bootstrap";

import {CURRENCIES, CONTRACTS} from "../constants";
import {KitMenuItem, KitMonoMenuItem, KitNavDropdown} from "./theme";

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
    return <KitNavDropdown
        title={`Balance`}
        id='shop-dropdown'>
        <KitMonoMenuItem header>AVAILABLE: <Glyphicon glyph={CURRENCIES[shop.fiat].icon}/>{selectedShopBalance}</KitMonoMenuItem>
        {canWithdraw()
            ? <><KitMenuItem divider/><KitMenuItem onClick={() => handleWithdrawShopBalance()}>Withdraw Shop Balance</KitMenuItem></>
            : null}
    </KitNavDropdown>;
};
