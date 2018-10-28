import {
    ACCOUNTS_FETCHED,
    ACCOUNT_SELECTED
} from './AccountActions';

const INITIAL_STATE = {
    accounts: null,
    selectedAccount: null
};

function accountReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case ACCOUNTS_FETCHED:
            reduced = {
                ...state,
                accounts: action.accounts
            };
            break;

        case ACCOUNT_SELECTED:
            reduced = {
                ...state,
                selectedAccount: action.selectedAccount
            };
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default accountReducer;