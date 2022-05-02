import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_SEARCH_COINS} from "../../types/authModalTypes";
import {setSearchCoinList, updateIsDataListLoading} from "../../actions/authModalActions";

const request = (str) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`https://api.coingecko.com/api/v3/search?query=${str}`, requestOptions);
}

function* fetchSearchCoinsWorker({str}) {
    yield put(updateIsDataListLoading(true));
    const data = yield call(
        request,
        str
    );
    const tempJson = yield call(() => new Promise((res) => res(data.json())));
    const json = tempJson.coins;
    yield put(setSearchCoinList(json));
    yield put(updateIsDataListLoading(false));
    //console.log(json);
}


export function* fetchSearchCoinsWatcher() {
    yield takeEvery(FETCH_SEARCH_COINS, fetchSearchCoinsWorker);
}