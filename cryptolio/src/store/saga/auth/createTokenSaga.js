import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TOKEN} from "../../types/authModalTypes";
import {setRequestLoginError, updateIsAuth, updateIsLoginLoading, updateIsLoginModalVisible} from "../../actions/authModalActions";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {Url} from "../../../constans/global"

const fetchCreateToken = (email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": email,
        "password": password
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${Url}/users/login`, requestOptions).catch(() => {});
};

function* fetchTokenCreateWorker(info) {
    yield put(updateIsLoginLoading(true));
    const data = yield call(
        fetchCreateToken,
        info.login,
        info.password
    );
    if (data) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        if (json.isError) {
            yield put(setRequestLoginError(true));
        } else {
            yield put(updateIsAuth(true, json.message));
            yield put(setRequestLoginError(false));
            localStorage.setItem('accessToken', json.result);
            yield put(updateIsLoginModalVisible(false));

        }
        yield put(updateIsLoginLoading(false));
    }
    else {
        yield put(updateIsLoginLoading(false));
        yield put(updateIsLoginModalVisible(false));
        yield put(updateGlobalAlertList({id:Math.random(), header: "Whoops", body: "Something went wrong :("}))
    }
}

export function* fetchTokenCreateWatcher() {
    yield takeEvery(FETCH_CREATE_TOKEN, fetchTokenCreateWorker);
}