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
    UPDATE_MODAL_MODE,
    HIDE_LOGIN_BUTTON,
    SET_COINS_LIST,
    SET_COINS_LIST_SIZE,
    UPDATE_CURRENT_COINS_LIST_PAGE,
    UPDATE_IS_COINS_LIST_LOADING,
    SET_PORTFOLIO_LIST,
    UPDATE_SELECTED_PORTFOLIO,
    SET_PORTFOLIO_RECORDS_LIST,
    UPDATE_IS_PORTFOLIO_RECORDS_LIST_LOADING,
    SET_ALL_COINS_LIST,
    SET_SEARCH_COIN_LIST,
    UPDATE_IS_DATA_LIST_LOADING, UPDATE_IS_ADD_PORTFOLIO_LOADING
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
    coinsList: null,
    coinsListSize: 0,
    currentCoinsListPage: 1,
    isCoinsListLoading: false,
    portfolioList: null,
    selectedPortfolio: null,
    portfolioRecordsList: null,
    isPortfolioRecordsListLoading: false,
    searchCoinList: null,
    isDataListLoading: false,
    isAddPortfolioLoading: false,
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
        case SET_COINS_LIST_SIZE:
            return {
                ...state,
                coinsListSize: action.value,
            }
        case UPDATE_CURRENT_COINS_LIST_PAGE:
            return {
                ...state,
                currentCoinsListPage: action.value,
            }
        case UPDATE_IS_COINS_LIST_LOADING:
            return {
                ...state,
                isCoinsListLoading: action.value,
            }
        case SET_PORTFOLIO_LIST:
            return {
                ...state,
                portfolioList: action.value,
            }
        case UPDATE_IS_PORTFOLIO_RECORDS_LIST_LOADING:
            return {
                ...state,
                isPortfolioRecordsListLoading: action.value,
            }
        case UPDATE_SELECTED_PORTFOLIO:
            return {
                ...state,
                selectedPortfolio: action.value,
            }
        case SET_PORTFOLIO_RECORDS_LIST:
            return {
                ...state,
                portfolioRecordsList: action.value,
            }
        case SET_SEARCH_COIN_LIST:
            return {
                ...state,
                searchCoinList: action.value,
            }
        case UPDATE_IS_DATA_LIST_LOADING:
            return {
                ...state,
                isDataListLoading: action.value,
            }
        case UPDATE_IS_ADD_PORTFOLIO_LOADING:
            return {
                ...state,
                isAddPortfolioLoading: action.value,
            }
        default:
            return state;
    }
};