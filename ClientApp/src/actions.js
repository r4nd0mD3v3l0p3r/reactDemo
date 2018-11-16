import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_KO = 'LOGIN_KO';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const USERS_LIST_RECEIVED = 'USERS_LIST_RECEIVED';

export function loginRequest(data) {
    return {
        type: LOGIN_REQUEST,
        data
    };
}

export function loginOk() {
    return {
        type: LOGIN_OK
    };
}

export function loginKo() {
    return {
        type: LOGIN_KO
    };
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    };
}

export function usersListReceived(data) {
    return {
        type: USERS_LIST_RECEIVED,
        data
    };
}

export function login(data) {
    return dispatch => {
        dispatch(loginRequest(data));

        return axios.post('/api/login', {
            name: data.name,
            password: data.password
        })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch(loginOk());
                }
                else {
                    dispatch(loginKo());
                }
            })
            .catch(function (error) {
                dispatch(loginKo());
            });
    };
}

export function loadUsersList() {
    return dispatch => {
        return axios.get('/api/users')
            .then((response) => {
                dispatch(usersListReceived(response.data));
            });
    };
}
