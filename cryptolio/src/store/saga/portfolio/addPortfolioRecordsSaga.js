import {call, takeEvery} from "redux-saga/effects";
import {FETCH_ADD_PORTFOLIO_RECORDS} from "../../types/authModalTypes";
import {Url} from "../../../constans/global";

const request = (data) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "portfolioId": data.portfolioId,
        "coinId": data.coinId,
        "buyTime": data.buyTime,
        "buyPrice": data.buyPrice,
        "amount": data.amount,
        "note": data.note,
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
    console.log(data);
    const answer = yield call(
        request,
        data
    );
    console.log('---->',answer.type);
}

export function* fetchAddPortfolioRecordsWatcher() {
    yield takeEvery(FETCH_ADD_PORTFOLIO_RECORDS, fetchAddPortfolioRecordsWorker);
}