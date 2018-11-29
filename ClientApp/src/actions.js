import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_KO = 'LOGIN_KO';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const USERS_LIST_RECEIVED = 'USERS_LIST_RECEIVED';
export const ADD_USERS_REQUEST = 'ADD_USERS_REQUEST';
export const ADD_USERS_OK = 'ADD_USERS_OK';
export const ADD_USERS_KO = 'ADD_USERS_KO';
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_OK = 'EDIT_USER_OK';
export const EDIT_USER_KO = 'EDIT_USER_KO';
const USERS_ENDPOINT = '/api/users';
const LOGIN_ENDPOINT = '/api/login';

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

        return axios.post(LOGIN_ENDPOINT, {
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

        return axios.get(USERS_ENDPOINT)
            .then((response) => {
                dispatch(usersListReceived(response.data));
            });
    };
}

export function addUsersRequest() {
    return {
        type: ADD_USERS_REQUEST
    };
}

export function addUsersOk(data) {
    return {
        type: ADD_USERS_OK,
        data
    };
}

export function addUsersKo(data) {
    return {
        type: ADD_USERS_KO,
        data
    };
}

export function editUserRequest() {
    return {
        type: EDIT_USER_REQUEST
    };
}

export function editUserOk(data) {
    return {
        type: EDIT_USER_OK,
        data
    };
}

export function editUserKo(data) {
    return {
        type: EDIT_USER_KO,
        data
    };
}

export function addUsers(data) {
    return dispatch => {
        dispatch(addUsersRequest());
        return axios.post(USERS_ENDPOINT, { name: data.name, password: '' })
            .then((response) => {
                dispatch(addUsersOk(response.data));
            })
            .catch((error) => {
                dispatch(addUsersKo(error.response.data));
            });
    };
}

export function editUser() {
    return dispatch => {
        dispatch(editUserRequest());
        return axios.put(USERS_ENDPOINT, {})
            .then((response) => { })
            .catch((error) => { });
    };
}
