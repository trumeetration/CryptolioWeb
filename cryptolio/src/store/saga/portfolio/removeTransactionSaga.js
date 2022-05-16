import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_REMOVE_TRANSACTION} from "../../types/authModalTypes";
import {Url} from "../../../constans/global";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {fetchGetPortfolios} from "../../actions/authModalActions";

const request = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${Url}/portfolio/remove_record/${id}`, requestOptions);
}

export function* fetchRemoveTransactionWorker({data}) {
    const answer = yield call(
        request,
        data.id
    );
    if (answer.status !== 400)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Transaction removed`}))
        yield put(fetchGetPortfolios());
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Failed`, body: `You need to login`}))
    }
}

export function* fetchRemoveTransactionWatcher() {
    yield takeEvery(FETCH_REMOVE_TRANSACTION, fetchRemoveTransactionWorker);
}