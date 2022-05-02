import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_PORTFOLIO_RECORDS} from "../../types/authModalTypes";
import {setPortfolioRecordsList, updateIsPortfolioRecordsListLoading,
} from "../../actions/authModalActions";

const getPortfolioRecords = (id) => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`https://localhost:5001/portfolio/${id}`, requestOptions);
}

const getCoinsData = (idsStr) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsStr}&order=market_cap_desc&per_page=250&page=1&sparkline=false`, requestOptions);
}

function* fetchGetPortfolioRecordsWorker({id}) {
    yield put(updateIsPortfolioRecordsListLoading(true));
    const data = yield call(
        getPortfolioRecords,
        id
    );
    const json = yield call(() => new Promise((res) => res(data.json())));
    const preparedData = {};
    if (json['result'].length !== 0) {
        const arrIds = [];
        json['result'].map((el) => {
            arrIds.push(el.coinId);
        });
        let idsStr = arrIds.join('%2C');
        const requestCoinsData = yield call(
            getCoinsData,
            idsStr
        );
        const coinData = yield call(() => new Promise((res) => res(requestCoinsData.json())));
        json['result'].map((el) => {
            coinData.map((elData) => {
                if (el.coinId === elData.id)
                {
                    el.symbol = elData.symbol;
                    el.name = elData.name;
                    el.image = elData.image;
                    el.marketPrice = elData.current_price;
                }
            });
            if (preparedData[el.coinId] !== undefined) {
                preparedData[el.coinId].push(el);
            }
            else {
                preparedData[el.coinId] = [el];
            }
        });
    }
    yield put(setPortfolioRecordsList(preparedData));
    yield put(updateIsPortfolioRecordsListLoading(false));
}


export function* getPortfoliosRecordsWatcher() {
    yield takeEvery(FETCH_GET_PORTFOLIO_RECORDS, fetchGetPortfolioRecordsWorker);
}