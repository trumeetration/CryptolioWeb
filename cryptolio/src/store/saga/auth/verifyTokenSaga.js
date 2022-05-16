import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_VERIFY_TOKEN} from "../../types/authModalTypes";
import {
    hideLoginButton,
    updateIsAuth,
} from "../../actions/authModalActions";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {Url} from "../../../constans/global";

const request = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${Url}/users/verify`, requestOptions).catch(() => {})
};

function* fetchTokenVerifyWorker(info) {
    yield put(hideLoginButton(true));
    const data = yield call(
        request
    );
    if (data) {
        if (data.status === 401) {
            yield put(updateIsAuth(false));
        } else {
            const json = yield call(() => new Promise((res) => res(data.json())));
            yield put(updateIsAuth(true, json.result.nickname));
        }
        yield put(hideLoginButton(false));
    }
    else {
        yield put(hideLoginButton(false));
        yield put(updateGlobalAlertList({id:Math.random(), header: "Whoops", body: "Something went wrong :("}))
    }
}

export function* fetchTokenVerifyWatcher() {
    yield takeEvery(FETCH_VERIFY_TOKEN, fetchTokenVerifyWorker);
}