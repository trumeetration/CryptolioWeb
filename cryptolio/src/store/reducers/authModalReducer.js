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
    SET_SEARCH_COIN_LIST,
    UPDATE_IS_DATA_LIST_LOADING,
    UPDATE_IS_ADD_PORTFOLIO_LOADING,
    UPDATE_IS_OPEN_ADD_RECORDS_MODAL,
    UPDATE_SELECTED_COIN,
    SET_COIN_HISTORY,
    UPDATE_IS_OPEN_SEARCH_COIN,
    UPDATE_IS_OPEN_CONFIRMATION_MODAL,
    UPDATE_SELECTED_TRANSACTION_FOR_REMOVE,
    UPDATE_REMOVE_TYPE,
    UPDATE_SELECTED_COIN_FOR_REMOVE,
    SET_REGISTRATION_ERROR,
    IS_TRASH_OPEN,
    UPDATE_IS_COIN_INFO_VISIBLE,
    UPDATE_IS_COIN_INFO_LOADING,
    SET_COIN_INFO,
    SET_CHARTS_INFO,
    UPDATE_IS_CHARTS_INFO_LOADING,
    SET_TOTAL_PORTFOLIO_PRICE
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
    registrationError: '',
    isLoginLoading: false,
    isRegistrationLoading: false,
    isHiddenLoginButton: false,
    coinsList: null,
    coinsListSize: 0,
    currentCoinsListPage: 1,
    coinsPerPage: 10,
    isCoinsListLoading: false,
    portfolioList: null,
    selectedPortfolio: null,
    portfolioRecordsList: null,
    isPortfolioRecordsListLoading: false,
    searchCoinList: null,
    isDataListLoading: false,
    isAddPortfolioLoading: false,
    isOpenAddRecordsModal: false,
    isOpenSearchCoinModal: false,
    selectedCoin: null,
    coinHistory: null,
    isOpenConfirmationModal: false,
    selectedTransactionForRemove: null,
    selectedCoinForRemove: null,
    removeType: '',
    isTrashOpen: false,
    isCoinInfoVisible: false,
    coinInfo: null,
    isCoinInfoLoading: true,
    isChartsInfoLoading: true,
    chartsInfo: null,
    totalPortfolioPrice: 0,
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
        case SET_REGISTRATION_ERROR:
            return {
                ...state,
                registrationError: action.value,
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
                totalPortfolioPrice: 0,
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
        case UPDATE_IS_OPEN_ADD_RECORDS_MODAL:
            return {
                ...state,
                isOpenAddRecordsModal: action.value,
            }
        case UPDATE_IS_OPEN_SEARCH_COIN:
        {
            return {
                ...state,
                isOpenSearchCoinModal: action.value,
            }
        }
        case UPDATE_SELECTED_COIN:
            return {
                ...state,
                selectedCoin: action.value,
            }
        case SET_COIN_HISTORY:
            return {
                ...state,
                coinHistory: action.value,
            }
        case UPDATE_IS_OPEN_CONFIRMATION_MODAL:
            return {
                ...state,
                isOpenConfirmationModal: action.value,
            }
        case UPDATE_SELECTED_TRANSACTION_FOR_REMOVE:
            return {
                ...state,
                selectedTransactionForRemove: action.value,
            }
        case UPDATE_SELECTED_COIN_FOR_REMOVE:
            return {
                ...state,
                selectedCoinForRemove: action.value,
            }
        case UPDATE_REMOVE_TYPE:
            return {
                ...state,
                removeType: action.value,
            }
        case IS_TRASH_OPEN:
            return {
                ...state,
                isTrashOpen: action.value,
            }
        case UPDATE_IS_COIN_INFO_VISIBLE:
            return {
                ...state,
                isCoinInfoVisible: action.value,
            }
        case UPDATE_IS_COIN_INFO_LOADING:
            return {
                ...state,
                isCoinInfoLoading: action.value,
            }
        case SET_COIN_INFO:
            return {
                ...state,
                coinInfo: action.value,
            }
        case UPDATE_IS_CHARTS_INFO_LOADING:
            return {
                ...state,
                isChartsInfoLoading: action.value,
            }
        case SET_CHARTS_INFO:
            return {
                ...state,
                chartsInfo: action.value,
            }
        case SET_TOTAL_PORTFOLIO_PRICE:
            return {
                ...state,
                totalPortfolioPrice: action.value,
            }
        default:
            return state;
    }
};