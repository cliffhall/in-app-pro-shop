import React from "react";

import {KitMenuItem, KitMonoMenuItem, KitNavDropdown} from "./theme";

export default function AccountsMenu(props) {

    // Get the salient props
    const {accounts, selectedAccount, selectAccount, creatingShop} = props;

    // Open the selected account on etherscan.io
    const viewAccountOnEtherscan = account => {
        window.open(`https://etherscan.io/address/${account}`);
    };

    // Render the menu
    return accounts
        ? <KitNavDropdown
            disabled={creatingShop}
            title={`Accounts (${accounts.length})`}
            id='account-dropdown'>
            {accounts.map(
                account => <KitMonoMenuItem
                    key={account}
                    active={account === selectedAccount}
                    onSelect={() => {if (account !== selectedAccount) selectAccount(account)}}
                >{account}</KitMonoMenuItem>)}
            <KitMenuItem divider/>
            <KitMenuItem disabled={!selectedAccount}
                         onClick={() => viewAccountOnEtherscan(selectedAccount)}>View Selected Account on Etherscan</KitMenuItem>
        </KitNavDropdown>
        : <KitNavDropdown title='Accounts' id='account-dropdown'>
            <KitMenuItem disabled={true}>No Accounts</KitMenuItem>
        </KitNavDropdown>;
};