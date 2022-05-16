import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_PORTFOLIOS} from "../../types/authModalTypes";
import {
    fetchGetPortfolioRecords,
    setPortfolioList,
    updateSelectedPortfolio
} from "../../actions/authModalActions";
import {Url} from "../../../constans/global";
import {updateGlobalAlertList} from "../../actions/activePageActions";

const getPortfolioList = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${Url}/portfolio/user_portfolios`, requestOptions);
}

function* fetchGetPortfoliosWorker(info) {
    //yield put(updateIsPortfoliosListLoading(true));
    const data = yield call(
        getPortfolioList,
    );
    if (data.status !== 401) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        //console.log(json['result']);
        //yield put(updateIsPortfoliosListLoading(false));
        yield put(setPortfolioList(json['result']));
        if (json['result'].length !== 0) {
            yield put(updateSelectedPortfolio(0));
            yield put(fetchGetPortfolioRecords(json['result'][0].id));
        }
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: "Unauthorized", body: "You need to login"}))
    }
}


export function* getPortfoliosWatcher() {
    yield takeEvery(FETCH_GET_PORTFOLIOS, fetchGetPortfoliosWorker);
}