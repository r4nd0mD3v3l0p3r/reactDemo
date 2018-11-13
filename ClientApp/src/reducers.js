import { combineReducers } from 'redux';
import {
    LOGIN_REQUEST,
    LOGIN_OK,
    LOGIN_KO
} from './actions';


function store(state = {}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGIN_OK:
        case LOGIN_KO:
            return Object.assign({}, state, {
                'login': login(state, action)
            });
        default:
            return state;
    }
}

function login(
    state = {
        isFetching: false,
        didInvalidate: false,
        logged: false,
        invalidCredentials: false
    },
    action
) {
    switch (action.type) {
        case LOGIN_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                logged: true,
                invalidCredentials: false
            });
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                invalidCredentials: false
            });
        case LOGIN_KO:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                logged: false,
                invalidCredentials: true
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    store
});

export default rootReducer;