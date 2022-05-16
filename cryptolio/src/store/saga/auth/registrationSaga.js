import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_REGISTRATION} from "../../types/authModalTypes";
import {Url} from "../../../constans/global";
import {
    setRegistrationError,
    setRequestRegistrationError, updateIsAuth,
    updateIsLoginModalVisible,
    updateIsRegistrationLoading
} from "../../actions/authModalActions";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import isPlainObject from "react-redux/lib/utils/isPlainObject";

const request = (data) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": data.email,
        "nickname": data.nickname,
        "password": data.password
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${Url}/users/register`, requestOptions);
}

export function* fetchRegistrationWorker({data}) {
    yield put(updateIsRegistrationLoading(true));
    const answer = yield call(
        request,
        data
    );
    if (answer) {
        const json = yield call(() => new Promise((res) => res(answer.json())));
        if (json.isError) {
            /*if (typeof json.responseException.exceptionMessage === 'object') yield put(setRegistrationError(`${json.responseException.exceptionMessage}`));
                else yield put(setRegistrationError(`${json.responseException.exceptionMessage}`));*/ //todo error display
            yield put(setRequestRegistrationError(true));
        } else {
            yield put(updateIsAuth(true, data.nickname));
            yield put(setRequestRegistrationError(false));
            localStorage.setItem('accessToken', json.result);
            yield put(updateIsLoginModalVisible(false));

        }
        yield put(updateIsRegistrationLoading(false));
    }
    else {
        yield put(updateIsRegistrationLoading(false));
        yield put(updateIsLoginModalVisible(false));
        yield put(updateGlobalAlertList({id: Math.random(), header: "Whoops", body: "Something went wrong :("}));
    }
}

export function* fetchRegistrationWatcher() {
    yield takeEvery(FETCH_REGISTRATION, fetchRegistrationWorker);
}