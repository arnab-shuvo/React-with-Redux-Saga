import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER
} from 'Constants/actionTypes';

const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    session_key: '',
    expires_at: '',
    role: '',
    email: '',
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loading: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                session_key: action.payload.session_key,
                expires_at: action.payload.expires_at
            };
        case REGISTER_USER:
            return {
                ...state,
                loading: true
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.uid
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null
            };
        default:
            return {
                ...state
            };
    }
}