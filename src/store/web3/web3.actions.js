import { getWeb3Instance, getWeb3Accounts } from '../../utils/web3.utils'

// Web3 related actions
export const INIT_REQUESTED   = 'web3/initialize/requested';
export const INIT_SUCCESS     = 'web3/initialize/success';
export const INIT_FAILED      = 'web3/initialize/failed';
export const ACCTS_REQUESTED  = 'web3/accounts/requested';
export const ACCTS_FETCHED    = 'web3/accounts/fetched';
export const ACCTS_FAILED     = 'web3/accounts/failed';
export const ACCT_SELECTED    = 'web3/account/selected';

// Initialize Web3
export const initWeb3 = () => {

    return async function(dispatch) {

        dispatch({
            type: INIT_REQUESTED,
            initialized: false,
            initializing: true
        });

        // Get the web3 instance
        const web3Instance = await getWeb3Instance();

        if (web3Instance) {
            dispatch({
                type: INIT_SUCCESS,
                initialized: true,
                initializing: false,
                web3Instance
            });

            // Get the accounts controlled by this client
            dispatch(fetchAccounts(web3Instance));

        } else {
            dispatch({
                type: INIT_FAILED,
                initialized: false,
                initializing: false
            });
        }
    }
};

// Get Ethereum accounts controlled by client
export const fetchAccounts = web3Instance => {

    return async function(dispatch) {

        dispatch({
            type: ACCTS_REQUESTED,
            fetchingAccounts: true,
            accountsFetched: false
        });

        // Get the accounts
        const accounts = await getWeb3Accounts(web3Instance);

        if (accounts) {
            dispatch({
                type: ACCTS_FETCHED,
                fetchingAccounts: false,
                accountsFetched: true,
                accounts
            });

            // Select the first account
            dispatch(selectAccount(accounts[0]))

        } else {
            dispatch({
                type: ACCTS_FAILED,
                fetchingAccounts: false,
                accountsFetched: false,
                accounts: []
            });
        }
    }
};

// Select an account
export const selectAccount = account => {
    return {
        type: ACCT_SELECTED,
        selectedAccount: account
    }
};