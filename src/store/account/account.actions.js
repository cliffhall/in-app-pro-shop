import {getShopIds} from '../shop/shop.actions';

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

    return async function(dispatch) {

        dispatch({
            type: ACCOUNT_SELECTED,
            selectedAccount: account
        });

        // Get any shops owned by the selected account
        dispatch(getShopIds(account));

    };

};