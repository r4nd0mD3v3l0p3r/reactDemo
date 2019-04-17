import { combineReducers } from 'redux';
import { Cookies } from 'react-cookie';

import {
    LOGIN_COOKIE,
    LOGIN_REQUEST,
    LOGIN_OK,
    LOGIN_KO,
    LOGOUT_REQUEST,
    USERS_LIST_RECEIVED,
    ADD_USERS_REQUEST,
    ADD_USERS_OK,
    ADD_USERS_KO,
    DELETE_USER_REQUEST,
    DELETE_USER_OK,
    DELETE_USER_KO,
    LOAD_USER_OK,
    LOAD_USER_REQUEST,
    CHANGE_USER_PASSWORD_REQUEST,
    CHANGE_USER_PASSWORD_KO,
    CHANGE_USER_PASSWORD_OK,
    ADD_USER_REQUEST,
    ADD_USER_OK,
    ADD_USER_KO,
    CREATE_USER,
    WRONG_AUTH_TOKEN,
    USERS_LIST_REQUESTED,
    FETCH_FORUM_THREADS_IN_PROGRESS,
    FETCH_FORUM_THREADS_OK,
    FETCH_FORUM_THREAD_POSTS_IN_PROGRESS,
    FETCH_FORUM_THREAD_POSTS_OK,
    CREATE_FORUM_THREAD_IN_PROGRESS,
    CREATE_FORUM_THREAD_OK,
    CREATE_FORUM_THREAD_POST_IN_PROGRESS,
    CREATE_FORUM_THREAD_POST_OK
} from './actions';

const initialState =
{
    login: {
        isFetching: false,
        didInvalidate: false,
        invalidCredentials: false,
        wrongAuthToken: false,
        name: ''
    },
    users: {
        isFetching: false,
        didInvalidate: false,
        usersList: [],
        errorMessage: ''
    },
    user: {
        id: '',
        isFetching: false,
        message: '',
        showMessage: false,
        edit: false,
        user: undefined
    },
    forum:
    {
        threadTitle: '',
        threads: [],
        posts: [],
        fetching: true,
        message: ''
    }

};

function store(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGIN_OK:
        case LOGIN_KO:
        case LOGOUT_REQUEST:
        case WRONG_AUTH_TOKEN:
            return { ...state, login: login(state, action) };
        case USERS_LIST_RECEIVED:
        case ADD_USERS_REQUEST:
        case ADD_USERS_OK:
        case ADD_USERS_KO:
        case DELETE_USER_REQUEST:
        case DELETE_USER_OK:
        case DELETE_USER_KO:
        case USERS_LIST_REQUESTED:
            return { ...state, users: users(state, action) };
        case LOAD_USER_REQUEST:
        case LOAD_USER_OK:
        case CHANGE_USER_PASSWORD_REQUEST:
        case CHANGE_USER_PASSWORD_OK:
        case CHANGE_USER_PASSWORD_KO:
        case ADD_USER_REQUEST:
        case ADD_USER_OK:
        case ADD_USER_KO:
        case CREATE_USER:
            return { ...state, user: user(state, action) };
        case FETCH_FORUM_THREADS_IN_PROGRESS:
        case FETCH_FORUM_THREADS_OK:
        case FETCH_FORUM_THREAD_POSTS_IN_PROGRESS:
        case FETCH_FORUM_THREAD_POSTS_OK:
        case CREATE_FORUM_THREAD_IN_PROGRESS:
        case CREATE_FORUM_THREAD_OK:
        case CREATE_FORUM_THREAD_POST_IN_PROGRESS:
        case CREATE_FORUM_THREAD_POST_OK:
            return {...state, forum: forum(state, action)};
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
                invalidCredentials: false,
                wrongAuthToken: false
            };
        case LOGIN_REQUEST:
            return {
                isFetching: true,
                didInvalidate: false,
                invalidCredentials: false,
                wrongAuthToken: false,
                name: ''
            };
        case LOGIN_KO:
            return {
                isFetching: false,
                didInvalidate: false,
                invalidCredentials: true,
                wrongAuthToken: false,
                name: ''
            };
        case LOGOUT_REQUEST:
            const cookies = new Cookies();
            cookies.remove(LOGIN_COOKIE, { path: '/' });

            return {
                isFetching: false,
                didInvalidate: false,
                invalidCredentials: false,
                wrongAuthToken: false,
                name: ''
            };
        case WRONG_AUTH_TOKEN:
            return {
                isFetching: false,
                didInvalidate: false,
                invalidCredentials: false,
                wrongAuthToken: true,
                name: ''
            };
        default:
            return state;
    }
}

function users(state, action) {
    switch (action.type) {
        case USERS_LIST_RECEIVED:
            return { isFetching: false, didInvalidate: true, usersList: action.data, errorMessage: '' };
        case LOAD_USER_REQUEST:
            return { isFetching: true, didInvalidate: true, errorMessage: '' };
        case USERS_LIST_REQUESTED:
            return { ...state.users, isFetching: true, errorMessage: '' };
        case ADD_USERS_REQUEST:
            return { ...state.users, isFetching: true, errorMessage: '' };
        case ADD_USERS_KO:
            return { ...state.users, isFetching: false, errorMessage: action.data };
        case ADD_USERS_OK:
            return { ...state.users, usersList: action.data, isFetching: false, errorMessage: '' };
        case DELETE_USER_REQUEST:
            return { ...state.users, isFetching: true, errorMessage: '' };
        case DELETE_USER_KO:
            return { ...state.users, isFetching: false, errorMessage: action.data };
        case DELETE_USER_OK:
            return { ...state.users, usersList: action.data, isFetching: false, errorMessage: 'User deleted' };
        default:
            return state;
    }
}

function user(state, action) {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return { ...state.user, isFetching: true, id: '', edit: true, showMessage: false };
        case LOAD_USER_OK:
            return { ...state.user, isFetching: false, user: action.data, edit: true, showMessage: false, id: action.data.id };
        case CHANGE_USER_PASSWORD_REQUEST:
            return { ...state.user, isFetching: true, showMessage: false };
        case CHANGE_USER_PASSWORD_OK:
            return { ...state.user, isFetching: false, message: 'Password changed', showMessage: true};
        case CHANGE_USER_PASSWORD_KO:
            return { ...state.user, isFetching: false, message: action.data, showMessage: true };
        case ADD_USER_REQUEST:
            return { ...state.user, isFetching: true, id: '', edit: false, showMessage: false };
        case ADD_USER_OK:
            return { ...state.user, isFetching: false, message: 'User added', showMessage: true };
        case ADD_USER_KO:
            return { ...state.user, isFetching: false, message: action.data, showMessage: true };
        case CREATE_USER:
            return { user: { name: '', password: '', id: ''}, isFetching: false, edit: false, showMessage: false, id:'' };
        default:
            return state;
    }
}

function forum(state, action) {
    switch (action.type) {
        case FETCH_FORUM_THREADS_IN_PROGRESS:
            return { threads: [], posts: [], fetching: true, message: '' };
        case FETCH_FORUM_THREADS_OK:
            return { posts: [], threads: action.data, fetching: false, message: '' };
        case FETCH_FORUM_THREAD_POSTS_IN_PROGRESS:
            return { threads: [], posts: [], fetching: true, message: '' };
        case FETCH_FORUM_THREAD_POSTS_OK:
            return { threadTitle: action.data.threadTitle, posts: action.data.posts, threads: [], fetching: false, message: '' };
        case CREATE_FORUM_THREAD_IN_PROGRESS:
            return { posts: [], threads: [], fetching: true, message:'' };
        case CREATE_FORUM_THREAD_OK:
            return { posts: [], threads: action.data, fetching: false, message: 'New Thread successfully created' };
        case CREATE_FORUM_THREAD_POST_IN_PROGRESS:
            return { posts: [], threads: [], fetching: true, message: '' };
        case CREATE_FORUM_THREAD_POST_OK:
            return { posts: action.data, threads: [], fetching: false, message: 'New Post successfully created' };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    store
});

export default rootReducer;