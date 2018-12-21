import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_KO = 'LOGIN_KO';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const USERS_LIST_RECEIVED = 'USERS_LIST_RECEIVED';
export const ADD_USERS_REQUEST = 'ADD_USERS_REQUEST';
export const ADD_USERS_OK = 'ADD_USERS_OK';
export const ADD_USERS_KO = 'ADD_USERS_KO';
export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST';
export const CHANGE_USER_PASSWORD_OK = 'CHANGE_USER_PASSWORD_OK';
export const CHANGE_USER_PASSWORD_KO = 'CHANGE_USER_PASSWORD_KO';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_OK = 'DELETE_USER_OK';
export const DELETE_USER_KO = 'DELETE_USER_KO';
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_OK = 'LOAD_USER_OK';

const USERS_ENDPOINT = '/api/users';
const USER_ENDPOINT = '/api/user';
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

export function changeUserPasswordRequest() {
    return {
        type: CHANGE_USER_PASSWORD_REQUEST
    };
}

export function changeUserPasswordOk(data) {
    return {
        type: CHANGE_USER_PASSWORD_OK,
        data
    };
}

export function changeUserPasswordKo(data) {
    return {
        type: CHANGE_USER_PASSWORD_KO,
        data
    };
}

export function deleteUserRequest() {
    return {
        type: DELETE_USER_REQUEST
    };
}

export function deleteUserOk(data) {
    return {
        type: DELETE_USER_OK,
        data
    };
}

export function deleteUserKo() {
    return {
        type: DELETE_USER_KO
    };
}

export function loadUserRequest() {
    return {
        type: LOAD_USER_REQUEST
    };
}

export function userReceived(data) {
    return {
        type: LOAD_USER_OK,
        data
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

export function changeUserPassword(data) {
    return dispatch => {
        dispatch(changeUserPasswordRequest());
        return axios.put(USER_ENDPOINT, { id: data.id, currentPassword: data.currentPassword, newPassword: data.newPassword })
            .then((response) => {
                dispatch(changeUserPasswordOk());
            })
            .catch((error) => {
                dispatch(changeUserPasswordKo(error.response.data));
            });
    };
}

export function deleteUser(data) {
    return dispatch => {
        dispatch(deleteUserRequest());
        return axios.delete(USERS_ENDPOINT, { params: { id: data.id } })
            .then((response) => {
                dispatch(deleteUserOk(response.data));
            });
    };
}

export function loadUser(data) {
    return dispatch => {
        dispatch(loadUserRequest());
        return axios.get(USER_ENDPOINT, { params: { id: data.id } })
            .then((response) => {
                dispatch(userReceived(response.data));
            });
    };
}
