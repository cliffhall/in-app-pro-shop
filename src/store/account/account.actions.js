// Account related actions
export const ACCOUNTS_FETCHED = 'accounts/fetched';
export const ACCOUNT_SELECTED = 'account/selected';


// Store the list of accounts
export const accountsFetched = accounts => {
    return {
        type: ACCOUNTS_FETCHED,
        accounts
    }
};

// Select an account
export const selectAccount = account => {

    return {
        type: ACCOUNT_SELECTED,
        selectedAccount: account
    };

};