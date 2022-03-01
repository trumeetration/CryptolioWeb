import {
    FETCH_CREATE_TOKEN,
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
    UPDATE_MODAL_MODE,
    UPDATE_IS_LOGIN_MODAL_VISIBLE, FETCH_VERIFY_TOKEN, HIDE_LOGIN_BUTTON,
} from "../types/authModalTypes";

export const setLoginReg = (value) => ({
    type: SET_LOGIN_REG,
    value
})

export const setEmailLog = (value) => ({
    type: SET_EMAIL_LOG,
    value
})

export const setEmailReg = (value) => ({
    type: SET_EMAIL_REG,
    value
})

export const setPasswordReg = (value) => ({
    type: SET_PASSWORD_REG,
    value
})

export const setLoginLog = (value) => ({
    type: SET_LOGIN_LOG,
    value
})

export const setPasswordLog = (value) => ({
    type: SET_PASSWORD_LOG,
    value
})

export const updateModalMode = (value) => ({
    type: UPDATE_MODAL_MODE,
    value
})

export const fetchCreateToken = (login, password) => ({
    type: FETCH_CREATE_TOKEN,
    login,
    password
})

export const updateIsAuth = (isAuth, username) => ({
    type: UPDATE_IS_AUTH,
    isAuth, username
})

export const setRequestLoginError = (value) => ({
    type: SET_REQUEST_LOGIN_ERROR,
    value
})

export const setRequestRegistrationError = (value) => ({
    type: SET_REQUEST_REGISTRATION_ERROR,
    value
})

export const updateIsLoginLoading = (value) => ({
    type: UPDATE_IS_LOGIN_LOADING,
    value
})

export const updateIsRegistrationLoading = (value) => ({
    type: UPDATE_IS_REGISTRATION_LOADING,
    value
})

export const updateIsLoginModalVisible = (value) => ({
    type: UPDATE_IS_LOGIN_MODAL_VISIBLE,
    value
})

export const fetchVerifyToken = (value) => ({
    type: FETCH_VERIFY_TOKEN,
    value
})

export const hideLoginButton = (value) => ({
    type: HIDE_LOGIN_BUTTON,
    value
})