import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_ADD_PORTFOLIO_RECORDS} from "../../types/authModalTypes";
import {Url} from "../../../constans/global";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {fetchGetPortfolios} from "../../actions/authModalActions";

const request = (data) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "portfolioId": data.portfolioId,
        "coinId": data.coinId,
        "txTime": data.txTime,
        "txPrice": data.txPrice,
        "amount": data.amount,
        "notes": data.note,
        "recordType": data.recordType
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${Url}/portfolio/add`, requestOptions);
}

export function* fetchAddPortfolioRecordsWorker ({data}) {
    const answer = yield call(
        request,
        data
    );
    if (answer.status !== 400)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Transaction added to portfolio`}))
        yield put(fetchGetPortfolios());
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Failed`, body: `You need to login`}))
    }
}

export function* fetchAddPortfolioRecordsWatcher() {
    yield takeEvery(FETCH_ADD_PORTFOLIO_RECORDS, fetchAddPortfolioRecordsWorker);
}