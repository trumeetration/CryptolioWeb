import {SET_ACTIVE_PAGE, UPDATE_IS_LOGIN_MODAL_VISIBLE} from "../types/activePageTypes";

export const setActivePage = (pageName) => ({
    type: SET_ACTIVE_PAGE,
    pageName
})

export const updateIsLoginModalVisible = (value) => ({
    type: UPDATE_IS_LOGIN_MODAL_VISIBLE,
    value
})