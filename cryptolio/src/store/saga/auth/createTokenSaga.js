import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TOKEN} from "../../types/authModalTypes";
import {setRequestLoginError, updateIsAuth, updateIsLoginLoading, updateIsLoginModalVisible} from "../../actions/authModalActions";

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

    return fetch("https://localhost:5001/users/login", requestOptions);
};

function* fetchTokenCreateWorker(info) {
    yield put(updateIsLoginLoading(true));
    const data = yield call(
        fetchCreateToken,
        info.login,
        info.password
    );
    const json = yield call(() => new Promise((res) => res(data.json())));
    //console.log(json); //DEBUG
    if (json.isError) {
        yield put(setRequestLoginError(true));
    }
    else {
        yield put(updateIsAuth(true, json.message, json.token));
        yield put(setRequestLoginError(false));
        //document.cookie = `user=${json.message}; max-age=36000`;
        //document.cookie = `token=${json.token}; max-age=36000`;
        console.log(json);
        localStorage.setItem('accessToken', json.result);
        yield put(updateIsLoginModalVisible(false));

    }
    //alert( document.cookie );
    yield put(updateIsLoginLoading(false));
}

export function* tokenCreateWatcher() {
    yield takeEvery(FETCH_CREATE_TOKEN, fetchTokenCreateWorker);
}