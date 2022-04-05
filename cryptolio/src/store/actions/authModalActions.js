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
    UPDATE_IS_LOGIN_MODAL_VISIBLE,
    FETCH_VERIFY_TOKEN,
    HIDE_LOGIN_BUTTON,
    FETCH_GET_COINS,
    SET_COINS_LIST,
    SET_COINS_LIST_SIZE,
    UPDATE_CURRENT_COINS_LIST_PAGE,
    UPDATE_IS_COINS_LIST_LOADING,
    SET_PORTFOLIO_LIST,
    FETCH_GET_PORTFOLIOS,
    UPDATE_SELECTED_PORTFOLIO,
    FETCH_GET_PORTFOLIO_RECORDS,
    SET_PORTFOLIO_RECORDS_LIST,
    UPDATE_IS_PORTFOLIO_RECORDS_LIST_LOADING, SET_ALL_COINS_LIST, FETCH_GET_COINS_DATA,
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

export const fetchGetCoins = (currentCoinsListPage) => ({
    type: FETCH_GET_COINS,
    currentCoinsListPage
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

export const setCoinsList = (value) => ({
    type: SET_COINS_LIST,
    value
})

export const setCoinsListSize = (value) => ({
    type: SET_COINS_LIST_SIZE,
    value
})

export const updateCurrentCoinsListPage = (value) => ({
    type: UPDATE_CURRENT_COINS_LIST_PAGE,
    value
})

export const updateIsCoinsListLoading = (value) => ({
    type: UPDATE_IS_COINS_LIST_LOADING,
    value
})

export const updateIsPortfolioRecordsListLoading = (value) => ({
    type: UPDATE_IS_PORTFOLIO_RECORDS_LIST_LOADING,
    value
})

export const setPortfolioList = (value) => ({
    type: SET_PORTFOLIO_LIST,
    value
})

export const fetchGetPortfolios = () => ({
    type: FETCH_GET_PORTFOLIOS,
})

export const updateSelectedPortfolio = (value) => ({
    type: UPDATE_SELECTED_PORTFOLIO,
    value
})

export const fetchGetPortfolioRecords = (id) => ({
    type: FETCH_GET_PORTFOLIO_RECORDS,
    id
})

export const setPortfolioRecordsList = (value) => ({
    type: SET_PORTFOLIO_RECORDS_LIST,
    value
})

export const setAllCoinsList = (value) => ({
    type: SET_ALL_COINS_LIST,
    value
})

export const fetchGetCoinsData = (ids, setData) => ({
    type: FETCH_GET_COINS_DATA,
    ids,
    setData
})