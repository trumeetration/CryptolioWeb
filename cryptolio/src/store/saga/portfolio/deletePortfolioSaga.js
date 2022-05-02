import {call, put, takeEvery} from "redux-saga/effects";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {FETCH_DELETE_PORTFOLIO, FETCH_EDIT_PORTFOLIO} from "../../types/authModalTypes";
import {fetchGetPortfolios} from "../../actions/authModalActions";

const request = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "portfolioId": id
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://localhost:5001/portfolio/delete", requestOptions);
}

function* fetchDeletePortfolioWorker({id}) {
    console.log(id);
    const data = yield call(
        request,
        id,
    );
    if (data.status === 200)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Portfolio removed`}))
        yield put(fetchGetPortfolios());
    }
}


export function* fetchDeletePortfolioWatcher() {
    yield takeEvery(FETCH_DELETE_PORTFOLIO, fetchDeletePortfolioWorker);
}