import axios from 'axios';
import { authHeader } from './helpers/authHeader';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_KO = 'LOGIN_KO';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const WRONG_AUTH_TOKEN = 'WRONG_AUTH_TOKEN';
export const USERS_LIST_REQUESTED = 'USERS_LIST_REQUESTED';
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
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_OK = 'ADD_USER_OK';
export const ADD_USER_KO = 'ADD_USER_KO';
export const CREATE_USER = 'CREATE_USER';
export const FETCH_FORUM_THREADS_IN_PROGRESS = 'FETCH_FORUM_THREADS_IN_PROGRESS';
export const FETCH_FORUM_THREADS_OK = 'FETCH_FORUM_THREADS_OK';
export const FETCH_FORUM_THREAD_POSTS_IN_PROGRESS = 'FETCH_FORUM_THREAD_POSTS_IN_PROGRESS';
export const FETCH_FORUM_THREAD_POSTS_OK = 'FETCH_FORUM_THREAD_POSTS_OK';

const USER_LOCAL_STORAGE = 'user';
const USERS_ENDPOINT = '/api/users';
const USER_ENDPOINT = '/api/user';
const LOGIN_ENDPOINT = '/api/login';
const FORUM_THREADS_ENDPOINT = '/api/forumThread';
const FORUM_THREAD_POSTS_ENDPOINT = '/api/ForumThreadPost';

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

export function wrongAuthToken() {
    return {
        type: WRONG_AUTH_TOKEN
    };
}

export function usersListRequested(data) {
    return {
        type: USERS_LIST_REQUESTED,
        data
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

export function addUserRequest() {
    return {
        type: ADD_USER_REQUEST
    };
}

export function addUserOk(data) {
    return {
        type: ADD_USER_OK,
        data
    };
}

export function addUserKo(data) {
    return {
        type: ADD_USER_KO,
        data
    };
}

export function createUser() {
    return {
        type: CREATE_USER
    };
}

export function fetchForumThreadsInProgress() {
    return {
        type: FETCH_FORUM_THREADS_IN_PROGRESS
    };
}

export function fetchForumThreadsOk(data) {
    return {
        type: FETCH_FORUM_THREADS_OK,
        data
    };
}

export function fetchForumThreadPostsInProgress() {
    return {
        type: FETCH_FORUM_THREADS_IN_PROGRESS
    };
}

export function fetchForumThreadPostsOk(data) {
    return {
        type: FETCH_FORUM_THREAD_POSTS_OK,
        data
    };
}

export function loadUsersList() {
    return dispatch => {
        dispatch(usersListRequested());
        return axios.get(USERS_ENDPOINT, { headers: authHeader() })
            .then((response) => {
                dispatch(usersListReceived(response.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
            });
    };
}

export function login(data) {
    return dispatch => {
        dispatch(loginRequest(data));

        return axios.post(LOGIN_ENDPOINT, { name: data.name, password: data.password }, { headers: authHeader() })
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(response.data));
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
        return axios.post(USERS_ENDPOINT, { name: data.name, password: '' }, { headers: authHeader() })
            .then((response) => {
                dispatch(addUsersOk(response.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
                else {
                    dispatch(addUsersKo(error.response.data));
                }
            });
    };
}

export function changeUserPassword(data) {
    return dispatch => {
        dispatch(changeUserPasswordRequest());
        return axios.put(USER_ENDPOINT, { id: data.id, currentPassword: data.currentPassword, newPassword: data.newPassword }, { headers: authHeader() })
            .then(() => {
                dispatch(changeUserPasswordOk());
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
                else {
                    dispatch(changeUserPasswordKo(error.response.data));
                }
            });
    };
}

export function deleteUser(data) {
    return dispatch => {
        dispatch(deleteUserRequest());
        return axios.delete(USERS_ENDPOINT, { headers: authHeader(), params: { id: data.id } })
            .then((response) => {
                if (response.status === 401) {
                    dispatch(wrongAuthToken());
                }
                else {

                    dispatch(deleteUserOk(response.data));
                }
            });
    };
}

export function loadUser(data) {
    return dispatch => {
        dispatch(loadUserRequest());
        return axios.get(USER_ENDPOINT, { headers: authHeader(), params: { id: data.id } })
            .then((response) => {
                if (response.status === 401) {
                    dispatch(wrongAuthToken());
                }
                else {
                    dispatch(userReceived(response.data));
                }
            });
    };
}

export function addUser(data) {
    return dispatch => {
        dispatch(addUserRequest());
        return axios.post(USER_ENDPOINT, { name: data.name, password: data.password }, { headers: authHeader() })
            .then((response) => {
                dispatch(addUserOk(response.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
                else {
                    dispatch(addUserKo(error.response.data));
                }
            });
    };
}

export function fetchForumThreads() {
    return dispatch => {
        dispatch(fetchForumThreadsInProgress());
        return axios.get(FORUM_THREADS_ENDPOINT, { headers: authHeader() })
            .then((response) => {
                dispatch(fetchForumThreadsOk(response.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
            });
    };
}

export function fetchForumThreadPosts(threadId) {
    return dispatch => {
        dispatch(fetchForumThreadPostsInProgress());
        return axios.get(FORUM_THREAD_POSTS_ENDPOINT, { headers: authHeader(), params: { threadId } })
            .then((response) => {
                dispatch(fetchForumThreadPostsOk(response.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(wrongAuthToken());
                }
            });
    };
}