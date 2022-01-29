import {
    SET_ACTIVE_PAGE,
    UPDATE_IS_LOGIN_MODAL_VISIBLE
} from "../types/activePageTypes";

const INITIAL_STATE = {
    isAuth: false,
    activePage: window.location.pathname === "/" && "Main",
    isLoginModalVisible: false,
};

export const activePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.pageName
            }
        case UPDATE_IS_LOGIN_MODAL_VISIBLE:
            return {
                ...state,
                isLoginModalVisible: action.value,
            }
        default:
            return state;
    }
};