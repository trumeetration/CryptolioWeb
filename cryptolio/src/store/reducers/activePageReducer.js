import {
    SET_ACTIVE_PAGE
} from "../types/activePageTypes";

const INITIAL_STATE = {
    activePage: window.location.pathname === "/" && "Main",

};

export const activePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.pageName
            }
        default:
            return state;
    }
};