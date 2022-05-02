import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_ADD_PORTFOLIO} from "../../types/authModalTypes";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {updateIsAddPortfolioLoading} from "../../actions/authModalActions";

const fetchAddPortfolio = (name) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": name
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://localhost:5001/portfolio/create", requestOptions);
}

function* fetchAddPortfolioWorker({name}) {
    yield put(updateIsAddPortfolioLoading(true));
    const data = yield call(
        fetchAddPortfolio,
        name
    );
    if (data.status !== 400)
    {
        yield put(updateIsAddPortfolioLoading(false));
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Added new portfolio: ${name}`}))
    }
    else {
        yield put(updateIsAddPortfolioLoading(false));
        yield put(updateGlobalAlertList({id:Math.random(), header: `Failed`, body: `Portfolio with given name already exists`}))
    }
}


export function* fetchAddPortfolioWatcher() {
    yield takeEvery(FETCH_ADD_PORTFOLIO, fetchAddPortfolioWorker);
}