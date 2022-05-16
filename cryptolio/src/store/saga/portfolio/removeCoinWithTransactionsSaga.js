import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_REMOVE_COIN_WITH_TRANSACTIONS} from "../../types/authModalTypes";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {fetchGetPortfolios} from "../../actions/authModalActions";
import {Url} from "../../../constans/global";

const request = (data) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "portfolioId": data.portfolioId,
        "coinId": data.coinId
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${Url}/portfolio/remove_coin`, requestOptions)
}

export function* fetchRemoveCoinWithTransactionsWorker({data}) {
    //console.log(data);
    const answer = yield call(
        request,
        data
    );
    if (answer.status !== 400)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Coin removed from portfolio`}))
        yield put(fetchGetPortfolios());
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Failed`, body: `You need to login`}))
    }
}

export function* fetchRemoveCoinWithTransactionsWatcher() {
    yield takeEvery(FETCH_REMOVE_COIN_WITH_TRANSACTIONS, fetchRemoveCoinWithTransactionsWorker);
}