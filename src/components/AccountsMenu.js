import React from "react";

import {AppMenuItem, AppMonoMenuItem, AppNavDropdown} from "./styled";

export default function AccountsMenu(props) {

    // Get the salient props
    const {accounts, selectedAccount, selectAccount, creatingShop} = props;

    // Open the selected account on etherscan.io
    const viewAccountOnEtherscan = account => {
        window.open(`https://etherscan.io/address/${account}`);
    };

    // Render the menu
    return accounts
        ? <AppNavDropdown
            disabled={creatingShop}
            title={`Accounts (${accounts.length})`}
            id='account-dropdown'>
            {accounts.map(
                account => <AppMonoMenuItem
                    key={account}
                    active={account === selectedAccount}
                    onSelect={() => {if (account !== selectedAccount) selectAccount(account)}}
                >{account}</AppMonoMenuItem>)}
            <AppMenuItem divider/>
            <AppMenuItem disabled={!selectedAccount}
                         onClick={() => viewAccountOnEtherscan(selectedAccount)}>View Selected Account on Etherscan</AppMenuItem>
        </AppNavDropdown>
        : <AppNavDropdown title='Accounts' id='account-dropdown'>
            <AppMenuItem disabled={true}>No Accounts</AppMenuItem>
        </AppNavDropdown>;
};