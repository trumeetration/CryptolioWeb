import {SET_ACTIVE_PAGE} from "../types/activePageTypes";

export const setActivePage = (pageName) => ({
    type: SET_ACTIVE_PAGE,
    pageName
})