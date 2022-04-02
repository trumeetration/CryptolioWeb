import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_GET_PORTFOLIOS} from "../../types/authModalTypes";
import {
    setPortfolioList,
    updateIsPortfoliosListLoading, updateSelectedPortfolio
} from "../../actions/authModalActions";

const getPortfolioList = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("https://localhost:5001/portfolio/user_portfolios", requestOptions);
}

function* fetchGetPortfoliosWorker(info) {
    yield put(updateIsPortfoliosListLoading(true));
    const data = yield call(
        getPortfolioList,
    );
    const json = yield call(() => new Promise((res) => res(data.json())));
    //console.log(json['result']);
    yield put(updateIsPortfoliosListLoading(false));
    yield put(setPortfolioList(json['result']));
    if (json['result'].length !== 0) yield put(updateSelectedPortfolio(0));
}


export function* getPortfoliosWatcher() {
    yield takeEvery(FETCH_GET_PORTFOLIOS, fetchGetPortfoliosWorker);
}