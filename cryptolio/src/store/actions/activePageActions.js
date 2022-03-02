import {REMOVE_GLOBAL_ALERT, SET_ACTIVE_PAGE, UPDATE_GLOBAL_ALERT_LIST} from "../types/activePageTypes";

export const setActivePage = (pageName) => ({
    type: SET_ACTIVE_PAGE,
    pageName
})

export const updateGlobalAlertList = (info) => ({
    type: UPDATE_GLOBAL_ALERT_LIST,
    info,
})

export const removeGlobalAlert = (id) => ({
    type: REMOVE_GLOBAL_ALERT,
    id
})