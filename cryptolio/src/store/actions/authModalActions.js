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
    UPDATE_IS_PORTFOLIO_RECORDS_LIST_LOADING,
    FETCH_GET_COINS_DATA,
    FETCH_SEARCH_COINS,
    SET_SEARCH_COIN_LIST,
    UPDATE_IS_DATA_LIST_LOADING,
    FETCH_ADD_PORTFOLIO,
    UPDATE_IS_ADD_PORTFOLIO_LOADING,
    FETCH_EDIT_PORTFOLIO,
    FETCH_DELETE_PORTFOLIO,
    UPDATE_IS_OPEN_ADD_RECORDS_MODAL,
    UPDATE_SELECTED_COIN,
    FETCH_ADD_PORTFOLIO_RECORDS,
    FETCH_GET_COIN_HISTORY,
    SET_COIN_HISTORY,
    UPDATE_IS_OPEN_SEARCH_COIN,
    UPDATE_IS_OPEN_CONFIRMATION_MODAL,
    UPDATE_SELECTED_TRANSACTION_FOR_REMOVE,
    FETCH_REMOVE_TRANSACTION,
    UPDATE_REMOVE_TYPE,
    UPDATE_SELECTED_COIN_FOR_REMOVE,
    FETCH_REMOVE_COIN_WITH_TRANSACTIONS, FETCH_REGISTRATION, SET_REGISTRATION_ERROR,
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

export const fetchRegistration = (data) => ({
    type: FETCH_REGISTRATION,
    data
})

export const setRegistrationError = (value) => ({
    type: SET_REGISTRATION_ERROR,
    value
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

export const fetchGetCoinsData = (ids, setData) => ({
    type: FETCH_GET_COINS_DATA,
    ids,
    setData
})

export const fetchSearchCoins = (str, updateIsCoinListLoading) => ({
    type: FETCH_SEARCH_COINS,
    str,
    updateIsCoinListLoading
})

export const setSearchCoinList = (value) => ({
    type: SET_SEARCH_COIN_LIST,
    value
})

export const updateIsDataListLoading = (value) => ({
    type: UPDATE_IS_DATA_LIST_LOADING,
    value
})

export const fetchAddPortfolio = (name) => ({
    type: FETCH_ADD_PORTFOLIO,
    name
})

export const updateIsAddPortfolioLoading = (value) => ({
    type: UPDATE_IS_ADD_PORTFOLIO_LOADING,
    value
})

export const fetchEditPortfolio = (id, name) => ({
    type: FETCH_EDIT_PORTFOLIO,
    id,
    name
})

export const fetchDeletePortfolio = (id) => ({
    type: FETCH_DELETE_PORTFOLIO,
    id
})

export const updateIsOpenAddRecordsModal = (value) => ({
    type: UPDATE_IS_OPEN_ADD_RECORDS_MODAL,
    value
})

export const updateSelectedCoin = (value) => ({
    type: UPDATE_SELECTED_COIN,
    value
})

export const fetchAddPortfolioRecords = (data) => ({
    type: FETCH_ADD_PORTFOLIO_RECORDS,
    data
})

export const fetchGetCoinHistory = (data) => ({
    type: FETCH_GET_COIN_HISTORY,
    data
})

export const setCoinHistory = (value) => ({
    type: SET_COIN_HISTORY,
    value
})

export const updateIsOpenSearchCoinModal = (value) => ({
    type: UPDATE_IS_OPEN_SEARCH_COIN,
    value
})

export const updateIsOpenConfirmationModal = (value) => ({
    type: UPDATE_IS_OPEN_CONFIRMATION_MODAL,
    value
})

export const updateSelectedTransactionForRemove = (value) => ({
    type: UPDATE_SELECTED_TRANSACTION_FOR_REMOVE,
    value
})

export const updateSelectedCoinForRemove = (value) => ({
    type: UPDATE_SELECTED_COIN_FOR_REMOVE,
    value
})

export const fetchRemoveTransaction = (data) => ({
    type: FETCH_REMOVE_TRANSACTION,
    data
})

export const fetchRemoveCoinWithTransaction = (data) => ({
    type: FETCH_REMOVE_COIN_WITH_TRANSACTIONS,
    data
})

export const updateRemoveType = (value) => ({
    type: UPDATE_REMOVE_TYPE,
    value
})