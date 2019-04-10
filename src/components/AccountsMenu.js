import React from "react";

import {KitMenuItem, KitMonoMenuItem, KitNavDropdown} from "./theme";

export default function AccountsMenu(props) {

    // Get the salient props
    const {accounts, selectedAccount, selectAccount, creatingShop} = props;
    const {networkId} = props.drizzleState.web3;

    const renderEtherscanMenuItem = () => {
        let url;
        switch (networkId) {
            case 1: // mainnet
                url = "https://etherscan.io/address/";
                break;

            case 3: // ropsten testnet
                url = "https://ropsten.etherscan.io/address/";
                break;

            case 4: // Rinkeby testnet
                url = "https://rinkeby.etherscan.io/address/";
                break;

            case 42: // Kovan testnet
                url = "https://kovan.etherscan.io/address/";
                break;

            default:
                url = null;
        }
        return !!url ? <>
                        <KitMenuItem divider/>
                        <KitMenuItem
                            disabled={!selectedAccount}
                            onClick={() => viewAccountOnEtherscan(url, selectedAccount)}>View Selected Account on Etherscan</KitMenuItem>
                        </>
                     : null;
    }

    // Open the selected account on etherscan.io
    const viewAccountOnEtherscan = (url, account) => {
        window.open(`${url}/${account}`);
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
            {renderEtherscanMenuItem()}
        </KitNavDropdown>
        : <KitNavDropdown title='Accounts' id='account-dropdown'>
            <KitMenuItem disabled={true}>No Accounts</KitMenuItem>
        </KitNavDropdown>;
};