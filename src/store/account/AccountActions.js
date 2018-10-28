export const ACCOUNTS_FETCHED = 'accounts/fetched';
export const ACCOUNT_SELECTED = 'account/selected';

export const accountsFetched = accounts => {
    return {
        type: ACCOUNTS_FETCHED,
        accounts
    }
};

export const selectAccount = account => {

    return {
        type: ACCOUNT_SELECTED,
        selectedAccount: account
    };

};