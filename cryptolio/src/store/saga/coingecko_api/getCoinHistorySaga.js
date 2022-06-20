import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_COIN_HISTORY} from "../../types/authModalTypes";
import {setCoinHistory} from "../../actions/authModalActions";
import {updateGlobalAlertList} from "../../actions/activePageActions";

const request = (data) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    //01-05-2022
    return fetch(`https://api.coingecko.com/api/v3/coins/${data.coinId}/history?date=${data.date}`, requestOptions);
}

export function* fetchGetCoinHistoryWorker({data}) {
    const answer = yield call(
        request,
        data
    );
    if (answer.status === 200) {
        const json = yield call(() => new Promise((res) => res(answer.json())));
        let preparedData = {};

            preparedData = {
                id: json.id,
                image: json.image,
                marketPrice: json.market_data.current_price.usd,
                marketCup: json.market_data.market_cap.usd,
                totalVolume: json.market_data.total_volume.usd
            }

        //console.log(preparedData);
        yield put(setCoinHistory(preparedData));
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: "Whoops", body: "Something went wrong :("}))
    }
}

export function* getCoinHistoryWatcher() {
    yield takeEvery(FETCH_GET_COIN_HISTORY, fetchGetCoinHistoryWorker);
}