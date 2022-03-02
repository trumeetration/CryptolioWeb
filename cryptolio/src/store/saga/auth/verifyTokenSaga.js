import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TOKEN, FETCH_VERIFY_TOKEN} from "../../types/authModalTypes";
import {
    hideLoginButton,
    setRequestLoginError,
    updateIsAuth,
    updateIsLoginLoading,
    updateIsLoginModalVisible
} from "../../actions/authModalActions";

const request = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        return fetch("https://localhost:5001/users/verify", requestOptions)
    }
    catch {
        return false;
    }
};

function* fetchTokenVerifyWorker(info) {
    yield put(hideLoginButton(true));
    const data = yield call(
        request
    );
    console.log(data);
    if (data.status === 401) {
        yield put(updateIsAuth(false));
    }
    else {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(updateIsAuth(true, json.result.nickname));
    }
    yield put(hideLoginButton(false));
}

export function* fetchTokenVerifyWatcher() {
    yield takeEvery(FETCH_VERIFY_TOKEN, fetchTokenVerifyWorker);
}