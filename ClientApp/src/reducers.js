import { combineReducers } from 'redux';
import {
    LOGIN_REQUEST,
    LOGIN_OK,
    LOGIN_KO,
    LOGOUT_REQUEST,
    USERS_LIST_RECEIVED
} from './actions';

const initialState =
{
    login: {
        isFetching: false,
        didInvalidate: false,
        logged: false,
        invalidCredentials: false
    },
    users: {
        isFetching: false,
        didInvalidate: false,
        usersList: []
    }
};

function store(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGIN_OK:
        case LOGIN_KO:
        case LOGOUT_REQUEST:
            return { ...state, login: login(state, action) };
        case USERS_LIST_RECEIVED:
            return { ...state, users: users(state, action) };
        default:
            return state;
    }
}

function login(state, action) {
    switch (action.type) {
        case LOGIN_OK:
            return {
                isFetching: false,
                didInvalidate: true,
                logged: true,
                invalidCredentials: false
            };
        case LOGIN_REQUEST:
            return {
                isFetching: false,
                didInvalidate: false,
                invalidCredentials: false
            };
        case LOGIN_KO:
            return {
                isFetching: false,
                didInvalidate: false,
                logged: false,
                invalidCredentials: true
            };
        case LOGOUT_REQUEST:
            return {
                isFetching: false,
                didInvalidate: false,
                logged: false,
                invalidCredentials: false
            };
        default:
            return state;
    }
}

function users(state, action) {
    switch (action.type) {
        case USERS_LIST_RECEIVED:
            return {
                isFetching: false,
                didInvalidate: true,
                usersList: action.data
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    store
});

export default rootReducer;