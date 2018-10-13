// Action type constants
import {
    INIT_REQUESTED,
    INIT_SUCCESS,
    INIT_FAILED,
    ACCTS_REQUESTED,
    ACCTS_FETCHED,
    ACCTS_FAILED,
    ACCT_SELECTED
} from './web3.actions';

// Initial state
const INITIAL_STATE = {
    initialized: false,
    initializing: false,
    web3Instance: null,
    fetchingAccounts: false,
    accountsFetched: false,
    accounts: [],
    selectedAccount: null
};

// Shop reducer
function web3Reducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case INIT_REQUESTED:
            reduced = {
                ...state,
                initialized: action.initialized,
                initializing: action.initializing
            };
            break;

        case INIT_SUCCESS:
            reduced = {
                ...state,
                initialized: action.initialized,
                initializing: action.initializing,
                web3Instance: action.web3Instance
            };
            break;

        case INIT_FAILED:
            reduced = {
                ...state,
                initialized: action.initialized,
                initializing: action.initializing
            };
            break;

        case ACCTS_REQUESTED:
            reduced = {
                ...state,
                fetchingAccounts: action.fetchingAccounts,
                accountsFetched: action.accountsFetched
            };
            break;

        case ACCTS_FETCHED:
        case ACCTS_FAILED:
            reduced = {
                ...state,
                fetchingAccounts: action.fetchingAccounts,
                accountsFetched: action.accountsFetched,
                accounts: action.accounts
            };
            break;

        case ACCT_SELECTED:
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

export default web3Reducer;