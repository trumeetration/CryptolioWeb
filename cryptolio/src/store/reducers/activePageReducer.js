import {
    REMOVE_GLOBAL_ALERT,
    SET_ACTIVE_PAGE, UPDATE_GLOBAL_ALERT_LIST
} from "../types/activePageTypes";

const INITIAL_STATE = {
    activePage: window.location.pathname === "/" && "Main",
    globalAlertList: [],
};

export const activePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.pageName
            }
        case UPDATE_GLOBAL_ALERT_LIST:
            return {
                ...state,
                globalAlertList: state.globalAlertList.concat(action.info),
            }
        case REMOVE_GLOBAL_ALERT:
            return {
                ...state,
                globalAlertList: state.globalAlertList.filter((alert) => alert.id !== action.id),
            }
        default:
            return state;
    }
};