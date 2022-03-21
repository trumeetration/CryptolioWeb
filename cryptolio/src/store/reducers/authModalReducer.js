import {
    UPDATE_IS_LOGIN_MODAL_VISIBLE,
    SET_EMAIL_LOG,
    SET_EMAIL_REG,
    SET_LOGIN_LOG,
    SET_LOGIN_REG,
    SET_PASSWORD_LOG,
    SET_PASSWORD_REG,
    SET_REQUEST_LOGIN_ERROR,
    SET_REQUEST_REGISTRATION_ERROR,
    UPDATE_IS_AUTH,
    UPDATE_IS_LOGIN_LOADING,
    UPDATE_IS_REGISTRATION_LOADING,
    UPDATE_MODAL_MODE, HIDE_LOGIN_BUTTON, SET_COINS_LIST
} from "../types/authModalTypes";

const INITIAL_STATE = {
    isLoginModalVisible: false,
    regLogin: '',
    regEmail: '',
    regPassword: '',
    logLogin: '',
    logEmail: '',
    logPassword: '',
    modalMode: 'login',
    isAuth: false,
    username: null,
    requestLoginError: false,
    requestRegistrationError: false,
    isLoginLoading: false,
    isRegistrationLoading: false,
    isHiddenLoginButton: false,
    coinsList: null
};

export const authModalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_IS_LOGIN_MODAL_VISIBLE:
            return {
                ...state,
                isLoginModalVisible: action.value,
            }
        case SET_LOGIN_LOG:
            return {
                ...state,
                logLogin: action.value,
            }
        case SET_EMAIL_LOG:
            return {
                ...state,
                logEmail: action.value,
            }
        case SET_PASSWORD_LOG:
            return {
                ...state,
                logPassword: action.value,
            }
        case SET_LOGIN_REG:
            return {
                ...state,
                regLogin: action.value,
            }
        case SET_EMAIL_REG:
            return {
                ...state,
                regEmail: action.value,
            }
        case SET_PASSWORD_REG:
            return {
                ...state,
                regPassword: action.value,
            }
        case UPDATE_MODAL_MODE:
            return {
                ...state,
                modalMode: action.value,
            }
        case UPDATE_IS_AUTH:
            if (action.isAuth) {
                return {
                    ...state,
                    isAuth: action.isAuth,
                    username: action.username,
                }
            }
                else {
                    localStorage.clear();
                    return {
                        ...state,
                        isAuth: action.isAuth,
                        username: null,
                    }
                }
        case SET_REQUEST_LOGIN_ERROR:
            return {
                ...state,
                requestLoginError: action.value,
            }
        case SET_REQUEST_REGISTRATION_ERROR:
            return {
                ...state,
                requestRegistrationError: action.value,
            }
        case UPDATE_IS_LOGIN_LOADING:
            return {
                ...state,
                updateIsLoginLoading: action.value,
            }
        case UPDATE_IS_REGISTRATION_LOADING:
            return {
                ...state,
                updateIsRegistrationLoading: action.value,
            }
        case HIDE_LOGIN_BUTTON:
            return {
                ...state,
                isHiddenLoginButton: action.value,
            }
        case SET_COINS_LIST:
            return {
                ...state,
                coinsList: action.value,
            }
        default:
            return state;
    }
};