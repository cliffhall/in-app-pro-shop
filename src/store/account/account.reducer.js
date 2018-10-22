// Action type constants
import {
    ACCOUNTS_FETCHED,
    ACCOUNT_SELECTED
} from './account.actions';

// Initial state
const INITIAL_STATE = {
    accounts: null,
    selectedAccount: null
};

// Shop reducer
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