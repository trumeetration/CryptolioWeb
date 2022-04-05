import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_COINS_DATA} from "../../types/authModalTypes";
import {
    setAllCoinsList,setCoinsListSize, updateIsCoinsListLoading
} from "../../actions/authModalActions";

const getCoinsData = (idsStr) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsStr}&order=market_cap_desc&per_page=250&page=1&sparkline=false`, requestOptions);
}

function* fetchGetCoinDataWorker({ids}) {
    let idsStr = ids.join('%2C');
    const data = yield call(
        getCoinsData,
        idsStr
    );
    const coinData = yield call(() => new Promise((res) => res(data.json())));
    console.log("----->", coinData);
    const preparedData = {
        coinId: coinData.id,
        symbol: coinData.symbol,
        name: coinData.name,
        image: coinData.image,
        marketPrice: Math.round(coinData.market_data.current_price.usd * 1000) / 1000,
    };
    //console.log(preparedData);
}


export function* getCoinDataWatcher() {
    yield takeEvery(FETCH_GET_COINS_DATA, fetchGetCoinDataWorker);
}