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
                ['login']: login(state['login'], action)
            });
        default:
            return state;
    }
}

function login(
    state = {
        isFetching: false,
        didInvalidate: false,
        logged: false
    },
    action
) {
    switch (action.type) {
        case LOGIN_OK:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                logged: true
            });
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false
            });
        case LOGIN_KO:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                logged: false
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    store
});

export default rootReducer;