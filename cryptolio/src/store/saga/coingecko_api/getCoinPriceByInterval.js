import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_COIN_PRICE_BY_INTERVAL} from "../../types/authModalTypes";
import {setChartsInfo, updateIsChartsInfoLoading} from "../../actions/authModalActions";

const request = (data) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`https://api.coingecko.com/api/v3/coins/${data.id}/market_chart/range?vs_currency=usd&from=${data.startTime}&to=${data.endTime}`, requestOptions)
}

export function* fetchGetCoinPriceByIntervalWorker({data}) {
    yield put(updateIsChartsInfoLoading(true));
    console.log(data)
    const answer = yield call(
        request,
        data
    );
    const json = yield call(() => new Promise((res) => res(answer.json())));
    console.log(json);
    yield put(setChartsInfo(json));
    yield put(updateIsChartsInfoLoading(false));
}

export function* getCoinPriceByIntervalWatcher() {
    yield takeEvery(FETCH_GET_COIN_PRICE_BY_INTERVAL, fetchGetCoinPriceByIntervalWorker);
}