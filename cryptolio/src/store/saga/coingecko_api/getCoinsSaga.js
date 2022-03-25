import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_COINS} from "../../types/authModalTypes";
import {
    setCoinsList, setCoinsListSize, updateIsCoinsListLoading
} from "../../actions/authModalActions";

const getCoinsList = (currentCoinsListPage) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentCoinsListPage}&sparkline=true&price_change_percentage=1h,24h,7d`, requestOptions);
}

const getCoinsListSize = () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`https://api.coingecko.com/api/v3/coins/list`, requestOptions);
}

function* fetchGetCoinsWorker(info) {
    yield put(updateIsCoinsListLoading(true));
    const data_2 = yield call(
        getCoinsListSize,
    );
    const data = yield call(
        getCoinsList,
        info.currentCoinsListPage,
    );
    const json = yield call(() => new Promise((res) => res(data.json())));
    const allCoins = yield call(() => new Promise((res) => res(data_2.json())));
    yield put(setCoinsListSize(allCoins.length));
    const preparedData = json.map(el => ({
            coinId: el.id,
            name: el.name,
            image: el.image,
            marketPrice: Math.round(el.current_price * 1000) / 1000,
            priceChange24h: Math.round(el.price_change_percentage_24h_in_currency * 100) / 100,
            priceChange7d: Math.round(el.price_change_percentage_7d_in_currency * 100) / 100,
            marketCap: Math.round(el.market_cap * 100) / 100,
            sparkleData: el.sparkline_in_7d.price
        }))
    yield put(updateIsCoinsListLoading(false));
    yield put(setCoinsList(preparedData));
}


export function* getCoinsWatcher() {
    yield takeEvery(FETCH_GET_COINS, fetchGetCoinsWorker);
}