import {Url} from "../../../constans/global";
import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_EDIT_PORTFOLIO, FETCH_RECOVER_TRANSACTION} from "../../types/authModalTypes";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {fetchGetPortfolios} from "../../actions/authModalActions";

const request = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "recordId": id
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${Url}/portfolio/recover`, requestOptions);
}

export function* fetchRecoverTransactionWorker({id}) {
    const answer = yield call(
        request,
        id,
    );
    if (answer.status !== 400)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Transaction recovered`}))
        yield put(fetchGetPortfolios());
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Failed`, body: `You need to login`}))
    }
}

export function* fetchRecoverTransactionWatcher() {
    yield takeEvery(FETCH_RECOVER_TRANSACTION, fetchRecoverTransactionWorker);
}