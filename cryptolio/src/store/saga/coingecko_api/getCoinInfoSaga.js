import {call, put, takeEvery} from "redux-saga/effects";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {setCoinInfo, updateIsCoinInfoLoading,} from "../../actions/authModalActions";
import {FETCH_GET_COIN_INFO} from "../../types/authModalTypes";

const request = (id) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`https://api.coingecko.com/api/v3/coins/${id}?tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`, requestOptions);
}

export function* fetchGetCoinInfoWorker({id}) {
    yield put(updateIsCoinInfoLoading(true));
    const answer = yield call(
        request,
        id
    );
    if (answer.status === 400) {
        yield put(updateGlobalAlertList({id:Math.random(), header: "Whoops", body: "Something went wrong :("}))
    }
    else {
        const json = yield call(() => new Promise((res) => res(answer.json())));
        //console.log(json);
        let preparedData = {
            id: json.id,
            name: json.name,
            symbol: json.symbol,
            //sparkline: json.market_data.sparkline_7d.price,
            image: json.image,
            marketPrice: json.market_data.current_price.usd,
            marketCap: json.market_data.market_cap.usd,
            marketCapRank: json.market_data.market_cap_rank,
            low24h: json.market_data.low_24h.usd,
            high24h: json.market_data.high_24h.usd,
            totalVolume: json.market_data.total_volume.usd,
            priceChange24h: json.market_data.price_change_24h_in_currency.usd,
            priceChangePercentage1hInCurrency: json.market_data.price_change_percentage_1h_in_currency.usd,
            priceChangePercentage24hInCurrency: json.market_data.price_change_percentage_24h_in_currency.usd,
            priceChangePercentage7dInCurrency: json.market_data.price_change_percentage_7d_in_currency.usd,
            priceChangePercentage14dInCurrency: json.market_data.price_change_percentage_14d_in_currency.usd,
            priceChangePercentage30dInCurrency: json.market_data.price_change_percentage_30d_in_currency.usd,
            priceChangePercentage60dInCurrency: json.market_data.price_change_percentage_60d_in_currency.usd,
            priceChangePercentage200dInCurrency: json.market_data.price_change_percentage_200d_in_currency.usd,
            priceChangePercentage1yInCurrency: json.market_data.price_change_percentage_1y_in_currency.usd,
            ath: json.market_data.ath.usd,
            athPercentage: json.market_data.ath_change_percentage.usd,
            atl: json.market_data.atl.usd,
            atlPercentage: json.market_data.atl_change_percentage.usd,
        }
        //console.log(preparedData);
        yield put(setCoinInfo(preparedData));
        yield put(updateIsCoinInfoLoading(false));
    }
}

export function* fetchGetCoinInfoWatcher() {
    yield takeEvery(FETCH_GET_COIN_INFO, fetchGetCoinInfoWorker);
}